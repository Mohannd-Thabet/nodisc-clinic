/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7fb',
          100: '#e0f0f7',
          200: '#bce0ef',
          300: '#87c6e2',
          400: '#4da6d1',
          500: '#2787be',
          600: '#1b6b9c',
          700: '#1b4965', // Main medical navy blue
          800: '#173c52',
          900: '#143344',
          950: '#0b1f2b',
        },
        secondary: {
          50: '#f2f8fc',
          100: '#e3f0f9',
          200: '#c5e2f3',
          300: '#97cde9',
          400: '#5fa8d3', // Secondary sky/cyan
          500: '#4392c3',
          600: '#3176a6',
          700: '#285f85',
          800: '#24506f',
          900: '#23445d',
        },
        gold: {
          50: '#fbf8ee',
          100: '#f6eed7',
          200: '#ecdbad',
          300: '#e0c279',
          400: '#d4a843', // Warm medical prestige gold
          500: '#bd9030',
          600: '#9b7125',
          700: '#7a5420',
          800: '#654420',
          900: '#55391e',
        },
        medical: {
          dark: '#0e2535',
          slate: '#1E293B',
          light: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          muted: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Cairo', 'Tajawal', 'system-ui', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(27, 73, 101, 0.08)',
        'card-hover': '0 12px 30px -4px rgba(27, 73, 101, 0.15)',
        'gold-glow': '0 4px 20px -2px rgba(212, 168, 67, 0.25)',
      }
    },
  },
  plugins: [],
}
