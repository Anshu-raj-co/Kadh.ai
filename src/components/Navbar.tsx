'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles, UtensilsCrossed } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav className="
      sticky top-0 z-50 h-16
      flex items-center justify-between
      px-6 md:px-8
      border-b border-border
      bg-warm-white/90 backdrop-blur-[16px]
    ">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 font-display text-2xl font-bold text-ink no-underline">
        <UtensilsCrossed className="w-5 h-5 text-saffron" strokeWidth={2.5} />
        Kadh<span className="text-saffron italic">.ai</span>
      </Link>

      {/* Links */}
      <div className="flex items-center gap-1 md:gap-2">
        <NavButton href="/"      active={isActive('/')}>Home</NavButton>
        <NavButton href="/find"  active={isActive('/find')}>AI Finder</NavButton>
        <NavButton href="/saved" active={isActive('/saved')}>Saved</NavButton>

        {/* CTA */}
        <Link
          href="/find"
          className="
            ml-2 flex items-center gap-1.5
            px-4 py-2 rounded-full
            bg-saffron hover:bg-saffron-deep
            text-white text-sm font-medium
            transition-all duration-200
            border border-saffron
          "
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Try It Free</span>
          <span className="sm:hidden">Try</span>
        </Link>
      </div>
    </nav>
  )
}

function NavButton({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`
        px-3 md:px-[18px] py-2 rounded-full text-sm font-medium
        border border-transparent transition-all duration-200
        ${active
          ? 'bg-ink text-warm-white'
          : 'bg-transparent text-ink-muted hover:bg-cream hover:text-ink'
        }
      `}
    >
      {children}
    </Link>
  )
}
