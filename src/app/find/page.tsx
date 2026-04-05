'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import {
  Sparkles, ChefHat, AlertCircle,
  RotateCcw, ArrowRight, UtensilsCrossed,
  Leaf, ShieldCheck, CheckCircle2,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import IngredientInput from '@/components/IngredientInput'
import AllergySelector, { ALLERGY_OPTIONS, PREFERENCE_OPTIONS } from '@/components/AllergySelector'
import RecipeCard, { type Recipe } from '@/components/RecipeCard'

// ── Loading steps ─────────────────────────────────────────────────────────────
const LOADING_STEPS = [
  { icon: '🧠', text: 'Analysing ingredients…' },
  { icon: '🍳', text: 'Crafting recipe options…' },
  { icon: '🚫', text: 'Checking for allergens…' },
  { icon: '📊', text: 'Calculating nutrition…' },
  { icon: '📸', text: 'Fetching food photos…' },
  { icon: '💾', text: 'Saving to library…' },
]

// ── Step card wrapper ─────────────────────────────────────────────────────────
function StepCard({ step, title, children }: { step: number; title: string; children: React.ReactNode }) {
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

export default function FindPage() {
  const [ingredients, setIngredients] = useState<string[]>([])
  const [allergies, setAllergies] = useState<string[]>([])
  const [avoids, setAvoids] = useState<string[]>([])
  const [prefs, setPrefs] = useState<string[]>([])
  const [count, setCount] = useState<number>(3)

  const [loadingStep, setLoadingStep] = useState<number>(-1)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<Recipe[]>([])
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())

  const isLoading = loadingStep >= 0
  const hasResults = results.length > 0

  const addIngredient = useCallback((v: string) => setIngredients(p => [...p, v]), [])
  const removeIngredient = useCallback((i: number) => setIngredients(p => p.filter((_, idx) => idx !== i)), [])
  const addAvoid = useCallback((v: string) => setAvoids(p => [...p, v]), [])
  const removeAvoid = useCallback((i: number) => setAvoids(p => p.filter((_, idx) => idx !== i)), [])

  const handleReset = () => { setResults([]); setError(null); setLoadingStep(-1); setSavedIds(new Set()) }

  const handleGenerate = async () => {
    if (ingredients.length === 0) {
      setError('Add at least one ingredient before generating recipes.')
      return
    }
    setError(null)
    setResults([])
    setSavedIds(new Set())

    try {
      setLoadingStep(0)
      await tick()

      // The Backend handles generation, photo fetching, AND database saving
      const generateRes = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients, allergies, avoids, prefs, count }),
      })

      if (!generateRes.ok) {
        const body = await generateRes.json().catch(() => ({}))
        throw new Error((body as { error?: string }).error ?? `Request failed (${generateRes.status})`)
      }

      const data = await generateRes.json()
      const savedRecipes = data.recipes as Recipe[]

      // Simulated loading progress for UI feedback
      setLoadingStep(1); await sleep(300)
      setLoadingStep(2); await sleep(300)
      setLoadingStep(3); await sleep(300)
      setLoadingStep(4); await sleep(300)
      setLoadingStep(5); await sleep(300)

      setResults(savedRecipes)

      // Mark all as saved using the real database IDs returned from the backend
      const saved = new Set<string>(savedRecipes.map(r => r.id))
      setSavedIds(saved)

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoadingStep(-1)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-warm-white">
        <div className="border-b border-border bg-gradient-to-b from-saffron-light/60 to-warm-white">
          <div className="max-w-3xl mx-auto px-6 py-12 text-center">
            <div className="inline-flex items-center gap-2 mb-4 bg-white border border-border rounded-full px-4 py-1.5 text-sm font-medium text-ink-muted shadow-badge">
              <Sparkles className="w-3.5 h-3.5 text-saffron" />
              Powered by Gemini AI
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-ink leading-tight mb-4">
              What can you cook <em className="text-saffron not-italic">today?</em>
            </h1>
            <p className="text-ink-muted text-lg leading-relaxed max-w-xl mx-auto">
              Tell us what's in your kitchen — we'll generate multiple recipe options with nutrition facts and cooking steps.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-10 space-y-5">
          <StepCard step={1} title="What's in your kitchen?">
            <IngredientInput items={ingredients} onAdd={addIngredient} onRemove={removeIngredient} placeholder="e.g. chicken, tomatoes, garlic…" inputId="main-ingredient-input" />
          </StepCard>

          <StepCard step={2} title="Any allergies or restrictions?">
            <AllergySelector options={ALLERGY_OPTIONS} selected={allergies} onChange={setAllergies} variant="allergy" />
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm font-semibold text-ink-muted mb-3">Ingredients you dislike or don't have:</p>
              <IngredientInput items={avoids} onAdd={addAvoid} onRemove={removeAvoid} placeholder="e.g. coriander, mushrooms…" variant="avoid" inputId="avoid-input" />
            </div>
          </StepCard>

          <StepCard step={3} title="Dietary preferences">
            <AllergySelector options={PREFERENCE_OPTIONS} selected={prefs} onChange={setPrefs} variant="preference" />
          </StepCard>

          <StepCard step={4} title="How many recipe options do you want?">
            <div className="flex gap-3">
              {[3, 4, 5].map(n => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setCount(n)}
                  className={`flex-1 py-3 rounded-DEFAULT border font-semibold text-sm transition-all duration-150 ${count === n ? 'bg-saffron-light border-saffron text-saffron-deep' : 'bg-white border-border text-ink-muted hover:border-saffron'}`}
                >
                  {n} Recipes
                </button>
              ))}
            </div>
          </StepCard>

          {error && (
            <div className="flex items-start gap-3 bg-rose-light border border-rose-border rounded-card px-5 py-4 animate-fade-up">
              <AlertCircle className="w-5 h-5 text-rose flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-rose text-sm">Something went wrong</p>
                <p className="text-rose/80 text-sm mt-0.5">{error}</p>
              </div>
            </div>
          )}

          {!isLoading && !hasResults && (
            <button
              type="button"
              onClick={handleGenerate}
              className="w-full flex items-center justify-center gap-3 py-5 rounded-card bg-ink hover:bg-saffron text-warm-white font-display text-xl italic font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-lg"
            >
              <Sparkles className="w-5 h-5" />
              Generate {count} Recipe Options
              <ArrowRight className="w-5 h-5" />
            </button>
          )}

          {isLoading && (
            <div className="bg-white rounded-card border border-border shadow-card px-8 py-12 text-center animate-fade-up">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-saffron-light border-2 border-saffron/30 animate-[ping_2s_ease-in-out_infinite] opacity-50" />
                <div className="relative w-20 h-20 rounded-full bg-saffron-light border-2 border-saffron/20 flex items-center justify-center">
                  <ChefHat className="w-9 h-9 text-saffron animate-[bounce_1.4s_ease-in-out_infinite]" />
                </div>
              </div>
              <p className="font-display text-xl font-bold text-ink mb-1">Kadh.ai is cooking…</p>
              <p className="text-ink-muted text-sm mb-6">Generating {count} distinct recipes for your pantry</p>
              <div className="flex flex-wrap justify-center gap-2">
                {LOADING_STEPS.map((s, i) => (
                  <span key={i} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 ${i < loadingStep ? 'bg-sage-light border-sage/30 text-sage' : i === loadingStep ? 'bg-saffron-light border-saffron/40 text-saffron-deep scale-105' : 'bg-cream border-border text-ink-faint'}`}>
                    {s.icon} {s.text}
                  </span>
                ))}
              </div>
            </div>
          )}

          {hasResults && !isLoading && (
            <div className="animate-fade-up space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl font-bold text-ink">✦ {results.length} recipes for your kitchen</h2>
                  <p className="text-ink-muted text-sm mt-1">Click any card to view the full recipe, steps, and nutrition breakdown</p>
                </div>
                <button type="button" onClick={handleReset} className="flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-saffron transition-colors">
                  <RotateCcw className="w-3.5 h-3.5" />
                  Start over
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {results.map((recipe) => (
                  <div key={recipe.id} className="relative">
                    {savedIds.has(recipe.id) && (
                      <div className="absolute -top-2 -right-2 z-10 flex items-center gap-1 bg-sage text-white text-[0.65rem] font-bold px-2 py-1 rounded-full shadow-badge">
                        <CheckCircle2 className="w-3 h-3" />
                        Saved
                      </div>
                    )}
                    <Link href={`/recipe/${recipe.id}`} className="block h-full">
                      <RecipeCard recipe={recipe} />
                    </Link>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 bg-white rounded-card border border-border shadow-card px-6 py-5">
                <button type="button" onClick={handleReset} className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-DEFAULT bg-ink hover:bg-saffron text-warm-white font-semibold text-sm transition-all duration-200">
                  <Sparkles className="w-4 h-4" />
                  Generate New Options
                </button>
                <Link href="/saved" className="flex items-center justify-center gap-2 py-3 px-5 rounded-DEFAULT border border-border hover:border-ink bg-transparent text-ink font-semibold text-sm transition-all hover:bg-cream">
                  <UtensilsCrossed className="w-4 h-4" />
                  View All Saved Recipes
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms))
const tick = () => new Promise<void>(r => requestAnimationFrame(() => r()))