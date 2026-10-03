/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        govt: {
          navy: '#0F172A',
          blue: '#1E3A8A',
          saffron: '#F97316',
          green: '#16A34A',
          lightBg: '#F8FAFC'
        },
        section: {
          preprimary: '#F59E0B',
          primary: '#10B981',
          highschool: '#2563EB'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'Noto Sans Devanagari', 'sans-serif'],
        devanagari: ['Noto Sans Devanagari', 'sans-serif']
      }
    },
  },
  plugins: [],
}
