import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  Clock, Users, ChefHat, ArrowLeft,
  CheckCircle2, Lightbulb, Flame, Timer, RefreshCw, Sparkles,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import NutritionPanel from '@/components/NutritionPanel'
import { getRecipeById } from '@/lib/supabase'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const recipe = await getRecipeById(params.id)
  if (!recipe) return { title: 'Recipe not found — Kadh.ai' }
  return {
    title: `${recipe.title} — Kadh.ai`,
    description: recipe.description,
  }
}

// Type for the new professional step structure
type RecipeStep =
  | string
  | { instruction: string; timer_minutes?: number; pro_tip?: string }

export default async function RecipeDetailPage({ params }: { params: { id: string } }) {
  const recipe = await getRecipeById(params.id)
  if (!recipe) notFound()

  const healthColor =
    recipe.health_score >= 85 ? 'text-sage'
      : recipe.health_score >= 70 ? 'text-saffron'
        : 'text-rose'

  const difficultyColor =
    recipe.difficulty === 'Easy' ? 'bg-sage-light text-sage'
      : recipe.difficulty === 'Hard' ? 'bg-rose-light text-rose'
        : 'bg-saffron-light text-saffron-deep'

  // Normalise steps — handles both old (string[]) and new (object[]) shapes
  const steps: RecipeStep[] = recipe.steps ?? []

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-warm-white">

        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <section className="bg-saffron-light border-b border-border">
          <div className="max-w-5xl mx-auto px-6 py-10 md:py-14">

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-saffron transition-colors mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to recipes
            </Link>

            <div className="grid md:grid-cols-[1fr_280px] gap-10 items-center">
              <div>
                {recipe.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {recipe.tags.map((tag: string) => (
                      <span key={tag} className="text-[0.7rem] font-semibold uppercase tracking-[0.05em] px-2.5 py-0.5 rounded-full bg-white border border-border text-ink-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <h1 className="font-display text-4xl md:text-5xl font-bold text-ink leading-tight mb-4">
                  {recipe.title}
                </h1>

                <p className="text-ink-muted text-base leading-relaxed mb-6 max-w-lg">
                  {recipe.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  <MetaPill icon={<Clock className="w-3.5 h-3.5" />} label={recipe.time} />
                  <MetaPill icon={<Users className="w-3.5 h-3.5" />} label={`${recipe.servings} servings`} />
                  <MetaPill icon={<Flame className="w-3.5 h-3.5" />} label={`${recipe.calories} kcal`} />
                  {recipe.difficulty && (
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-transparent ${difficultyColor}`}>
                      <ChefHat className="w-3.5 h-3.5" />
                      {recipe.difficulty}
                    </span>
                  )}
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-border ${healthColor}`}>
                    ♥ Health {recipe.health_score}/100
                  </span>
                </div>
              </div>

              <div className="relative h-60 md:h-64 rounded-card overflow-hidden border border-border shadow-card-lg bg-white flex items-center justify-center">
                {recipe.image_url ? (
                  <Image
                    src={recipe.image_url}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 280px"
                    priority
                  />
                ) : (
                  <span className="text-8xl select-none" role="img" aria-label={recipe.title}>
                    🍽️
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ══ CHEF'S INSIGHT BANNER ════════════════════════════════════════ */}
        {recipe.chef_insight && (
          <section className="max-w-5xl mx-auto px-6 pt-10">
            <div className="bg-gradient-to-r from-saffron-light to-white border border-[#f0d5a0] rounded-card p-6 flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-saffron flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-ink mb-1 flex items-center gap-2">
                  Chef's Insight
                </h3>
                <p className="text-ink-muted text-sm leading-relaxed">{recipe.chef_insight}</p>
              </div>
            </div>
          </section>
        )}

        {/* ══ BODY ══════════════════════════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto px-6 py-10">
          <div className="grid md:grid-cols-[1fr_300px] gap-10">

            {/* ── Left column ── */}
            <div>

              {/* Ingredients */}
              <div className="mb-10">
                <h2 className="font-display text-2xl font-bold text-ink mb-5">Ingredients</h2>
                <ul className="divide-y divide-border">
                  {recipe.ingredients?.map((ingredient: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 py-3">
                      <CheckCircle2 className="w-4 h-4 text-sage flex-shrink-0" />
                      <span className="text-[0.95rem] text-ink">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Smart Substitutions */}
              {Array.isArray(recipe.substitutions) && recipe.substitutions.length > 0 && (
                <div className="mb-10">
                  <h2 className="font-display text-2xl font-bold text-ink mb-5 flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-saffron" />
                    Smart Substitutions
                  </h2>
                  <ul className="space-y-3">
                    {recipe.substitutions?.map((sub: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 bg-white border border-border rounded-card px-4 py-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-saffron-light text-saffron flex items-center justify-center text-xs font-bold mt-0.5">
                          ↔
                        </span>
                        <span className="text-[0.9rem] text-ink-muted leading-relaxed">{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Professional Steps */}
              <div className="mb-10">
                <h2 className="font-display text-2xl font-bold text-ink mb-5">How to Cook</h2>
                <ol className="space-y-6">
                  {steps.map((step, i) => {
                    // Support both old string steps and new object steps
                    const instruction = typeof step === 'string' ? step : step.instruction
                    const timer = typeof step === 'object' ? step.timer_minutes : undefined
                    const proTip = typeof step === 'object' ? step.pro_tip : undefined

                    return (
                      <li key={i} className="flex gap-4">
                        {/* Step number */}
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-ink text-warm-white flex items-center justify-center font-bold text-sm mt-0.5">
                          {i + 1}
                        </span>

                        <div className="flex-1 pb-6 border-b border-border last:border-b-0 last:pb-0">
                          {/* Instruction */}
                          <p className="text-[0.95rem] text-ink-muted leading-relaxed mb-3">
                            {instruction}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {/* Timer badge */}
                            {timer && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-saffron-light text-saffron-deep border border-[#f0d5a0]">
                                <Timer className="w-3 h-3" />
                                {timer} min
                              </span>
                            )}
                          </div>

                          {/* Per-step pro tip */}
                          {proTip && (
                            <div className="mt-3 flex items-start gap-2 bg-sage-light rounded-lg px-3 py-2.5">
                              <Lightbulb className="w-3.5 h-3.5 text-sage flex-shrink-0 mt-0.5" />
                              <p className="text-xs text-ink-muted leading-relaxed">{proTip}</p>
                            </div>
                          )}
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </div>

              {/* Chef's Tip (legacy field — kept for backward compat) */}
              {recipe.tips && (
                <div className="bg-saffron-light border border-[#f0d5a0] rounded-card p-6">
                  <h3 className="font-display text-lg font-bold text-ink mb-2 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-saffron" />
                    Chef's Tip
                  </h3>
                  <p className="text-ink-muted text-sm leading-relaxed">{recipe.tips}</p>
                </div>
              )}

            </div>

            {/* ── Right column — Nutrition ── */}
            <div>
              <NutritionPanel
                health_score={recipe.health_score}
                calories={recipe.calories}
                protein={recipe.protein}
                carbs={recipe.carbs}
                fat={recipe.fat}
                fiber={recipe.fiber}
              />

              <div className="mt-4 bg-white rounded-card border border-border shadow-card p-5 text-center">
                <p className="text-sm text-ink-muted mb-3 leading-relaxed">
                  Want more recipes from your pantry?
                </p>
                <Link
                  href="/find"
                  className="inline-flex items-center gap-2 bg-saffron hover:bg-saffron-deep text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-colors duration-200"
                >
                  Try the AI Finder
                </Link>
              </div>
            </div>

          </div>
        </section>

      </main>
    </>
  )
}

function MetaPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-border text-ink-muted">
      {icon}
      {label}
    </span>
  )
}