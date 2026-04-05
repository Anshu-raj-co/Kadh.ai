import Link from 'next/link'
import { Sparkles, BookOpen } from 'lucide-react'
import Navbar from '@/components/Navbar'
import RecipeCard from '@/components/RecipeCard'
import { getAllRecipes } from '@/lib/supabase'

// Server Component — fetches all saved recipes from Supabase at request time
export const metadata = {
  title: 'Saved Recipes — Kadh.ai',
  description: 'All recipes generated and saved by Kadh.ai',
}

export default async function SavedRecipesPage() {
  const recipes = await getAllRecipes()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-warm-white">

        {/* Header */}
        <div className="border-b border-border bg-gradient-to-b from-cream to-warm-white">
          <div className="max-w-6xl mx-auto px-6 py-14">
            <div className="flex items-start justify-between gap-6">
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

              <Link
                href="/find"
                className="
                  flex-shrink-0 hidden sm:inline-flex items-center gap-2
                  bg-ink hover:bg-saffron text-warm-white
                  px-5 py-3 rounded-full font-semibold text-sm
                  transition-all duration-200 hover:shadow-card
                "
              >
                <Sparkles className="w-4 h-4" />
                Generate More
              </Link>
            </div>
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          {recipes.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map(recipe => (
                <Link key={recipe.id} href={`/recipe/${recipe.id}`} className="block">
                  <RecipeCard
                    recipe={{
                      ...recipe,
                      description: recipe.description ?? '',
                      tags:        recipe.tags ?? [],
                      ingredients: recipe.ingredients ?? [],
                      steps:       recipe.steps ?? [],
                    }}
                  />
                </Link>
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-card py-24 text-center">
              <div className="text-6xl mb-5">🍽️</div>
              <h3 className="font-display text-2xl font-bold text-ink mb-2">Nothing here yet</h3>
              <p className="text-ink-muted text-sm mb-8 max-w-xs leading-relaxed">
                Use the AI Finder to generate recipes from your ingredients — they'll be saved here automatically.
              </p>
              <Link
                href="/find"
                className="inline-flex items-center gap-2 bg-saffron hover:bg-saffron-deep text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                Open AI Finder
              </Link>
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
