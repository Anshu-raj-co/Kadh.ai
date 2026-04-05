import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'
import { insertRecipe } from '@/lib/supabase'
import type { RecipeRow } from '@/lib/supabase'

// ── Types ─────────────────────────────────────────────────────────────────────

interface GenerateRequestBody {
  ingredients: string[]
  allergies: string[]
  avoids: string[]
  prefs: string[]
  count?: number   // how many recipes to return, default 3
}

export interface GeneratedRecipe {
  title: string
  description: string
  time: string
  servings: number
  health_score: number
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  ingredients: string[]
  steps: string[]
  tags: string[]
  difficulty: string
  tips: string
  emoji: string
}

// ── Schema: an ARRAY of recipe objects ───────────────────────────────────────

const SINGLE_RECIPE_SCHEMA = {
  type: SchemaType.OBJECT,
  properties: {
    title: { type: SchemaType.STRING, description: 'Recipe name, concise and appetizing' },
    description: { type: SchemaType.STRING, description: 'Two-sentence appetizing description' },
    time: { type: SchemaType.STRING, description: 'Total cook time e.g. "35 min"' },
    servings: { type: SchemaType.INTEGER, description: 'Number of servings' },
    health_score: { type: SchemaType.INTEGER, description: 'Health score 0-100' },
    calories: { type: SchemaType.INTEGER, description: 'Calories per serving (kcal)' },
    protein: { type: SchemaType.INTEGER, description: 'Protein per serving in grams' },
    carbs: { type: SchemaType.INTEGER, description: 'Carbs per serving in grams' },
    fat: { type: SchemaType.INTEGER, description: 'Fat per serving in grams' },
    fiber: { type: SchemaType.INTEGER, description: 'Fiber per serving in grams' },
    ingredients: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: 'Each as "quantity unit ingredient" e.g. "2 cups basmati rice"',
    },
    steps: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: 'Step-by-step cooking instructions, one action per step',
    },
    tags: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: 'Up to 4 descriptive tags',
    },
    difficulty: {
      type: SchemaType.STRING,
      enum: ['Easy', 'Medium', 'Hard'],
    },
    tips: { type: SchemaType.STRING, description: 'One expert chef tip' },
    emoji: { type: SchemaType.STRING, description: 'One emoji for the dish' },
  },
  required: [
    'title', 'description', 'time', 'servings',
    'health_score', 'calories', 'protein', 'carbs', 'fat', 'fiber',
    'ingredients', 'steps', 'tags', 'difficulty', 'tips', 'emoji',
  ],
}

const RECIPES_ARRAY_SCHEMA = {
  type: SchemaType.ARRAY,
  items: SINGLE_RECIPE_SCHEMA,
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
  if (avoids.length) lines.push(`Disliked or unavailable: ${avoids.join(', ')}`)
  if (prefs.length) lines.push(`Dietary preferences: ${prefs.join(', ')}`)
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
      { error: 'AI service is not configured. Add GEMINI_API_KEY to .env.local' },
      { status: 500 }
    )
  }

  // ── Step 1: Generate recipes with Gemini ─────────────────────────────────

  let generatedRecipes: GeneratedRecipe[]

  try {
    const genAI = new GoogleGenerativeAI(apiKey)

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: RECIPES_ARRAY_SCHEMA as never,
        temperature: 0.9,
        topP: 0.95,
        maxOutputTokens: 8192,
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
      return NextResponse.json(
        { error: 'AI quota exceeded. Please wait a moment and try again.' },
        { status: 429 }
      )
    }
    if (message.includes('API_KEY') || message.includes('401') || message.includes('403')) {
      return NextResponse.json(
        { error: 'Invalid Gemini API key. Check GEMINI_API_KEY in .env.local.' },
        { status: 401 }
      )
    }
    return NextResponse.json(
      { error: `Generation failed: ${message}` },
      { status: 500 }
    )
  }

  // ── Step 2: Fetch one Unsplash photo per recipe in parallel ──────────────
  // Done here on the server so the service key never touches the client.

  const photoResults = await Promise.allSettled(
    generatedRecipes.map(async (r) => {
      try {
        const unsplashKey = process.env.UNSPLASH_ACCESS_KEY
        if (!unsplashKey) return null

        const cleanTitle = r.title.split('with')[0].split('in')[0].trim();
        const query = `${cleanTitle} dish food`;
        const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape&content_filter=high`

        const res = await fetch(url, {
          headers: { Authorization: `Client-ID ${unsplashKey}`, 'Accept-Version': 'v1' },
        })
        if (!res.ok) return null

        const data = await res.json() as { results: Array<{ urls: { regular: string } }> }
        return data.results?.[0]?.urls?.regular ?? null
      } catch {
        return null
      }
    })
  )

  // ── Step 3: Save every recipe to Supabase on the server ──────────────────
  // insertRecipe uses SUPABASE_SERVICE_ROLE_KEY which only exists server-side.
  // This is the root fix for Issue 1 — no recipe was ever reaching the DB before.

  const savedRows: (RecipeRow | null)[] = await Promise.all(
    generatedRecipes.map(async (r, i) => {
      const imageUrl = photoResults[i].status === 'fulfilled'
        ? (photoResults[i] as PromiseFulfilledResult<string | null>).value
        : null

      const row = await insertRecipe({
        title: r.title,
        description: r.description,
        time: r.time,
        servings: r.servings,
        health_score: r.health_score,
        calories: r.calories,
        protein: r.protein,
        carbs: r.carbs,
        fat: r.fat,
        fiber: r.fiber,
        ingredients: r.ingredients,
        steps: r.steps,
        tags: r.tags,
        image_url: imageUrl,
      })

      if (row) {
        console.log(`[generate] 💾 Saved: "${r.title}" → id=${row.id}`)
      } else {
        console.warn(`[generate] ⚠️  DB insert failed for: "${r.title}"`)
      }

      return row
    })
  )

  // ── Step 4: Build the response payload ───────────────────────────────────
  // Return the full DB rows (with real UUIDs) merged with AI-only fields
  // (emoji, difficulty, tips) that we don't store in the DB schema.
  // The frontend uses row.id directly for /recipe/[id] navigation.

  const recipes = generatedRecipes.map((gen, i) => {
    const row = savedRows[i]
    const imageUrl = photoResults[i].status === 'fulfilled'
      ? (photoResults[i] as PromiseFulfilledResult<string | null>).value
      : null

    return {
      // Real DB id if save succeeded, otherwise a temp UUID so the UI still renders
      id: row?.id ?? crypto.randomUUID(),
      title: gen.title,
      description: gen.description,
      time: gen.time,
      servings: gen.servings,
      health_score: gen.health_score,
      calories: gen.calories,
      protein: gen.protein,
      carbs: gen.carbs,
      fat: gen.fat,
      fiber: gen.fiber,
      ingredients: gen.ingredients,
      steps: gen.steps,
      tags: gen.tags,
      image_url: row?.image_url ?? imageUrl,
      // AI-only fields not in DB schema
      emoji: gen.emoji,
      difficulty: gen.difficulty,
      tips: gen.tips,
      // Flag so frontend knows if it's safe to link to /recipe/[id]
      saved: row !== null,
    }
  })

  return NextResponse.json({ recipes }, { status: 200 })
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed. Use POST.' }, { status: 405 })
}