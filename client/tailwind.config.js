/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './src/**/*.{js,jsx,ts,tsx}',
  '/index.html'
  ],
  theme: {
      extend: {
          backgroundColor: {
            'custom-dark': '#181A1B',
            'custom-hover': '#272a2b',
            'custom-green': '#5BD45C',
            'custom-red': '#D45B5B',
            'custom-gray': '#D9D9D9'
          },
          colors: {
            'custom-dark': '#181A1B',
            'custom-green': '#5BD45C',
            'custom-red': '#D45B5B',
            'custom-gray': '#D9D9D9'
          },
          fontFamily: {
            devcom: ['Neue Machina', 'georgia'],
            devcombold: ['Neue Machina--bold'],
            devcomthin: ['Neue Machina--light']
          }
      },
  },
  plugins: [],
}


