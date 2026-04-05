'use client'

import { useState, useRef, KeyboardEvent } from 'react'
import { Plus, X } from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────
type ChipVariant = 'default' | 'avoid'

interface IngredientInputProps {
  /** Current list of chips */
  items: string[]
  /** Called when a new item is added */
  onAdd: (item: string) => void
  /** Called when a chip is removed by index */
  onRemove: (index: number) => void
  /** Placeholder text for the text input */
  placeholder?: string
  /** Visual style: 'default' (cream) or 'avoid' (amber) */
  variant?: ChipVariant
  /** Label shown above the input */
  label?: string
  /** Accessible id for the input */
  inputId?: string
}

// ── Chip style map ────────────────────────────────────────────────────────────
const chipStyles: Record<ChipVariant, string> = {
  default: 'bg-cream border-border text-ink',
  avoid:   'bg-[#fef3dd] border-[#f5d98a] text-[#8a6314]',
}

const addBtnStyles: Record<ChipVariant, string> = {
  default: 'bg-saffron hover:bg-saffron-deep text-white',
  avoid:   'bg-ink hover:bg-ink-muted text-white',
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function IngredientInput({
  items,
  onAdd,
  onRemove,
  placeholder = 'e.g. chicken, tomatoes, garlic…',
  variant = 'default',
  label,
  inputId = 'ingredient-input',
}: IngredientInputProps) {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleAdd = () => {
    const trimmed = value.trim().toLowerCase()
    if (!trimmed) return
    // Prevent exact duplicates
    if (items.map((i) => i.toLowerCase()).includes(trimmed)) {
      setValue('')
      return
    }
    onAdd(trimmed)
    setValue('')
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAdd()
    }
    // Remove last chip on Backspace when input is empty
    if (e.key === 'Backspace' && value === '' && items.length > 0) {
      onRemove(items.length - 1)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Optional label */}
      {label && (
        <p className="text-sm font-semibold text-ink-muted">{label}</p>
      )}

      {/* Input row */}
      <div className="flex gap-2.5">
        <input
          id={inputId}
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="
            flex-1 px-4 py-3 rounded-DEFAULT
            border border-border bg-warm-white
            font-body text-[0.95rem] text-ink
            placeholder:text-ink-faint
            outline-none
            focus:border-saffron
            transition-colors duration-200
          "
        />
        <button
          type="button"
          onClick={handleAdd}
          aria-label="Add ingredient"
          className={`
            flex items-center gap-1.5
            px-5 py-3 rounded-DEFAULT
            font-body font-semibold text-[0.9rem]
            transition-colors duration-200
            whitespace-nowrap
            ${addBtnStyles[variant]}
          `}
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          Add
        </button>
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2 min-h-[36px]">
        {items.length === 0 ? (
          <span className="text-[0.85rem] text-ink-faint py-1.5 italic">
            Your items will appear here…
          </span>
        ) : (
          items.map((item, index) => (
            <Chip
              key={`${item}-${index}`}
              label={item}
              variant={variant}
              onRemove={() => onRemove(index)}
            />
          ))
        )}
      </div>
    </div>
  )
}

// ── Chip sub-component ────────────────────────────────────────────────────────
function Chip({
  label,
  variant,
  onRemove,
}: {
  label: string
  variant: ChipVariant
  onRemove: () => void
}) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        border rounded-full px-3 py-1.5
        text-[0.85rem] font-medium
        animate-chip-in
        ${chipStyles[variant]}
      `}
    >
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label}`}
        className="
          flex items-center justify-center
          w-4 h-4 rounded-full
          opacity-50 hover:opacity-100
          hover:bg-black/10
          transition-opacity duration-150
          -mr-0.5
        "
      >
        <X className="w-3 h-3" strokeWidth={2.5} />
      </button>
    </span>
  )
}
