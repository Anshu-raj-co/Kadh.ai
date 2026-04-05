import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// ── Database type definitions ─────────────────────────────────────────────────
export interface RecipeRow {
  id: string
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
  // Upgraded to any[] to support both old string arrays and new object arrays
  steps: any[]
  tags: string[]
  image_url: string | null
  created_at: string
  emoji?: string
  difficulty?: string
  tips?: string
  // ── NEW FIELDS FOR PROFESSIONAL UPGRADE ──
  substitutions?: string[]
  chef_insight?: string
  goal?: string
}

export interface Database {
  public: {
    Tables: {
      recipes: {
        Row: RecipeRow
        Insert: Omit<RecipeRow, 'id' | 'created_at'>
        Update: Partial<Omit<RecipeRow, 'id' | 'created_at'>>
      }
    }
  }
}

// ── Browser / client-side Supabase client ─────────────────────────────────────
export const supabase: SupabaseClient<Database> = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey
)

// ── Server-side Supabase admin client ─────────────────────────────────────────
export function createAdminClient(): SupabaseClient<Database> {
  if (!supabaseServiceKey) {
    throw new Error('Missing environment variable: SUPABASE_SERVICE_ROLE_KEY')
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

// ── Typed query helpers ────────────────────────────────────────────────────────

export async function getAllRecipes(): Promise<RecipeRow[]> {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[supabase] getAllRecipes error:', error.message)
    return []
  }
  return data ?? []
}

export async function getRecipeById(id: string): Promise<RecipeRow | null> {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error(`[supabase] getRecipeById(${id}) error:`, error.message)
    return null
  }
  return data
}

export async function insertRecipe(
  recipe: Database['public']['Tables']['recipes']['Insert']
): Promise<RecipeRow | null> {
  try {
    const admin = createAdminClient()
    const { data, error } = await admin
      .from('recipes')
      .insert(recipe as any)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (err) {
    console.error('[supabase] insertRecipe error:', err)
    return null
  }
}