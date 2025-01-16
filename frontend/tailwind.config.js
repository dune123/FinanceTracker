/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: '0px 0px 30px 8px rgba(277, 277, 277, 0.75)',
      }
    },
  },
  plugins: [],
}