/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
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
        earth: {
          50: '#fdfbf7',
          100: '#f8f4eb',
          200: '#f0e6d2',
          300: '#e3d2b0',
          400: '#d1b687',
          500: '#be9862',
          600: '#a67d4e',
          700: '#84603e',
          800: '#6b4e36',
          900: '#57412f',
        }
      },
    },
  },
  plugins: [],
}
