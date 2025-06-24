/** @type {import('tailwindcss').Config} */
export default { // Or module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'), // <--- Make sure this is 'require'
  ],
  // daisyUI config (optional)
  daisyui: {
    themes: ["light", "dark", "cupcake"], // Example themes, adjust as needed
  },
}