import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, Brain, Leaf, ShieldCheck, ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import RecipeCard from '@/components/RecipeCard'
import { getAllRecipes } from '@/lib/supabase'

// ── Server Component — no 'use client' ───────────────────────────────────────
// Runs on every request. The shuffle happens server-side so every page
// visit (full navigation) shows a fresh random 6. Since Next.js 14 App Router
// server components are dynamic by default when they read from a data source,
// each visit re-fetches and re-shuffles without any client JS needed.

export const dynamic = 'force-dynamic'

function shuffleArray<T>(arr: T[]): T[] {
  // Fisher-Yates shuffle — runs server-side on every request
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default async function HomePage() {
  const allRecipes = await getAllRecipes()
  // Pick 6 random recipes on every server render
  const showcaseRecipes = shuffleArray(allRecipes).slice(0, 6)

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-warm-white">

        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden border-b border-border">
          {/* Subtle dot grid background */}
          <div className="
            absolute inset-0 pointer-events-none
            bg-[radial-gradient(circle,#E7E0D6_1px,transparent_1px)]
            bg-[size:28px_28px] opacity-60
          " />

          <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
            <div className="grid md:grid-cols-2 gap-14 items-center">

              {/* ── Left: Text ── */}
              <div>
                <div className="
                  inline-flex items-center gap-2 mb-6
                  bg-white border border-border rounded-full
                  px-4 py-1.5 text-sm font-medium text-ink-muted shadow-badge
                ">
                  <Sparkles className="w-3.5 h-3.5 text-saffron" />
                  AI-Powered Recipe Generation
                </div>

                <h1 className="font-display text-5xl md:text-[3.5rem] font-bold text-ink leading-[1.08] mb-6">
                  Cook{' '}
                  <em className="text-saffron not-italic">smarter</em>
                  {' '}with what you have
                </h1>

                <p className="text-ink-muted text-lg leading-relaxed mb-8 max-w-md">
                  Tell us your ingredients, your allergies, and your preferences.
                  Kadh.ai generates personalised recipes with full nutrition facts — instantly.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/find"
                    className="
                      inline-flex items-center gap-2
                      bg-ink hover:bg-saffron text-warm-white
                      px-7 py-3.5 rounded-full font-semibold text-base
                      transition-all duration-200
                      hover:-translate-y-0.5 hover:shadow-card-lg
                    "
                  >
                    <Sparkles className="w-4 h-4" />
                    Find My Recipe
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href="#saved"
                    className="
                      inline-flex items-center gap-2
                      bg-transparent hover:bg-cream text-ink
                      border border-border-dark
                      px-7 py-3.5 rounded-full font-semibold text-base
                      transition-all duration-200
                    "
                  >
                    Browse Recipes ↓
                  </a>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-5 mt-8 text-sm text-ink-faint">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-sage" /> Allergen-aware
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Leaf className="w-4 h-4 text-sage" /> Nutrition tracked
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Brain className="w-4 h-4 text-saffron" /> Gemini AI
                  </span>
                </div>
              </div>

              {/* ── Right: Circular image with food photo ── */}
              <div className="relative flex items-center justify-center h-[400px]">
                {/* Slow-spinning outer dashed ring */}
                <div className="
                  absolute w-[340px] h-[340px] rounded-full
                  border-2 border-dashed border-border
                  animate-[spin_40s_linear_infinite]
                " />

                {/* Static middle ring */}
                <div className="absolute w-[290px] h-[290px] rounded-full border border-border/60" />

                {/* ── Circular food image — your uploaded photo ── */}
                <div className="
                  relative w-[230px] h-[230px] rounded-full
                  overflow-hidden
                  border-2 border-border
                  shadow-card-lg
                  animate-float
                ">
                  <Image
                    src="/kadh-hero.png"
                    alt="Spiced curry in a wok on flame — Kadh.ai"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="230px"
                  />
                </div>

                {/* Floating badges */}
                <FloatingBadge className="top-10 right-2" color="orange">
                  <Sparkles className="w-3 h-3" /> AI-Powered
                </FloatingBadge>
                <FloatingBadge className="bottom-14 left-0" color="green">
                  <Leaf className="w-3 h-3" /> Nutrition tracked
                </FloatingBadge>
                <FloatingBadge className="top-[7rem] left-0" color="red">
                  <ShieldCheck className="w-3 h-3" /> Allergy-safe
                </FloatingBadge>
              </div>

            </div>
          </div>
        </section>

        {/* ══ FEATURES STRIP ════════════════════════════════════════════════ */}
        <section className="bg-ink text-white">
          <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <Brain className="w-6 h-6 text-saffron" />,
                title: 'AI Recipe Generation',
                body: 'Gemini analyses your exact pantry and generates recipes you can actually make right now — not just suggestions.',
              },
              {
                icon: <Leaf className="w-6 h-6 text-sage" />,
                title: 'Full Nutrition Facts',
                body: 'Every recipe includes protein, carbs, fat, fibre, calories, and a health score out of 100 based on nutritional balance.',
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-rose" />,
                title: 'Allergy & Preference Aware',
                body: "Mark your allergies and dislikes upfront — Kadh.ai will never suggest an ingredient you can't or won't eat.",
              },
            ].map(({ icon, title, body }) => (
              <div key={title}>
                <div className="mb-4">{icon}</div>
                <h3 className="font-display text-lg font-bold mb-2">{title}</h3>
                <p className="text-ink-faint text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ RECIPE GRID — 6 random recipes, shuffled each visit ══════════ */}
        <section id="saved" className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl font-bold text-ink">
                Community <em className="text-saffron not-italic">Recipes</em>
              </h2>
              <p className="text-ink-muted text-sm mt-1">
                {allRecipes.length > 0
                  ? `Showing 6 of ${allRecipes.length} recipes — refreshes randomly each visit`
                  : 'Real recipes generated and saved by Kadh.ai users'
                }
              </p>
            </div>
            <Link
              href="/saved"
              className="text-sm font-medium text-saffron border-b border-saffron hover:text-saffron-deep transition-colors"
            >
              View all →
            </Link>
          </div>

          {showcaseRecipes.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {showcaseRecipes.map((recipe) => (
                <Link key={recipe.id} href={`/recipe/${recipe.id}`} className="block">
                  <RecipeCard
                    recipe={{
                      ...recipe,
                      description: recipe.description ?? '',
                      tags: recipe.tags ?? [],
                      ingredients: recipe.ingredients ?? [],
                      steps: recipe.steps ?? [],
                    }}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className="
              flex flex-col items-center justify-center
              border-2 border-dashed border-border rounded-card
              py-20 text-center
            ">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="font-display text-xl font-bold text-ink mb-2">No recipes yet</h3>
              <p className="text-ink-muted text-sm mb-3 max-w-xs">
                Seed the database with 25 starter recipes, or generate your own with the AI Finder.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href="/api/seed"
                  className="inline-flex items-center gap-2 bg-ink hover:bg-saffron text-warm-white px-5 py-2.5 rounded-full font-semibold text-sm transition-colors"
                >
                  Seed 25 Recipes
                </a>
                <Link
                  href="/find"
                  className="inline-flex items-center gap-2 border border-border-dark hover:border-ink bg-transparent text-ink px-5 py-2.5 rounded-full font-semibold text-sm transition-colors hover:bg-cream"
                >
                  <Sparkles className="w-4 h-4 text-saffron" />
                  AI Finder
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* ══ CTA BANNER ════════════════════════════════════════════════════ */}
        <section className="mx-6 mb-16 rounded-card overflow-hidden bg-gradient-to-r from-ink to-ink-muted max-w-6xl lg:mx-auto">
          <div className="px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-white mb-2">
                Ready to cook smarter?
              </h2>
              <p className="text-ink-faint text-sm">
                Add your ingredients and let Kadh.ai do the thinking.
              </p>
            </div>
            <Link
              href="/find"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-saffron hover:bg-saffron-deep text-white px-8 py-3.5 rounded-full font-bold text-base transition-all hover:shadow-card-lg"
            >
              <Sparkles className="w-4 h-4" />
              Try It Free
            </Link>
          </div>
        </section>

        <footer className="border-t border-border px-6 py-6 max-w-6xl mx-auto flex items-center justify-between text-xs text-ink-faint">
          <span>© 2025 <strong className="text-ink">Kadh.ai</strong> — Cook Smarter with AI</span>
          <span>Gemini · Next.js 14 · Supabase · Unsplash</span>
        </footer>

      </main>
    </>
  )
}

// ── Floating badge helper ─────────────────────────────────────────────────────
function FloatingBadge({
  children,
  className,
  color,
}: {
  children: React.ReactNode
  className: string
  color: 'orange' | 'green' | 'red'
}) {
  const colors = { orange: 'bg-saffron', green: 'bg-sage', red: 'bg-rose' }
  return (
    <div className={`
      absolute flex items-center gap-1.5
      bg-white border border-border rounded-full
      px-3 py-1.5 text-xs font-semibold text-ink shadow-card
      ${className}
    `}>
      <span className={`w-2 h-2 rounded-full ${colors[color]}`} />
      {children}
    </div>
  )
}
