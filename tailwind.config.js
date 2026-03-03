/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'teal-accent': '#0CC8A8',
        'dark-bg': '#0F0F0F',
        'dark-card': '#1A1A1A',
        'severity-critical': '#EF4444',
        'severity-high': '#F97316',
        'severity-medium': '#FBBF24',
        'severity-low': '#22C55E',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
}
