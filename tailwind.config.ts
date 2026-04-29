import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#0b1220',
          900: '#111a2b',
          800: '#182236',
          700: '#1f2d45',
        },
        gold: {
          400: '#d4a853',
          500: '#c9a227',
        },
        /** Mapped to emerald so existing `cyan-*` utilities read as greens sitewide */
        cyan: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        surface: {
          DEFAULT: '#f1f5f9',
          card: '#ffffff',
        },
        /** Yoventa brand — leafy greens */
        brand: {
          DEFAULT: '#16a34a',
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
      },
      fontFamily: {
        display: ['var(--font-sora)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-dm)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card:
          '0 4px 24px -4px rgba(0,0,0,.12), 0 0 0 1px rgba(22,101,52,.06)',
        glow: '0 0 40px -10px rgba(16,185,129,.22)',
      },
    },
  },
  plugins: [typography],
}
export default config
