const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Source Serif Pro', 'Times New Roman', 'Helvetica', 'serif'],
        sans: ['IBM Plex Sans', 'Helvetica', 'Arial', 'Verdana', 'sans-serif'],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}