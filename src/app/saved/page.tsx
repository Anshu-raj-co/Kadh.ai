import Link from 'next/link'
import { Sparkles, BookOpen, RefreshCw } from 'lucide-react'
import Navbar from '@/components/Navbar'
import RecipeCard from '@/components/RecipeCard'
import { getAllRecipes } from '@/lib/supabase'

// ── Force dynamic rendering ───────────────────────────────────────────────────
// Prevents Next.js from caching a stale recipe list at build time.
// Every page visit fetches live data from Supabase.
export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Browse Recipes — Kadh.ai',
  description: 'All recipes generated and saved by Kadh.ai',
}

export default async function SavedRecipesPage() {
  // getAllRecipes() reads from Supabase using the public anon client.
  // It returns ONLY rows that actually exist in the database.
  // There is no static/mock data anywhere in this file.
  const recipes = await getAllRecipes()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-warm-white">

        {/* ── Header ── */}
        <div className="border-b border-border bg-gradient-to-b from-cream to-warm-white">
          <div className="max-w-6xl mx-auto px-6 py-14">
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div>
                <div className="inline-flex items-center gap-2 mb-4 bg-white border border-border rounded-full px-4 py-1.5 text-sm font-medium text-ink-muted shadow-badge">
                  <BookOpen className="w-3.5 h-3.5 text-saffron" />
                  Recipe Library
                </div>
                <h1 className="font-display text-4xl font-bold text-ink mb-3">
                  All <em className="text-saffron not-italic">Saved</em> Recipes
                </h1>
                <p className="text-ink-muted text-base max-w-lg">
                  {recipes.length > 0
                    ? `${recipes.length} recipe${recipes.length === 1 ? '' : 's'} generated and saved by Kadh.ai`
                    : 'No recipes saved yet — generate your first one with the AI Finder.'
                  }
                </p>
              </div>

              <div className="flex gap-3 flex-wrap">
                {/* Refresh link — triggers a new server render */}
                <Link
                  href="/saved"
                  className="flex-shrink-0 inline-flex items-center gap-2 bg-white border border-border hover:border-ink text-ink px-4 py-2.5 rounded-full font-semibold text-sm transition-all hover:bg-cream"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Refresh
                </Link>

                <Link
                  href="/find"
                  className="flex-shrink-0 inline-flex items-center gap-2 bg-ink hover:bg-saffron text-warm-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 hover:shadow-card"
                >
                  <Sparkles className="w-4 h-4" />
                  Generate More
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Recipe Grid ── */}
        {/* Data comes ONLY from Supabase via getAllRecipes().
          Every card links to /recipe/[recipe.id] where recipe.id is a real
          Supabase UUID — so the detail page will always find the row.
          There is no static array, no mock data, and no client-side state.
        */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          {recipes.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map(recipe => (
                  <Link
                    key={recipe.id}
                    href={`/recipe/${recipe.id}`}
                    className="block group"
                  >
                    <RecipeCard
                      recipe={{
                        id: recipe.id,
                        title: recipe.title,
                        description: recipe.description ?? '',
                        image_url: recipe.image_url,
                        time: recipe.time,
                        servings: recipe.servings,
                        health_score: recipe.health_score,
                        calories: recipe.calories,
                        protein: recipe.protein,
                        carbs: recipe.carbs,
                        fat: recipe.fat,
                        fiber: recipe.fiber,
                        tags: recipe.tags ?? [],
                        ingredients: recipe.ingredients ?? [],
                        steps: Array.isArray(recipe.steps) ? recipe.steps : [], // Updated to handle new arrays safely
                        difficulty: recipe.difficulty,
                        tips: recipe.tips,
                        // New fields added to prevent missing data errors
                        substitutions: recipe.substitutions ?? [],
                        chef_insight: recipe.chef_insight ?? '',
                        goal: recipe.goal ?? 'Balanced',
                      }}
                    />
                  </Link>
                ))}
              </div>

              {/* Load more hint */}
              <p className="text-center text-ink-faint text-xs mt-10">
                Showing all {recipes.length} saved recipes · Generate more with the{' '}
                <Link href="/find" className="text-saffron underline">AI Finder</Link>
              </p>
            </>
          ) : (
            /* ── Empty state ── */
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-card py-24 text-center px-6">
              <div className="text-6xl mb-5">🍽️</div>
              <h3 className="font-display text-2xl font-bold text-ink mb-2">
                Nothing here yet
              </h3>
              <p className="text-ink-muted text-sm mb-4 max-w-xs leading-relaxed">
                Use the AI Finder to generate recipes from your ingredients.
                They'll be saved here automatically with real database IDs.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/find"
                  className="inline-flex items-center gap-2 bg-saffron hover:bg-saffron-deep text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  Open AI Finder
                </Link>
                <a
                  href="/api/seed"
                  className="inline-flex items-center gap-2 border border-border-dark hover:border-ink bg-transparent text-ink px-6 py-3 rounded-full font-semibold text-sm transition-colors hover:bg-cream"
                >
                  Seed 25 Starter Recipes
                </a>
              </div>
            </div>
          )}
        </div>

        <footer className="border-t border-border px-6 py-6 max-w-6xl mx-auto flex items-center justify-between text-xs text-ink-faint">
          <span>© 2025 <strong className="text-ink">Kadh.ai</strong></span>
          <span>Gemini · Next.js 14 · Supabase · Unsplash</span>
        </footer>
      </main>
    </>
  )
}