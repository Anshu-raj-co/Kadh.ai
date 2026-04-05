'use client'

import { Check } from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────
export type SelectorVariant = 'allergy' | 'preference'

interface Option {
  label: string
  icon: string  // emoji icon — kept intentionally for food context (no lucide equivalent)
}

interface AllergySelectorProps {
  /** Which options to render */
  options: Option[]
  /** Currently selected labels */
  selected: string[]
  /** Called when a toggle changes */
  onChange: (selected: string[]) => void
  /** Visual and semantic variant */
  variant?: SelectorVariant
}

// ── Preset option lists (export so parent pages can import them directly) ─────
export const ALLERGY_OPTIONS: Option[] = [
  { label: 'Nuts',      icon: '🥜' },
  { label: 'Dairy',     icon: '🥛' },
  { label: 'Gluten',    icon: '🌾' },
  { label: 'Shellfish', icon: '🦐' },
  { label: 'Eggs',      icon: '🥚' },
  { label: 'Soy',       icon: '🫘' },
  { label: 'Fish',      icon: '🐟' },
  { label: 'Sesame',    icon: '🌰' },
]

export const PREFERENCE_OPTIONS: Option[] = [
  { label: 'Vegetarian',      icon: '🥦' },
  { label: 'Vegan',           icon: '🌱' },
  { label: 'High Protein',    icon: '💪' },
  { label: 'Low Carb',        icon: '📉' },
  { label: 'Quick (< 30 min)', icon: '⚡' },
  { label: 'Healthy & Light', icon: '🌿' },
  { label: 'Comfort Food',    icon: '🍲' },
  { label: 'Indian',          icon: '🇮🇳' },
  { label: 'Mediterranean',   icon: '🫒' },
]

// ── Style maps ────────────────────────────────────────────────────────────────
const baseChip = `
  flex items-center gap-2 rounded-DEFAULT
  border text-[0.85rem] font-medium
  cursor-pointer transition-all duration-150
  select-none
`

const variantIdle: Record<SelectorVariant, string> = {
  allergy:    'px-3.5 py-2 rounded-full border-border bg-white text-ink-muted hover:border-rose hover:text-rose',
  preference: 'px-3.5 py-2.5 text-center justify-center border-border bg-white text-ink-muted hover:border-saffron',
}

const variantActive: Record<SelectorVariant, string> = {
  allergy:    'px-3.5 py-2 rounded-full border-rose bg-rose-light text-rose',
  preference: 'px-3.5 py-2.5 text-center justify-center border-saffron bg-saffron-light text-saffron-deep',
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function AllergySelector({
  options,
  selected,
  onChange,
  variant = 'allergy',
}: AllergySelectorProps) {

  const toggle = (label: string) => {
    if (selected.includes(label)) {
      onChange(selected.filter((s) => s !== label))
    } else {
      onChange([...selected, label])
    }
  }

  const isGrid = variant === 'preference'

  return (
    <div
      className={
        isGrid
          ? 'grid grid-cols-3 gap-2.5'
          : 'flex flex-wrap gap-2'
      }
      role="group"
    >
      {options.map(({ label, icon }) => {
        const isSelected = selected.includes(label)
        return (
          <button
            key={label}
            type="button"
            role="checkbox"
            aria-checked={isSelected}
            onClick={() => toggle(label)}
            className={`
              ${baseChip}
              ${isSelected ? variantActive[variant] : variantIdle[variant]}
            `}
          >
            <span role="img" aria-hidden="true">{icon}</span>
            <span className="leading-tight">{label}</span>
            {isSelected && (
              <Check
                className={`w-3.5 h-3.5 ml-auto flex-shrink-0 ${
                  variant === 'allergy' ? 'text-rose' : 'text-saffron-deep'
                }`}
                strokeWidth={3}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
