import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'
import { insertRecipe } from '@/lib/supabase'
import type { RecipeRow } from '@/lib/supabase'

// ── Types ─────────────────────────────────────────────────────────────────────

interface GenerateRequestBody {
  ingredients: string[]
  allergies:   string[]
  avoids:      string[]
  prefs:       string[]
  count?:      number
}

export interface GeneratedRecipe {
  title:        string
  description:  string
  time:         string
  servings:     number
  health_score: number
  calories:     number
  protein:      number
  carbs:        number
  fat:          number
  fiber:        number
  ingredients:  string[]
  steps:        string[]
  tags:         string[]
  difficulty:   string
  tips:         string
  emoji:        string
}

// ── Gemini Schema ─────────────────────────────────────────────────────────────

const SINGLE_RECIPE_SCHEMA = {
  type: SchemaType.OBJECT,
  properties: {
    title:        { type: SchemaType.STRING,  description: 'Recipe name, concise and appetizing' },
    description:  { type: SchemaType.STRING,  description: 'Two-sentence appetizing description' },
    time:         { type: SchemaType.STRING,  description: 'Total cook time e.g. "35 min"' },
    servings:     { type: SchemaType.INTEGER, description: 'Number of servings' },
    health_score: { type: SchemaType.INTEGER, description: 'Health score 0-100' },
    calories:     { type: SchemaType.INTEGER, description: 'Calories per serving (kcal)' },
    protein:      { type: SchemaType.INTEGER, description: 'Protein per serving in grams' },
    carbs:        { type: SchemaType.INTEGER, description: 'Carbs per serving in grams' },
    fat:          { type: SchemaType.INTEGER, description: 'Fat per serving in grams' },
    fiber:        { type: SchemaType.INTEGER, description: 'Fiber per serving in grams' },
    ingredients:  { type: SchemaType.ARRAY, items: { type: SchemaType.STRING }, description: 'Each as "quantity unit ingredient"' },
    steps:        { type: SchemaType.ARRAY, items: { type: SchemaType.STRING }, description: 'Step-by-step cooking instructions' },
    tags:         { type: SchemaType.ARRAY, items: { type: SchemaType.STRING }, description: 'Up to 4 descriptive tags' },
    difficulty:   { type: SchemaType.STRING, enum: ['Easy', 'Medium', 'Hard'] },
    tips:         { type: SchemaType.STRING, description: 'One expert chef tip' },
    emoji:        { type: SchemaType.STRING, description: 'One emoji for the dish' },
  },
  required: [
    'title', 'description', 'time', 'servings',
    'health_score', 'calories', 'protein', 'carbs', 'fat', 'fiber',
    'ingredients', 'steps', 'tags', 'difficulty', 'tips', 'emoji',
  ],
}

const RECIPES_ARRAY_SCHEMA = {
  type:  SchemaType.ARRAY,
  items: SINGLE_RECIPE_SCHEMA,
}

// ── Fallback image pool ───────────────────────────────────────────────────────
// Used when Unsplash returns no results or the key is missing.
// All are real, publicly accessible Unsplash food images (no auth required at
// these URLs — they're direct CDN links, not API responses).

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1565299543923-37dd37887442?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&auto=format&fit=crop',
]

function getRandomFallback(): string {
  return FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)]
}

// ── Unsplash helper ───────────────────────────────────────────────────────────

async function fetchUnsplashPhoto(recipeTitle: string): Promise<string> {
  const unsplashKey = process.env.UNSPLASH_ACCESS_KEY

  // No key configured → use fallback immediately, no wasted API call
  if (!unsplashKey) {
    console.warn('[generate] UNSPLASH_ACCESS_KEY not set, using fallback image')
    return getRandomFallback()
  }

  try {
    // Strip emojis and punctuation from title, append "food dish" for better results
    const cleanTitle = recipeTitle
      .replace(/\p{Emoji}/gu, '')
      .replace(/[^\w\s]/g, '')
      .trim()
    const query = `${cleanTitle} food dish`

    const url = new URL('https://api.unsplash.com/search/photos')
    url.searchParams.set('query', query)
    url.searchParams.set('per_page', '3')          // fetch 3, pick first — gives more buffer
    url.searchParams.set('orientation', 'landscape')
    url.searchParams.set('content_filter', 'high')

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Client-ID ${unsplashKey}`,
        'Accept-Version': 'v1',
      },
      // Vercel edge cache: cache the same query for 24h to save rate limit
      next: { revalidate: 86400 },
    })

    if (!res.ok) {
      console.error(`[generate] Unsplash API error: ${res.status} ${res.statusText}`)
      return getRandomFallback()
    }

    const data = await res.json() as {
      results: Array<{ urls: { regular: string } }>
    }

    const imageUrl = data.results?.[0]?.urls?.regular

    if (!imageUrl) {
      console.warn(`[generate] Unsplash returned 0 results for: "${query}"`)
      return getRandomFallback()
    }

    // Append Unsplash sizing params so we get a consistent 800px wide image
    return imageUrl.includes('?')
      ? `${imageUrl}&w=800&auto=format&fit=crop`
      : `${imageUrl}?w=800&auto=format&fit=crop`

  } catch (err) {
    console.error('[generate] Unsplash fetch threw:', err)
    return getRandomFallback()
  }
}

// ── Prompts ───────────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are Kadh.ai, an expert culinary AI and nutritionist.
Generate multiple distinct recipe options from the user's available ingredients.

Rules you must follow without exception:
- Use ONLY the provided ingredients. You may supplement with universal pantry staples (water, salt, black pepper, oil) but nothing else.
- NEVER include any ingredient listed as an allergy or avoidance. This is a safety requirement.
- Every recipe must be genuinely different — different cuisines, different techniques, different flavour profiles.
- Honour all dietary preferences strictly across every recipe.
- Nutrition values must be realistic and per serving.
- health_score reflects reality: whole foods, fibre, balanced macros score higher.
- Each step must be one single clear, actionable instruction a home cook can follow.`

function buildUserPrompt(body: GenerateRequestBody): string {
  const { ingredients, allergies, avoids, prefs, count = 3 } = body
  const lines = [
    `Generate exactly ${count} distinct recipes I can make right now.`,
    `Available ingredients: ${ingredients.join(', ')}`,
  ]
  if (allergies.length) lines.push(`Allergies — NEVER use these: ${allergies.join(', ')}`)
  if (avoids.length)    lines.push(`Disliked or unavailable: ${avoids.join(', ')}`)
  if (prefs.length)     lines.push(`Dietary preferences: ${prefs.join(', ')}`)
  lines.push(`Return an array of exactly ${count} recipe objects.`)
  return lines.join('\n')
}

// ── Validation ────────────────────────────────────────────────────────────────

function validateBody(body: unknown): body is GenerateRequestBody {
  if (!body || typeof body !== 'object') return false
  const b = body as Record<string, unknown>
  return (
    Array.isArray(b.ingredients) && b.ingredients.length > 0 &&
    Array.isArray(b.allergies) &&
    Array.isArray(b.avoids) &&
    Array.isArray(b.prefs)
  )
}

// ── Route Handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON in request body.' }, { status: 400 })
  }

  if (!validateBody(body)) {
    return NextResponse.json(
      { error: 'Provide a non-empty ingredients array plus allergies, avoids, and prefs arrays.' },
      { status: 400 }
    )
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.error('[generate] GEMINI_API_KEY is missing.')
    return NextResponse.json(
      { error: 'AI service is not configured. Add GEMINI_API_KEY to your environment variables.' },
      { status: 500 }
    )
  }

  // ── STEP 1: Generate recipes with Gemini ────────────────────────────────────

  let generatedRecipes: GeneratedRecipe[]

  try {
    const genAI = new GoogleGenerativeAI(apiKey)

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema:   RECIPES_ARRAY_SCHEMA as never,
        temperature:      0.9,
        topP:             0.95,
        maxOutputTokens:  8192,
      },
    })

    const result = await model.generateContent(buildUserPrompt(body))
    const responseText = result.response.text()

    try {
      generatedRecipes = JSON.parse(responseText) as GeneratedRecipe[]
      if (!Array.isArray(generatedRecipes)) throw new Error('Response was not an array')
    } catch {
      console.error('[generate] Failed to parse Gemini response:\n', responseText)
      return NextResponse.json(
        { error: 'AI returned an unexpected format. Please try again.' },
        { status: 500 }
      )
    }

    console.log(`[generate] ✅ ${generatedRecipes.length} recipes from Gemini:`, generatedRecipes.map(r => r.title))

  } catch (err: unknown) {
    console.error('[generate] ❌ Gemini API error:', err)
    const message = err instanceof Error ? err.message : String(err)

    if (message.includes('quota') || message.includes('429')) {
      return NextResponse.json({ error: 'AI quota exceeded. Please wait a moment and try again.' }, { status: 429 })
    }
    if (message.includes('API_KEY') || message.includes('401') || message.includes('403')) {
      return NextResponse.json({ error: 'Invalid Gemini API key. Check your environment variables.' }, { status: 401 })
    }
    return NextResponse.json({ error: `Generation failed: ${message}` }, { status: 500 })
  }

  // ── STEP 2: Fetch Unsplash photos in parallel ───────────────────────────────
  // fetchUnsplashPhoto() always resolves (never throws) — it falls back to a
  // curated image pool if Unsplash fails or the key is missing.

  const imageUrls: string[] = await Promise.all(
    generatedRecipes.map(r => fetchUnsplashPhoto(r.title))
  )

  // ── STEP 3: Save every recipe to Supabase — SERVER SIDE ONLY ───────────────
  // This is the critical fix for the 404 bug.
  //
  // insertRecipe() uses createAdminClient() which reads SUPABASE_SERVICE_ROLE_KEY.
  // That env var has NO "NEXT_PUBLIC_" prefix → it is ONLY available in server-side
  // code (Route Handlers, Server Components, Server Actions).
  //
  // The old find/page.tsx (a 'use client' component) was calling insertRecipe()
  // directly — on the browser, SUPABASE_SERVICE_ROLE_KEY is undefined, so every
  // insert silently failed, and fake crypto.randomUUID() IDs were returned to the
  // UI. Clicking any card sent the user to /recipe/[fake-id] which doesn't exist
  // in the database → notFound().
  //
  // Fix: ALL saving happens here. The client receives real DB UUIDs in the response
  // and uses them directly for navigation. No saving logic should remain in find/page.tsx.

  const savedRows: (RecipeRow | null)[] = await Promise.all(
    generatedRecipes.map(async (r, i) => {
      const row = await insertRecipe({
        title:        r.title,
        description:  r.description,
        time:         r.time,
        servings:     r.servings,
        health_score: r.health_score,
        calories:     r.calories,
        protein:      r.protein,
        carbs:        r.carbs,
        fat:          r.fat,
        fiber:        r.fiber,
        ingredients:  r.ingredients,
        steps:        r.steps,
        tags:         r.tags,
        image_url:    imageUrls[i],   // always a real URL — never null
      })

      if (row) {
        console.log(`[generate] 💾 Saved: "${r.title}" → id=${row.id}`)
      } else {
        console.error(`[generate] ❌ DB insert failed for: "${r.title}"`)
      }

      return row
    })
  )

  // ── STEP 4: Build response with real DB ids ─────────────────────────────────
  // Every recipe in this response has either:
  //   - row.id: a real UUID from Supabase → /recipe/[id] WILL resolve
  //   - crypto.randomUUID(): only if Supabase insert failed (DB error, misconfigured key)
  //     In this case we flag saved=false so the frontend can show a warning.

  const recipes = generatedRecipes.map((gen, i) => ({
    id:           savedRows[i]?.id ?? crypto.randomUUID(),
    title:        gen.title,
    description:  gen.description,
    time:         gen.time,
    servings:     gen.servings,
    health_score: gen.health_score,
    calories:     gen.calories,
    protein:      gen.protein,
    carbs:        gen.carbs,
    fat:          gen.fat,
    fiber:        gen.fiber,
    ingredients:  gen.ingredients,
    steps:        gen.steps,
    tags:         gen.tags,
    image_url:    imageUrls[i],
    // AI-only fields (not stored in DB schema)
    emoji:        gen.emoji,
    difficulty:   gen.difficulty,
    tips:         gen.tips,
    // Tells the frontend whether this ID is safe to navigate to
    saved:        savedRows[i] !== null,
  }))

  return NextResponse.json({ recipes }, { status: 200 })
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed. Use POST.' }, { status: 405 })
}
