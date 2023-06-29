/** @type {import('tailwindcss').Config} */

const FormKitVariants = require('@formkit/themes/tailwindcss')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    './node_modules/@formkit/themes/dist/tailwindcss/genesis/index.cjs'
  ],
  theme: {
    extend: {
      colors: {
        'eerie-black': '#222121',
        'onyx': '#464546',
        'gray': '#818081',
        'chinese-violet': '#8D5974',
        'magenta-haze': '#983267',
      }
    },
    screens: {
      'sm': '640px',
      'md': '768px',
    },
  },
  plugins: [FormKitVariants]
}