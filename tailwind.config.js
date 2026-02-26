/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        symbi: {
          navy: '#0D1F3C',
          amber: '#E8A020',
          blue: '#4A6FA5',
          gray: '#A0AEC0',
          white: '#FFFFFF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        'lg': '8px',
        'xl': '12px',
      }
    },
  },
  plugins: [],
}
