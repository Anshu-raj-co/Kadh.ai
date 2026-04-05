'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import {
  Sparkles, ChefHat, AlertCircle, RotateCcw,
  ArrowRight, UtensilsCrossed, Leaf, ShieldCheck,
  CheckCircle2, AlertTriangle, Timer, ArrowLeftRight,
  Lightbulb, Target,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import IngredientInput from '@/components/IngredientInput'
import AllergySelector, { ALLERGY_OPTIONS, PREFERENCE_OPTIONS } from '@/components/AllergySelector'
import RecipeCard, { type Recipe } from '@/components/RecipeCard'
import type { UserGoal, RecipeStep } from '@/app/api/generate/route'

// ── Types ─────────────────────────────────────────────────────────────────────

interface ApiRecipe extends Recipe {
  saved:         boolean
  steps:         RecipeStep[]   // overrides the string[] from base Recipe type
  substitutions: string[]
  chef_insight:  string
  goal:          UserGoal
}

// ── Goal selector config (mirrors GOAL_CONFIGS in route.ts, UI-only copy) ────
const GOALS: Array<{
  value:       UserGoal
  label:       string
  emoji:       string
  description: string
  activeClass: string
  dotClass:    string
}> = [
  {
    value:       'Balanced',
    label:       'Balanced',
    emoji:       '⚖️',
    description: 'Well-rounded macros',
    activeClass: 'bg-sage-light border-sage text-sage',
    dotClass:    'bg-sage',
  },
  {
    value:       'Bulking',
    label:       'Bulking',
    emoji:       '💪',
    description: 'High protein & calories',
    activeClass: 'bg-saffron-light border-saffron text-saffron-deep',
    dotClass:    'bg-saffron',
  },
  {
    value:       'Cutting',
    label:       'Cutting',
    emoji:       '🔥',
    description: 'High volume, low cal',
    activeClass: 'bg-rose-light border-rose text-rose',
    dotClass:    'bg-rose',
  },
  {
    value:       'Budget',
    label:       'Budget',
    emoji:       '💰',
    description: 'Nutritious & affordable',
    activeClass: 'bg-[#fef3dd] border-[#e8a020] text-[#8a6314]',
    dotClass:    'bg-[#e8a020]',
  },
]

// ── Loading steps ─────────────────────────────────────────────────────────────
const LOADING_STEPS = [
  { icon: '🧠', text: 'Analysing ingredients…' },
  { icon: '🎯', text: 'Applying goal profile…' },
  { icon: '👨‍🍳', text: 'Crafting pro recipes…' },
  { icon: '📊', text: 'Calculating macros…' },
  { icon: '📸', text: 'Fetching food photos…' },
  { icon: '💾', text: 'Saving to library…' },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function StepCard({ step, title, children }: {
  step: number
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-card border border-border shadow-card p-7">
      <h2 className="font-display text-xl font-bold text-ink mb-5 flex items-center gap-3">
        <span className="w-7 h-7 rounded-full bg-saffron text-white flex items-center justify-center font-body text-sm font-bold flex-shrink-0">
          {step}
        </span>
        {title}
      </h2>
      {children}
    </div>
  )
}

// Enhanced result card showing the new fields inline before linking to detail
function ResultCard({ recipe }: { recipe: ApiRecipe }) {
  const goalConfig = GOALS.find(g => g.value === recipe.goal)

  return (
    <div className="bg-white rounded-card border border-border shadow-card overflow-hidden flex flex-col">

      {/* RecipeCard image + meta (reuse existing component for the header) */}
      <div className="flex-1">
        <RecipeCard recipe={recipe} />
      </div>

      {/* ── Chef's Insight ── */}
      {recipe.chef_insight && (
        <div className="mx-5 mb-4 px-4 py-3 rounded-DEFAULT bg-saffron-light border border-saffron/20">
          <div className="flex items-start gap-2">
            <Target className="w-3.5 h-3.5 text-saffron flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[0.7rem] font-bold uppercase tracking-widest text-saffron-deep block mb-0.5">
                {goalConfig?.emoji} {recipe.goal} Insight
              </span>
              <p className="text-[0.8rem] text-ink-muted leading-relaxed">
                {recipe.chef_insight}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Substitutions preview (first one only) ── */}
      {recipe.substitutions?.length > 0 && (
        <div className="mx-5 mb-4 px-4 py-3 rounded-DEFAULT bg-sage-light border border-sage/20">
          <div className="flex items-start gap-2">
            <ArrowLeftRight className="w-3.5 h-3.5 text-sage flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[0.7rem] font-bold uppercase tracking-widest text-sage block mb-0.5">
                Smart Swap
              </span>
              <p className="text-[0.8rem] text-ink-muted leading-relaxed">
                {recipe.substitutions[0]}
              </p>
              {recipe.substitutions.length > 1 && (
                <p className="text-[0.72rem] text-ink-faint mt-1">
                  +{recipe.substitutions.length - 1} more swap{recipe.substitutions.length > 2 ? 's' : ''} in full recipe
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Step count with timer preview ── */}
      {recipe.steps?.length > 0 && (
        <div className="mx-5 mb-5 flex items-center gap-3 text-xs text-ink-faint">
          <span className="flex items-center gap-1">
            <ChefHat className="w-3.5 h-3.5" />
            {recipe.steps.length} professional steps
          </span>
          {(() => {
            const timedSteps = recipe.steps.filter(s => s.timer_minutes && s.timer_minutes > 0)
            const totalMins  = timedSteps.reduce((acc, s) => acc + (s.timer_minutes ?? 0), 0)
            return timedSteps.length > 0 ? (
              <span className="flex items-center gap-1">
                <Timer className="w-3.5 h-3.5" />
                {totalMins} min active cooking
              </span>
            ) : null
          })()}
        </div>
      )}

    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function FindPage() {
  // Form state
  const [ingredients, setIngredients] = useState<string[]>([])
  const [allergies,   setAllergies]   = useState<string[]>([])
  const [avoids,      setAvoids]      = useState<string[]>([])
  const [prefs,       setPrefs]       = useState<string[]>([])
  const [count,       setCount]       = useState<number>(3)
  const [goal,        setGoal]        = useState<UserGoal>('Balanced')

  // Async state
  const [loadingStep, setLoadingStep] = useState<number>(-1)
  const [error,       setError]       = useState<string | null>(null)
  const [results,     setResults]     = useState<ApiRecipe[]>([])

  const isLoading  = loadingStep >= 0
  const hasResults = results.length > 0

  const addIngredient    = useCallback((v: string) => setIngredients(p => [...p, v]), [])
  const removeIngredient = useCallback((i: number) => setIngredients(p => p.filter((_, idx) => idx !== i)), [])
  const addAvoid         = useCallback((v: string) => setAvoids(p => [...p, v]), [])
  const removeAvoid      = useCallback((i: number) => setAvoids(p => p.filter((_, idx) => idx !== i)), [])

  const handleReset = () => { setResults([]); setError(null); setLoadingStep(-1) }

  // ── Generate ────────────────────────────────────────────────────────────────
  const handleGenerate = async () => {
    if (ingredients.length === 0) {
      setError('Add at least one ingredient before generating recipes.')
      return
    }

    setError(null)
    setResults([])

    try {
      setLoadingStep(0)
      await tick()

      const apiCallPromise = fetch('/api/generate', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ingredients, allergies, avoids, prefs, count, goal }),
      })

      // Animate steps client-side while server works
      const stepAnimator = (async () => {
        for (let step = 1; step <= 5; step++) {
          await sleep(2000)
          setLoadingStep(step)
        }
      })()

      const generateRes = await apiCallPromise
      void stepAnimator

      if (!generateRes.ok) {
        const errBody = await generateRes.json().catch(() => ({}))
        throw new Error((errBody as { error?: string }).error ?? `Request failed (${generateRes.status})`)
      }

      const data = await generateRes.json() as { recipes: ApiRecipe[] }
      if (!data.recipes || data.recipes.length === 0) {
        throw new Error('No recipes were returned. Please try again.')
      }

      setResults(data.recipes)

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoadingStep(-1)
    }
  }

  const selectedGoalConfig = GOALS.find(g => g.value === goal)!

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-warm-white">

        {/* ── Header ── */}
        <div className="border-b border-border bg-gradient-to-b from-saffron-light/60 to-warm-white">
          <div className="max-w-3xl mx-auto px-6 py-12 text-center">
            <div className="inline-flex items-center gap-2 mb-4 bg-white border border-border rounded-full px-4 py-1.5 text-sm font-medium text-ink-muted shadow-badge">
              <Sparkles className="w-3.5 h-3.5 text-saffron" />
              Professional Culinary AI
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-ink leading-tight mb-4">
              What can you cook <em className="text-saffron not-italic">today?</em>
            </h1>
            <p className="text-ink-muted text-lg leading-relaxed max-w-xl mx-auto">
              Tell us your ingredients and goal — Kadh.ai generates chef-quality recipes
              with professional steps, smart substitutions, and precise nutrition.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-10 space-y-5">

          {/* ── Step 1: Goal selector (NEW) ── */}
          <StepCard step={1} title="What's your goal?">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {GOALS.map(g => (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => setGoal(g.value)}
                  className={`
                    flex flex-col items-center gap-1.5
                    p-4 rounded-DEFAULT border-2 font-medium text-sm
                    transition-all duration-150 text-center
                    ${goal === g.value
                      ? g.activeClass + ' scale-[1.02] shadow-card'
                      : 'bg-white border-border text-ink-muted hover:border-border-dark'
                    }
                  `}
                >
                  <span className="text-2xl leading-none">{g.emoji}</span>
                  <span className="font-bold text-[0.875rem]">{g.label}</span>
                  <span className="text-[0.7rem] opacity-75 leading-tight">{g.description}</span>
                </button>
              ))}
            </div>

            {/* Active goal description */}
            <div className={`
              mt-4 flex items-center gap-2 px-4 py-2.5 rounded-DEFAULT text-sm
              ${selectedGoalConfig.activeClass} border
            `}>
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${selectedGoalConfig.dotClass}`} />
              <span className="font-medium">{selectedGoalConfig.label}:</span>
              <span className="opacity-80">{selectedGoalConfig.description}</span>
            </div>
          </StepCard>

          {/* ── Step 2: Ingredients ── */}
          <StepCard step={2} title="What's in your kitchen?">
            <IngredientInput
              items={ingredients}
              onAdd={addIngredient}
              onRemove={removeIngredient}
              placeholder="e.g. chicken, tomatoes, garlic…"
              inputId="main-ingredient-input"
            />
          </StepCard>

          {/* ── Step 3: Allergies ── */}
          <StepCard step={3} title="Any allergies or restrictions?">
            <AllergySelector
              options={ALLERGY_OPTIONS}
              selected={allergies}
              onChange={setAllergies}
              variant="allergy"
            />
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm font-semibold text-ink-muted mb-3">
                Ingredients you dislike or don't have:
              </p>
              <IngredientInput
                items={avoids}
                onAdd={addAvoid}
                onRemove={removeAvoid}
                placeholder="e.g. coriander, mushrooms…"
                variant="avoid"
                inputId="avoid-input"
              />
            </div>
          </StepCard>

          {/* ── Step 4: Preferences ── */}
          <StepCard step={4} title="Dietary preferences">
            <AllergySelector
              options={PREFERENCE_OPTIONS}
              selected={prefs}
              onChange={setPrefs}
              variant="preference"
            />
          </StepCard>

          {/* ── Step 5: Count ── */}
          <StepCard step={5} title="How many recipe options?">
            <div className="flex gap-3">
              {[3, 4, 5].map(n => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setCount(n)}
                  className={`
                    flex-1 py-3 rounded-DEFAULT border-2 font-semibold text-sm
                    transition-all duration-150
                    ${count === n
                      ? 'bg-saffron-light border-saffron text-saffron-deep scale-[1.02]'
                      : 'bg-white border-border text-ink-muted hover:border-saffron'
                    }
                  `}
                >
                  {n} Recipes
                </button>
              ))}
            </div>
          </StepCard>

          {/* ── Error ── */}
          {error && (
            <div className="flex items-start gap-3 bg-rose-light border border-rose-border rounded-card px-5 py-4 animate-fade-up">
              <AlertCircle className="w-5 h-5 text-rose flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-rose text-sm">Something went wrong</p>
                <p className="text-rose/80 text-sm mt-0.5">{error}</p>
              </div>
            </div>
          )}

          {/* ── Generate button ── */}
          {!isLoading && !hasResults && (
            <button
              type="button"
              onClick={handleGenerate}
              className="
                w-full flex items-center justify-center gap-3
                py-5 rounded-card
                bg-ink hover:bg-saffron text-warm-white
                font-display text-xl italic font-bold
                transition-all duration-200
                hover:-translate-y-0.5 hover:shadow-card-lg
              "
            >
              <span className="text-lg">{selectedGoalConfig.emoji}</span>
              Generate {count} {goal} Recipes
              <ArrowRight className="w-5 h-5" />
            </button>
          )}

          {/* ── Loading ── */}
          {isLoading && (
            <div className="bg-white rounded-card border border-border shadow-card px-8 py-12 text-center animate-fade-up">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-saffron-light border-2 border-saffron/30 animate-[ping_2s_ease-in-out_infinite] opacity-50" />
                <div className="relative w-20 h-20 rounded-full bg-saffron-light border-2 border-saffron/20 flex items-center justify-center">
                  <ChefHat className="w-9 h-9 text-saffron animate-[bounce_1.4s_ease-in-out_infinite]" />
                </div>
              </div>
              <p className="font-display text-xl font-bold text-ink mb-1">
                {selectedGoalConfig.emoji} Crafting {goal} Recipes…
              </p>
              <p className="text-ink-muted text-sm mb-6">
                Generating {count} professional recipes tailored to your {goal.toLowerCase()} goal
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {LOADING_STEPS.map((s, i) => (
                  <span key={i} className={`
                    inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border
                    transition-all duration-300
                    ${i < loadingStep
                      ? 'bg-sage-light border-sage/30 text-sage'
                      : i === loadingStep
                      ? 'bg-saffron-light border-saffron/40 text-saffron-deep scale-105'
                      : 'bg-cream border-border text-ink-faint'
                    }
                  `}>
                    {s.icon} {s.text}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── Results ── */}
          {hasResults && !isLoading && (
            <div className="animate-fade-up space-y-6">

              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl font-bold text-ink">
                    ✦ {results.length} {goal} recipes for you
                  </h2>
                  <p className="text-ink-muted text-sm mt-1">
                    Click any card to view the full professional steps and nutrition breakdown
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-saffron transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Start over
                </button>
              </div>

              {/* Cards */}
              <div className="grid sm:grid-cols-2 gap-5">
                {results.map(recipe => (
                  <div key={recipe.id} className="relative">

                    {/* Saved badge */}
                    {recipe.saved && (
                      <div className="absolute -top-2 -right-2 z-10 flex items-center gap-1 bg-sage text-white text-[0.65rem] font-bold px-2 py-1 rounded-full shadow-badge">
                        <CheckCircle2 className="w-3 h-3" />
                        Saved
                      </div>
                    )}

                    {/* Not saved warning */}
                    {!recipe.saved && (
                      <div className="absolute -top-2 -right-2 z-10 flex items-center gap-1 bg-rose text-white text-[0.65rem] font-bold px-2 py-1 rounded-full shadow-badge">
                        <AlertTriangle className="w-3 h-3" />
                        Not saved
                      </div>
                    )}

                    {recipe.saved ? (
                      <Link href={`/recipe/${recipe.id}`} className="block">
                        <ResultCard recipe={recipe} />
                      </Link>
                    ) : (
                      <div className="opacity-75 cursor-not-allowed">
                        <ResultCard recipe={recipe} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* ── Substitutions summary strip ── */}
              {results.some(r => r.substitutions?.length > 0) && (
                <div className="bg-white rounded-card border border-border shadow-card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <ArrowLeftRight className="w-4 h-4 text-sage" />
                    <h3 className="font-display font-bold text-ink">
                      All Smart Substitutions
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {results.filter(r => r.saved && r.substitutions?.length > 0).map(recipe => (
                      <div key={recipe.id}>
                        <p className="text-xs font-bold text-ink-muted uppercase tracking-widest mb-2">
                          {recipe.emoji} {recipe.title}
                        </p>
                        <ul className="space-y-1">
                          {recipe.substitutions.map((sub, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-ink-muted">
                              <span className="w-1.5 h-1.5 rounded-full bg-sage flex-shrink-0 mt-2" />
                              {sub}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Chef's insight strip ── */}
              {results.some(r => r.chef_insight) && (
                <div className="bg-saffron-light rounded-card border border-saffron/20 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="w-4 h-4 text-saffron" />
                    <h3 className="font-display font-bold text-ink">
                      {selectedGoalConfig.emoji} Why These Recipes Fit Your {goal} Goal
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {results.filter(r => r.saved && r.chef_insight).map(recipe => (
                      <div key={recipe.id} className="flex items-start gap-3">
                        <span className="text-lg flex-shrink-0">{recipe.emoji}</span>
                        <div>
                          <span className="text-xs font-bold text-saffron-deep">{recipe.title}: </span>
                          <span className="text-sm text-ink-muted">{recipe.chef_insight}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action bar */}
              <div className="flex flex-col sm:flex-row gap-3 bg-white rounded-card border border-border shadow-card px-6 py-5">
                <button
                  type="button"
                  onClick={() => { setResults([]); setError(null) }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-DEFAULT bg-ink hover:bg-saffron text-warm-white font-semibold text-sm transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  Generate New Options
                </button>
                <Link
                  href="/saved"
                  className="flex items-center justify-center gap-2 py-3 px-5 rounded-DEFAULT border border-border hover:border-ink bg-transparent text-ink font-semibold text-sm transition-all hover:bg-cream"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  View All Saved Recipes
                </Link>
              </div>

              {/* Trust strip */}
              <div className="flex items-center justify-center gap-6 pt-1 text-xs text-ink-faint">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-sage" /> Allergen-safe
                </span>
                <span className="flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-sage" /> Nutrition verified
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-saffron" /> Saved to library
                </span>
              </div>

            </div>
          )}

        </div>
      </main>
    </>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms))
const tick  = () => new Promise<void>(r => requestAnimationFrame(() => r()))
