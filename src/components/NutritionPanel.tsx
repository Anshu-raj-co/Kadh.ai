'use client'

import { useEffect, useRef } from 'react'
import { Leaf, Zap, Droplets, Wheat, Flame } from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────
interface NutritionPanelProps {
  health_score: number
  calories: number
  protein: number   // grams
  carbs: number     // grams
  fat: number       // grams
  fiber: number     // grams
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function getScoreColor(score: number): string {
  if (score >= 85) return 'text-sage'
  if (score >= 70) return 'text-saffron'
  return 'text-rose'
}

function getScoreBg(score: number): string {
  if (score >= 85) return 'bg-sage-light'
  if (score >= 70) return 'bg-saffron-light'
  return 'bg-rose-light'
}

function getVerdict(score: number): { label: string; detail: string } {
  if (score >= 85) return {
    label: 'Very Healthy',
    detail: 'Nutrient-dense and well-balanced — excellent choice for regular meals.',
  }
  if (score >= 70) return {
    label: 'Moderately Healthy',
    detail: 'A good balanced option. Consider moderating portion size for regular consumption.',
  }
  return {
    label: 'Treat Yourself',
    detail: 'Higher in calories or fat — enjoy as an occasional treat as part of a balanced diet.',
  }
}

// Daily reference values (approximate for an adult 2000 kcal diet)
const DAILY_REF = {
  protein: 50,    // g
  carbs: 275,     // g
  fat: 78,        // g
  fiber: 28,      // g
  calories: 2000, // kcal
}

// ── Nutrient bar sub-component ────────────────────────────────────────────────
function NutrientBar({
  label,
  value,
  unit,
  kcal,
  maxRef,
  fillClass,
  Icon,
}: {
  label: string
  value: number
  unit: string
  kcal?: number
  maxRef: number
  fillClass: string
  Icon: React.ElementType
}) {
  const barRef = useRef<HTMLDivElement>(null)
  const pct = Math.min(100, Math.round((value / maxRef) * 100))

  // Animate bar width on mount
  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    bar.style.width = '0%'
    const t = setTimeout(() => { bar.style.width = `${pct}%` }, 80)
    return () => clearTimeout(t)
  }, [pct])

  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between items-center mb-1.5">
        <span className="flex items-center gap-1.5 text-[0.875rem] font-medium text-ink">
          <Icon className="w-3.5 h-3.5 text-ink-faint" />
          {label}
        </span>
        <span className="font-mono text-[0.8rem] text-ink-muted">
          {value}{unit}{kcal !== undefined ? ` · ${kcal} kcal` : ''}
        </span>
      </div>
      <div className="h-[7px] bg-cream rounded-full overflow-hidden">
        <div
          ref={barRef}
          className={`h-full rounded-full transition-all duration-700 ease-out ${fillClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function NutritionPanel({
  health_score,
  calories,
  protein,
  carbs,
  fat,
  fiber,
}: NutritionPanelProps) {
  const verdict = getVerdict(health_score)
  const scoreColor = getScoreColor(health_score)
  const scoreBg = getScoreBg(health_score)

  return (
    <aside className="
      bg-white rounded-card border border-border
      p-6 shadow-card
      sticky top-20
    ">
      <h3 className="font-display text-[1.15rem] font-bold text-ink mb-5">
        Nutrition Facts
      </h3>

      {/* ── Health Score ── */}
      <div className={`rounded-DEFAULT p-5 text-center mb-6 ${scoreBg}`}>
        <div className={`font-body text-[3.5rem] font-bold leading-none ${scoreColor}`}>
          {health_score}
        </div>
        <div className={`text-[0.8rem] font-semibold mt-1 ${scoreColor}`}>
          {verdict.label}
        </div>
        <p className="text-[0.82rem] text-ink-muted mt-2 leading-relaxed">
          {verdict.detail}
        </p>
      </div>

      {/* ── Macro Grid ── */}
      <div className="grid grid-cols-2 gap-2.5 mb-6">
        <MacroBox
          value={`${protein}g`}
          label="Protein"
          colorClass="text-sage"
        />
        <MacroBox
          value={`${carbs}g`}
          label="Carbs"
          colorClass="text-saffron"
        />
        <MacroBox
          value={`${fat}g`}
          label="Fat"
          colorClass="text-rose"
        />
        <MacroBox
          value={`${fiber}g`}
          label="Fiber"
          colorClass="text-[#7B9E83]"
        />
      </div>

      {/* ── Nutrient Bars ── */}
      <NutrientBar
        label="Protein"
        value={protein}
        unit="g"
        kcal={protein * 4}
        maxRef={DAILY_REF.protein}
        fillClass="bg-sage"
        Icon={Zap}
      />
      <NutrientBar
        label="Carbohydrates"
        value={carbs}
        unit="g"
        kcal={carbs * 4}
        maxRef={DAILY_REF.carbs}
        fillClass="bg-saffron"
        Icon={Wheat}
      />
      <NutrientBar
        label="Total Fat"
        value={fat}
        unit="g"
        kcal={fat * 9}
        maxRef={DAILY_REF.fat}
        fillClass="bg-rose"
        Icon={Droplets}
      />
      <NutrientBar
        label="Dietary Fiber"
        value={fiber}
        unit="g"
        maxRef={DAILY_REF.fiber}
        fillClass="bg-[#7B9E83]"
        Icon={Leaf}
      />
      <NutrientBar
        label="Total Calories"
        value={calories}
        unit=" kcal"
        maxRef={DAILY_REF.calories}
        fillClass="bg-[#8B5CF6]"
        Icon={Flame}
      />

      {/* Daily reference footnote */}
      <p className="text-[0.72rem] text-ink-faint mt-4 leading-relaxed">
        * Bars show % of recommended daily intake (2,000 kcal diet). Values are estimates.
      </p>
    </aside>
  )
}

// ── MacroBox sub-component ────────────────────────────────────────────────────
function MacroBox({
  value,
  label,
  colorClass,
}: {
  value: string
  label: string
  colorClass: string
}) {
  return (
    <div className="bg-cream rounded-DEFAULT p-3 text-center">
      <div className={`font-mono text-[1.2rem] font-bold ${colorClass}`}>{value}</div>
      <div className="text-[0.7rem] text-ink-muted font-semibold uppercase tracking-widest mt-0.5">
        {label}
      </div>
    </div>
  )
}
