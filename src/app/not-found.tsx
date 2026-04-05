import Link from 'next/link'
import { UtensilsCrossed } from 'lucide-react'
import Navbar from '@/components/Navbar'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-warm-white flex flex-col items-center justify-center text-center px-6">
        <div className="text-7xl mb-6">🍽️</div>
        <h1 className="font-display text-4xl font-bold text-ink mb-3">Recipe not found</h1>
        <p className="text-ink-muted text-base mb-8 max-w-sm leading-relaxed">
          This recipe doesn't exist or may have been removed. Head back and generate a fresh one!
        </p>
        <div className="flex gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-ink hover:bg-saffron text-warm-white px-6 py-3 rounded-full font-semibold text-sm transition-colors"
          >
            <UtensilsCrossed className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            href="/find"
            className="inline-flex items-center gap-2 border border-border-dark hover:border-ink bg-transparent text-ink px-6 py-3 rounded-full font-semibold text-sm transition-colors hover:bg-cream"
          >
            AI Finder
          </Link>
        </div>
      </main>
    </>
  )
}
