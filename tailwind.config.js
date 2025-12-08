/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#DC2626', // Premium Red
          light: '#EF4444',
          dark: '#991B1B',
        },
        accent: {
          DEFAULT: '#B91C1C', // Deep Red accent
          light: '#DC2626',
          dark: '#7F1D1D',
        },
        dark: {
          DEFAULT: '#0F0F0F', // Near black
          light: '#1A1A1A',
          lighter: '#262626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
