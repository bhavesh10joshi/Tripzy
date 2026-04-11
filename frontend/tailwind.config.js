/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // must include ts/tsx
  ],
  theme: {
    extend : {
      colors : {
        blue : 
        {
          500 : "#004ac6" , 
          300 : "#2563eb"
        }
    }
    }
  },
  plugins: [],
}