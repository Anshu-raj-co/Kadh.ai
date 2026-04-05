'use client'

import Image from 'next/image'
import { Clock, Users, Flame, Heart } from 'lucide-react'

// ── Step type — supports both old string[] and new object[] shapes ─────────────
export type RecipeStep =
  | string
  | { instruction: string; timer_minutes?: number; pro_tip?: string }

// ── Types ─────────────────────────────────────────────────────────────────────
export interface Recipe {
  id: string
  title: string
  description: string
  emoji?: string
  image_url?: string | null
  time: string
  servings: number
  health_score: number
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  tags: string[]
  ingredients: string[]
  steps: RecipeStep[]       // updated: supports both string[] and object[]
  difficulty?: string
  tips?: string
  category?: string
  // ── New fields added in schema upgrade ──
  substitutions?: string[]
  chef_insight?: string
  goal?: string
}

interface RecipeCardProps {
  recipe: Recipe
  onClick?: (recipe: Recipe) => void
}

// ── Tag variant helper ────────────────────────────────────────────────────────
function getTagClass(tag: string): string {
  const lower = tag.toLowerCase()
  if (lower === 'vegetarian' || lower === 'vegan') {
    return 'bg-sage-light text-sage'
  }
  if (lower === 'spicy') {
    return 'bg-rose-light text-rose'
  }
  return 'bg-cream text-ink-muted'
}

// ── Health score color helpers ────────────────────────────────────────────────
function getHealthColor(score: number): string {
  if (score >= 85) return 'text-sage'
  if (score >= 70) return 'text-saffron'
  return 'text-rose'
}

function getHealthFillColor(score: number): string {
  if (score >= 85) return 'bg-sage'
  if (score >= 70) return 'bg-saffron'
  return 'bg-rose'
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  const {
    title,
    description,
    emoji,
    image_url,
    time,
    servings,
    health_score,
    calories,
    tags,
    category,
  } = recipe

  return (
    <article
      onClick={() => onClick?.(recipe)}
      className="
        group bg-white rounded-card border border-border
        overflow-hidden cursor-pointer
        shadow-card hover:shadow-card-lg
        hover:-translate-y-1 hover:border-saffron
        transition-all duration-200
      "
    >
      {/* ── Card Image / Emoji ── */}
      <div className="relative h-[200px] bg-saffron-light flex items-center justify-center overflow-hidden">
        {image_url ? (
          <Image
            src={image_url}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800'
            }}
          />
        ) : (
          <span className="text-6xl z-10 relative select-none" role="img" aria-label={title}>
            {emoji ?? '🍽️'}
          </span>
        )}

        {/* Category badge */}
        {category && (
          <span className="
            absolute top-3 right-3 z-20
            bg-white rounded-full px-2.5 py-1
            text-[0.72rem] font-semibold text-ink
            shadow-badge
          ">
            {category}
          </span>
        )}
      </div>

      {/* ── Card Body ── */}
      <div className="px-5 pt-[18px] pb-5">
        {/* Tags */}
        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={`
                  text-[0.7rem] font-semibold uppercase tracking-[0.05em]
                  px-2.5 py-0.5 rounded-full
                  ${getTagClass(tag)}
                `}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="font-display text-[1.2rem] font-bold leading-[1.3] mb-1.5 text-ink">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[0.875rem] text-ink-muted leading-relaxed mb-3.5 line-clamp-2">
          {description}
        </p>

        {/* Meta row */}
        <div className="flex gap-4 text-[0.8rem] text-ink-faint font-medium">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {time}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {servings} servings
          </span>
          <span className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5" />
            {calories} kcal
          </span>
        </div>

        {/* Health bar */}
        <div className="
          flex items-center gap-2.5 mt-3 pt-3
          border-t border-border
        ">
          <span className="flex items-center gap-1 text-[0.75rem] text-ink-muted font-medium whitespace-nowrap">
            <Heart className="w-3 h-3" />
            Health
          </span>
          <div className="flex-1 h-[5px] bg-cream rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${getHealthFillColor(health_score)}`}
              style={{ width: `${health_score}%` }}
            />
          </div>
          <span className={`text-[0.75rem] font-bold ${getHealthColor(health_score)}`}>
            {health_score}/100
          </span>
        </div>
      </div>
    </article>
  )
}
