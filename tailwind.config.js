/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
      'minus-h': 'calc(100vh - 100px)',
    },
  colors:{
    'badge-secondary':'#CCC'
  }
  },
  },
  plugins: [require("@tailwindcss/typography"),require("daisyui")],
}

