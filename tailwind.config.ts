import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── COLOR PALETTE (from CSS :root variables) ──────────────────────
      colors: {
        cream: '#F7F3EC',
        'warm-white': '#FDFAF6',

        ink: {
          DEFAULT: '#1C1917',
          muted: '#57534E',
          faint: '#A8A29E',
        },

        saffron: {
          DEFAULT: '#E8922A',
          deep: '#C4711A',
          light: '#FDF0DC',
        },

        sage: {
          DEFAULT: '#5A7A5E',
          light: '#EAF0EB',
        },

        rose: {
          DEFAULT: '#C94F4F',
          light: '#FDE8E8',
          border: '#F5C5C5',
        },

        border: {
          DEFAULT: '#E7E0D6',
          dark: '#C5B9A8',
        },
      },

      // ── TYPOGRAPHY ────────────────────────────────────────────────────
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },

      // ── BORDER RADIUS ─────────────────────────────────────────────────
      borderRadius: {
        DEFAULT: '8px',
        card: '16px',
        full: '9999px',
      },

      // ── BOX SHADOWS ───────────────────────────────────────────────────
      boxShadow: {
        card: '0 2px 16px rgba(28, 25, 23, 0.08)',
        'card-lg': '0 8px 40px rgba(28, 25, 23, 0.14)',
        badge: '0 1px 6px rgba(0, 0, 0, 0.12)',
      },

      // ── ANIMATIONS ────────────────────────────────────────────────────
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        chipIn: {
          from: { opacity: '0', transform: 'scale(0.85)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'fade-up': 'fadeUp 0.35s ease forwards',
        'chip-in': 'chipIn 0.2s ease forwards',
        spin: 'spin 0.8s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
