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
        canvas:  '#0D1B2A',
        surface: '#1B2D42',
        card:    '#243A54',
        glass: {
          100: 'rgba(27, 45, 66, 0.40)',
          200: 'rgba(27, 45, 66, 0.65)',
          300: 'rgba(27, 45, 66, 0.85)',
        },
        sky: {
          accent: '#3A8FD4',
          light:  '#4DA3E8',
          muted:  '#7FA8C4',
          dim:    '#3D5A73',
        },
        gold: {
          DEFAULT: '#F5A623',
          light:   '#FFBA40',
          dark:    '#D4891A',
        },
        brand: {
          50:  '#E8F4FD',
          100: '#C5DFF5',
          200: '#3A8FD4',
          500: '#2E7ABE',
          600: '#1B5A99',
          900: '#0D1B2A',
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
