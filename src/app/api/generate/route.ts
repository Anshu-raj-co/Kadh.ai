import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'
import { insertRecipe } from '@/lib/supabase'
import type { RecipeRow } from '@/lib/supabase'

// ── Types ─────────────────────────────────────────────────────────────────────

export type UserGoal = 'Balanced' | 'Bulking' | 'Cutting' | 'Budget'

interface GenerateRequestBody {
  ingredients: string[]
  allergies: string[]
  avoids: string[]
  prefs: string[]
  count?: number
  goal?: UserGoal
}

export interface RecipeStep {
  instruction: string
  timer_minutes: number | null
  pro_tip: string
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
  steps: RecipeStep[]
  tags: string[]
  difficulty: string
  tips: string
  emoji: string
  substitutions: string[]
  chef_insight: string
}

// ── Goal configuration ────────────────────────────────────────────────────────

const GOAL_CONFIGS: Record<UserGoal, {
  label: string
  description: string
  emoji: string
  direction: string
}> = {
  Balanced: {
    label: 'Balanced',
    emoji: '⚖️',
    description: 'Well-rounded macros for everyday health',
    direction: 'Optimise for balanced macronutrients. Aim for a roughly equal caloric split between protein, carbohydrates, and healthy fats. Prioritise whole foods and high micronutrient density.',
  },
  Bulking: {
    label: 'Bulking',
    emoji: '💪',
    description: 'Higher protein & calories for muscle gain',
    direction: 'Optimise for muscle hypertrophy. Target minimum 35g protein per serving. Calories should be 20-30% above a standard 500 kcal baseline. Include complex carbohydrates for glycogen replenishment. Every chef_insight must explain how this recipe supports anabolic muscle growth.',
  },
  Cutting: {
    label: 'Cutting',
    emoji: '🔥',
    description: 'High volume, low calorie for fat loss',
    direction: 'Optimise for fat loss while preserving lean muscle. Target under 400 kcal per serving with minimum 25g protein. Maximise dietary fibre (aim for 8g+) and water content to promote satiety. Minimise refined carbohydrates and saturated fat. Every chef_insight must explain how this recipe creates a calorie deficit without sacrificing satiety.',
  },
  Budget: {
    label: 'Budget',
    emoji: '💰',
    description: 'Nutritious meals from affordable staples',
    direction: 'Optimise for maximum nutritional value per unit of cost. Prioritise affordable pantry staples: lentils, eggs, beans, oats, cabbage, carrots, canned tomatoes, rice, and pasta. Avoid expensive proteins like premium cuts, fresh seafood, or exotic spices. Every chef_insight must explain how this recipe delivers strong nutrition at low cost.',
  },
}

// ── Gemini Schema ─────────────────────────────────────────────────────────────

const STEP_SCHEMA = {
  type: SchemaType.OBJECT,
  properties: {
    instruction: {
      type: SchemaType.STRING,
      description: 'One single, clear, actionable cooking instruction using professional culinary terminology',
    },
    timer_minutes: {
      type: SchemaType.NUMBER,
      description: 'Exact time in minutes for this step if it involves waiting, cooking, resting, or marinating. Use 0 if the step is instantaneous hands-on work with no waiting.',
    },
    pro_tip: {
      type: SchemaType.STRING,
      description: 'A precise, chef-level professional tip specific to this exact step that meaningfully improves the outcome. Reference specific techniques, temperatures, or sensory cues.',
    },
  },
  required: ['instruction', 'timer_minutes', 'pro_tip'],
}

const SINGLE_RECIPE_SCHEMA = {
  type: SchemaType.OBJECT,
  properties: {
    title: {
      type: SchemaType.STRING,
      description: 'Appetizing recipe name using professional culinary language',
    },
    description: {
      type: SchemaType.STRING,
      description: 'Two-sentence description using evocative, restaurant-menu-quality language',
    },
    time: {
      type: SchemaType.STRING,
      description: 'Total cook + prep time e.g. "35 min" or "1 hr 10 min"',
    },
    servings: {
      type: SchemaType.INTEGER,
      description: 'Number of servings',
    },
    health_score: {
      type: SchemaType.INTEGER,
      description: 'Nutritional quality score 0-100 based on micronutrient density, fibre, healthy fat profile, and macro balance relative to the chosen goal',
    },
    calories: {
      type: SchemaType.INTEGER,
      description: 'Calories per serving (kcal) — must be calculated realistically from ingredient quantities using standard nutritional databases',
    },
    protein: {
      type: SchemaType.INTEGER,
      description: 'Protein per serving in grams — must be realistic based on actual ingredient quantities',
    },
    carbs: {
      type: SchemaType.INTEGER,
      description: 'Total carbohydrates per serving in grams',
    },
    fat: {
      type: SchemaType.INTEGER,
      description: 'Total fat per serving in grams',
    },
    fiber: {
      type: SchemaType.INTEGER,
      description: 'Dietary fibre per serving in grams',
    },
    ingredients: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: 'Each ingredient listed as "precise quantity + unit + ingredient name" e.g. "200g boneless chicken thighs" or "2 tbsp extra-virgin olive oil"',
    },
    steps: {
      type: SchemaType.ARRAY,
      items: STEP_SCHEMA,
      description: 'Ordered cooking instructions as professional step objects. Each must have instruction, timer_minutes, and pro_tip.',
    },
    tags: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: 'Up to 4 descriptive tags e.g. ["High Protein", "Indian", "Meal Prep", "Gluten-Free"]',
    },
    difficulty: {
      type: SchemaType.STRING,
      enum: ['Easy', 'Medium', 'Hard'],
      description: 'Honest culinary difficulty level',
    },
    tips: {
      type: SchemaType.STRING,
      description: 'One overarching chef-level tip for the whole dish — a technique or insight that elevates the recipe from good to exceptional',
    },
    emoji: {
      type: SchemaType.STRING,
      description: 'Single most representative emoji for the dish',
    },
    substitutions: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: 'Exactly 2-3 smart, practical ingredient substitutions in the format: "Replace [ingredient] with [alternative] to [specific benefit]".',
    },
    chef_insight: {
      type: SchemaType.STRING,
      description: "One precise sentence explaining exactly why this recipe is ideal for the user's stated goal (Balanced / Bulking / Cutting / Budget). Reference specific macros, ingredients, or cooking methods.",
    },
  },
  required: [
    'title', 'description', 'time', 'servings',
    'health_score', 'calories', 'protein', 'carbs', 'fat', 'fiber',
    'ingredients', 'steps', 'tags', 'difficulty', 'tips', 'emoji',
    'substitutions', 'chef_insight',
  ],
}

const RECIPES_ARRAY_SCHEMA = {
  type: SchemaType.ARRAY,
  items: SINGLE_RECIPE_SCHEMA,
}

// ── System Prompt ─────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are Kadh.ai — a professional culinary AI trained to the standard of a Michelin-starred chef with a degree in sports nutrition and dietetics.

Your recipes must meet all of the following professional standards without exception:

CULINARY STANDARDS:
- Use precise professional culinary terminology throughout: "deglaze", "fond", "emulsify", "julienne", "blanch and shock", "render", "temper", "baste", "reduce au sec", etc. Never use vague language like "cook until done".
- Every step must reference a specific sensory cue: colour change, aroma, texture, sound, or temperature — not just a time. Example: "Sauté until the onions are translucent and beginning to caramelise at the edges, about 7-8 minutes."
- Timer values must be precise. Do not round everything to 5-minute intervals. Use exact values: 3 minutes, 7 minutes, 12 minutes.

NUTRITIONAL STANDARDS:
- Calculate macronutrients realistically from actual ingredient quantities using standard nutritional databases (USDA/NHS).
- Protein per 100g benchmarks: chicken breast 31g, lentils (cooked) 9g, eggs 13g, paneer 18g, tofu 8g, Greek yogurt 10g.
- Calorie calculations must align with the macro totals: (protein × 4) + (carbs × 4) + (fat × 9) ≈ total calories. Never invent implausible numbers.
- health_score must reflect real nutritional quality relative to the user's goal, not just "healthiness" in the abstract.

GOAL ALIGNMENT:
- Every field — ingredient choices, portion sizes, cooking methods, pro_tips, chef_insight, and substitutions — must actively serve the user's stated goal.
- chef_insight must cite specific numbers: "With 38g of protein per serving and only 340 kcal, this dish creates a meaningful caloric deficit while maintaining satiety through its 12g of dietary fibre."

SAFETY:
- Use ONLY the provided ingredients. Universal pantry staples (water, salt, black pepper, cooking oil, basic dried spices) are permitted as additions.
- NEVER include any allergen or avoided ingredient. This is a non-negotiable safety requirement.
- Every recipe in the batch must be genuinely distinct: different cuisines, techniques, and flavour profiles.`

// ── Prompt builder ────────────────────────────────────────────────────────────

function buildUserPrompt(body: GenerateRequestBody): string {
  const { ingredients, allergies, avoids, prefs, count = 3, goal = 'Balanced' } = body
  const goalConfig = GOAL_CONFIGS[goal]

  const lines = [
    `USER GOAL: ${goal} — ${goalConfig.direction}`,
    ``,
    `Generate exactly ${count} distinct, professional-quality recipes I can cook right now.`,
    ``,
    `Available ingredients: ${ingredients.join(', ')}`,
  ]

  if (allergies.length) lines.push(`Allergies — NEVER include these under any circumstances: ${allergies.join(', ')}`)
  if (avoids.length) lines.push(`Disliked or unavailable ingredients: ${avoids.join(', ')}`)
  if (prefs.length) lines.push(`Dietary preferences: ${prefs.join(', ')}`)

  lines.push(``)
  lines.push(`Each recipe's chef_insight must specifically reference the ${goal} goal with concrete nutritional figures.`)
  lines.push(`Each recipe's substitutions must offer 2-3 goal-aligned alternatives (e.g., for Cutting: lower-calorie swaps; for Bulking: higher-protein swaps; for Budget: cheaper equivalents).`)
  lines.push(`Return an array of exactly ${count} recipe objects.`)

  return lines.join('\n')
}

// ── Validation ────────────────────────────────────────────────────────────────

const VALID_GOALS: UserGoal[] = ['Balanced', 'Bulking', 'Cutting', 'Budget']

function validateBody(body: unknown): body is GenerateRequestBody {
  if (!body || typeof body !== 'object') return false
  const b = body as Record<string, unknown>
  if (!Array.isArray(b.ingredients) || b.ingredients.length === 0) return false
  if (!Array.isArray(b.allergies)) return false
  if (!Array.isArray(b.avoids)) return false
  if (!Array.isArray(b.prefs)) return false
  if (b.goal !== undefined && !VALID_GOALS.includes(b.goal as UserGoal)) return false
  return true
}

// ── Fallback image pool ───────────────────────────────────────────────────────

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

async function fetchUnsplashPhoto(recipeTitle: string): Promise<string> {
  const unsplashKey = process.env.UNSPLASH_ACCESS_KEY
  if (!unsplashKey) {
    console.warn('[generate] UNSPLASH_ACCESS_KEY not set, using fallback')
    return getRandomFallback()
  }

  try {
    const cleanTitle = recipeTitle.replace(/\p{Emoji}/gu, '').replace(/[^\w\s]/g, '').trim()
    const query = `${cleanTitle} food dish`

    const url = new URL('https://api.unsplash.com/search/photos')
    url.searchParams.set('query', query)
    url.searchParams.set('per_page', '3')
    url.searchParams.set('orientation', 'landscape')
    url.searchParams.set('content_filter', 'high')

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Client-ID ${unsplashKey}`, 'Accept-Version': 'v1' },
      next: { revalidate: 86400 },
    })

    if (!res.ok) return getRandomFallback()

    const data = await res.json() as { results: Array<{ urls: { regular: string } }> }
    const imageUrl = data.results?.[0]?.urls?.regular
    if (!imageUrl) return getRandomFallback()

    return imageUrl.includes('?')
      ? `${imageUrl}&w=800&auto=format&fit=crop`
      : `${imageUrl}?w=800&auto=format&fit=crop`
  } catch {
    return getRandomFallback()
  }
}

// ── Model discovery & caching ─────────────────────────────────────────────────
//
// On first request (or after 5 min TTL), fetches the live /v1beta/models list
// from Google, filters to models that support generateContent, then sorts them
// by our preferred order. Subsequent requests within 5 min use the cached list.

const PREFERRED_MODEL_NAMES = [
  'gemini-2.5-flash',   // best quality, tried first
  'gemini-2.0-flash',   // strong fallback, still in official docs
  'gemini-1.5-flash',   // older but very stable
]

interface ModelCache {
  models: string[]   // normalized, e.g. ["gemini-2.5-flash", "gemini-2.0-flash", ...]
  fetchedAt: number  // Date.now()
}

// Module-level cache — persists across requests within the same serverless instance
let modelCache: ModelCache | null = null
const MODEL_CACHE_TTL_MS = 5 * 60 * 1000  // 5 minutes

interface GeminiModelEntry {
  name: string                           // "models/gemini-2.0-flash"
  supportedGenerationMethods?: string[]  // ["generateContent", "countTokens", ...]
}

async function fetchAvailableGeminiModels(apiKey: string): Promise<string[]> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`

  let res: Response
  try {
    res = await fetch(url, { cache: 'no-store' })
  } catch (err) {
    console.warn('[generate] Network error fetching model list, using hardcoded fallback:', err)
    return [...PREFERRED_MODEL_NAMES]
  }

  if (!res.ok) {
    console.warn(`[generate] Model list endpoint returned ${res.status}, using hardcoded fallback`)
    return [...PREFERRED_MODEL_NAMES]
  }

  const data = await res.json() as { models?: GeminiModelEntry[] }
  const allModels: GeminiModelEntry[] = data.models ?? []

  console.log('[generate] discovered models:', allModels.map(m => m.name))

  // Normalize "models/gemini-x" → "gemini-x" and keep only generateContent-capable ones
  const capable = allModels
    .filter(m =>
      !m.supportedGenerationMethods ||
      m.supportedGenerationMethods.includes('generateContent')
    )
    .map(m => m.name.replace(/^models\//, ''))
    .filter(name => name.startsWith('gemini-'))

  return capable
}

function pickPreferredModels(availableModels: string[]): string[] {
  const available = new Set(availableModels)

  // Preferred models that actually exist in the live list, in priority order
  const ordered: string[] = PREFERRED_MODEL_NAMES.filter(name => available.has(name))

  // Append any remaining discovered models as additional fallbacks
  for (const name of availableModels) {
    if (!ordered.includes(name)) ordered.push(name)
  }

  // If the live list returned nothing useful, fall back to hardcoded names
  if (ordered.length === 0) return [...PREFERRED_MODEL_NAMES]

  return ordered
}

async function getModelList(apiKey: string): Promise<string[]> {
  const now = Date.now()

  if (modelCache && now - modelCache.fetchedAt < MODEL_CACHE_TTL_MS) {
    return modelCache.models
  }

  const discovered = await fetchAvailableGeminiModels(apiKey)
  const preferred = pickPreferredModels(discovered)

  console.log('[generate] preferred available models:', preferred)

  modelCache = { models: preferred, fetchedAt: now }
  return preferred
}

// ── Retry & error helpers ─────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function isRetryableGeminiError(message: string): boolean {
  return (
    message.includes('503') ||
    message.includes('Service Unavailable') ||
    message.includes('overload') ||
    message.includes('high demand') ||
    message.includes('429') ||
    message.includes('quota') ||
    message.includes('RESOURCE_EXHAUSTED') ||
    message.includes('rate limit')
  )
}

function isAuthError(message: string): boolean {
  return (
    message.includes('401') ||
    message.includes('403') ||
    message.includes('API_KEY') ||
    message.includes('PERMISSION_DENIED') ||
    message.includes('API key not valid')
  )
}

// ── Core generation with discovered model list + per-model exponential backoff ─
//
// Flow per model:
//   attempt 0  → try immediately
//   attempt 1  → wait 800ms,  retry (retriable errors only)
//   attempt 2  → wait 1600ms, retry (retriable errors only)
//   give up    → move to next discovered model
//
// Auth errors stop everything immediately (no point retrying or switching models).

const MAX_RETRIES_PER_MODEL = 2
const BASE_BACKOFF_MS = 800

async function generateWithDiscoveredModels(
  genAI: GoogleGenerativeAI,
  prompt: string,
  apiKey: string
): Promise<{ text: string; modelUsed: string }> {
  const models = await getModelList(apiKey)

  if (models.length === 0) {
    throw new Error('No usable Gemini models found for this API key.')
  }

  let lastError: Error = new Error('All models exhausted without a successful response.')

  for (const modelName of models) {
    console.log(`[generate] selected model: ${modelName}`)

    for (let attempt = 0; attempt <= MAX_RETRIES_PER_MODEL; attempt++) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: SYSTEM_PROMPT,
          generationConfig: {
            responseMimeType: 'application/json',
            responseSchema: RECIPES_ARRAY_SCHEMA as never,
            temperature: 0.85,
            topP: 0.95,
            maxOutputTokens: 16384,
          },
        })

        const result = await model.generateContent(prompt)
        const text = result.response.text()

        console.log(`[generate] ✅ Success with model: ${modelName} (attempt ${attempt + 1})`)
        return { text, modelUsed: modelName }

      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err)
        lastError = err instanceof Error ? err : new Error(message)

        // Auth errors: no point retrying any model
        if (isAuthError(message)) {
          console.error(`[generate] ❌ Auth error — aborting: ${message}`)
          throw lastError
        }

        if (isRetryableGeminiError(message)) {
          if (attempt < MAX_RETRIES_PER_MODEL) {
            const backoff = BASE_BACKOFF_MS * Math.pow(2, attempt)  // 800ms → 1600ms
            console.warn(`[generate] retrying after 503/429 on ${modelName} (attempt ${attempt + 1}), waiting ${backoff}ms`)
            await sleep(backoff)
            continue
          }
          // All retries for this model exhausted
          console.warn('[generate] falling back to next discovered model')
          break
        }

        // Non-retriable, non-auth error (e.g. schema issue, unexpected 400)
        console.error(`[generate] ❌ Non-retriable error on ${modelName}:`, message)
        break  // try next model anyway
      }
    }
  }

  throw lastError
}

// ── Route Handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const totalStart = Date.now();
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON in request body.' }, { status: 400 })
  }

  if (!validateBody(body)) {
    return NextResponse.json(
      { error: 'Provide a non-empty ingredients array, plus allergies, avoids, prefs, and an optional valid goal.' },
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

  // ── STEP 1: Discover live models, then generate ───────────────────────────────

  let generatedRecipes: GeneratedRecipe[]

  try {
    const geminiStart = Date.now();
    const genAI = new GoogleGenerativeAI(apiKey)
    const { text: responseText, modelUsed } = await generateWithDiscoveredModels(
      genAI,
      buildUserPrompt(body),
      apiKey
    )
    console.log("Gemini Latency:", Date.now() - geminiStart, "ms");

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

    console.log(`[generate] ✅ ${generatedRecipes.length} recipes via ${modelUsed}:`, generatedRecipes.map(r => r.title))

  } catch (err: unknown) {
    console.error('[generate] ❌ All Gemini models failed:', err)
    const message = err instanceof Error ? err.message : String(err)

    if (isAuthError(message)) {
      return NextResponse.json({ error: 'Invalid or missing Gemini API key.' }, { status: 401 })
    }
    if (message.includes('quota') || message.includes('429') || message.includes('RESOURCE_EXHAUSTED')) {
      return NextResponse.json({ error: 'All AI models are currently rate-limited. Please wait a moment and try again.' }, { status: 429 })
    }
    if (message.includes('503') || message.includes('overload') || message.includes('high demand')) {
      return NextResponse.json({ error: 'AI service is experiencing high demand. Please try again in a few seconds.' }, { status: 503 })
    }
    return NextResponse.json({ error: `Generation failed: ${message}` }, { status: 500 })
  }

  // ── STEP 2: Fetch photos in parallel ─────────────────────────────────────────

  const unsplashStart = Date.now();

  const imageUrls: string[] = await Promise.all(
    generatedRecipes.map(r => fetchUnsplashPhoto(r.title))
  );

  console.log("Unsplash Latency:", Date.now() - unsplashStart, "ms");

  // ── STEP 3: Save to Supabase ──────────────────────────────────────────────────
  //
  // For the new columns run this in your Supabase SQL editor if not already done:
  //
  //   ALTER TABLE recipes
  //     ADD COLUMN IF NOT EXISTS substitutions  JSONB  DEFAULT '[]'::JSONB,
  //     ADD COLUMN IF NOT EXISTS chef_insight   TEXT,
  //     ADD COLUMN IF NOT EXISTS goal           TEXT,
  //     ADD COLUMN IF NOT EXISTS difficulty     TEXT;
  const dbStart = Date.now();
  const savedRows: (RecipeRow | null)[] = await Promise.all(
    generatedRecipes.map(async (r, i) => {
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
        steps: r.steps as unknown as string[],
        tags: r.tags,
        image_url: imageUrls[i],
        ...({ substitutions: r.substitutions } as object),
        ...({ chef_insight: r.chef_insight } as object),
        ...({ goal: body.goal ?? 'Balanced' } as object),
        ...({ difficulty: r.difficulty } as object),
      } as Parameters<typeof insertRecipe>[0])

      if (row) {
        console.log(`[generate] 💾 Saved: "${r.title}" → ${row.id}`)
      } else {
        console.error(`[generate] ❌ DB insert failed: "${r.title}"`)
      }

      return row
    })
  )
  console.log("DB Latency:", Date.now() - dbStart, "ms");

  // ── STEP 4: Build response ────────────────────────────────────────────────────

  const recipes = generatedRecipes.map((gen, i) => ({
    id: savedRows[i]?.id ?? crypto.randomUUID(),
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
    image_url: imageUrls[i],
    emoji: gen.emoji,
    difficulty: gen.difficulty,
    tips: gen.tips,
    substitutions: gen.substitutions,
    chef_insight: gen.chef_insight,
    goal: body.goal ?? 'Balanced',
    saved: savedRows[i] !== null,
  }))

  console.log("TOTAL Latency:", Date.now() - totalStart, "ms");

  return NextResponse.json({ recipes }, { status: 200 })
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed. Use POST.' }, { status: 405 })
}

// ── Export goal config for use in the find page UI ───────────────────────────
export { GOAL_CONFIGS }
