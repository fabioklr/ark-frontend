/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'eerie-black': '#222121',
        'onyx': '#464546',
        'gray': '#818081',
        'chinese-violet': '#8D5974',
        'magenta-haze': '#983267',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      gridTemplateRows: {
        // Simple 8 row grid
        '8': 'repeat(8, minmax(0, 1fr))',
      }
    },
    container: {
      padding: '2rem',
      center: true,
    },
    screens: {
      'sm': '640px',
      'md': '768px',
    },
  },
  plugins: []
}