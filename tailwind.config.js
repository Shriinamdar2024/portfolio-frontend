/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5", // Professional Indigo
        dark: "#0f172a",    // Deep Slate
      }
    },
  },
  plugins: [],
}