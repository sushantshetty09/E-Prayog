/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Sora', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      colors: {
        /* ── Obsidian Canvas System ── */
        canvas:  '#070A0F',
        surface: '#0D1117',
        card:    '#121824',
        elevated:'#1A2233',
        glass: {
          100: 'rgba(18, 24, 36, 0.40)',
          200: 'rgba(18, 24, 36, 0.65)',
          300: 'rgba(18, 24, 36, 0.85)',
        },
        /* ── Lab Cyan Accent (Primary) ── */
        lab: {
          cyan:    '#06B6D4',
          bright:  '#22D3EE',
          muted:   '#0891B2',
          dim:     '#164E63',
          glow:    'rgba(6, 182, 212, 0.35)',
        },
        /* ── Tactical Amber (Rare Secondary) ── */
        tactical: {
          DEFAULT: '#F59E0B',
          light:   '#FBBF24',
          dark:    '#D97706',
        },
        /* ── Neutrals ── */
        slate: {
          950: '#070A0F',
          900: '#0D1117',
          850: '#121824',
          800: '#1A2233',
          700: '#253347',
          600: '#334155',
          500: '#475569',
          400: '#94A3B8',
          300: '#CBD5E1',
          200: '#E2E8F0',
        },
        /* ── Legacy brand tokens (preserved for non-home pages) ── */
        sky: {
          accent: '#06B6D4',
          light:  '#22D3EE',
          muted:  '#0891B2',
          dim:    '#164E63',
        },
        gold: {
          DEFAULT: '#F59E0B',
          light:   '#FBBF24',
          dark:    '#D97706',
        },
        brand: {
          50:  '#E8F4FD',
          100: '#C5DFF5',
          200: '#06B6D4',
          500: '#0891B2',
          600: '#0E7490',
          900: '#070A0F',
        },
        subject: {
          physics:   '#5BA3D4',
          chemistry: '#F5A623',
          biology:   '#5BB887',
          math:      '#A78BFA',
          cs:        '#60C4D4',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-x': {
          '0%, 100%': {
              'background-size': '200% 200%',
              'background-position': 'left center'
          },
          '50%': {
              'background-size': '200% 200%',
              'background-position': 'right center'
          },
        }
      }
    },
  },
  plugins: [],
}
