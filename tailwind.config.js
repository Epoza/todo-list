/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        NotoSans: ["Noto Sans", "sans-serif"],
      },
      light: {
        // change these later
        background: ' ',
        foreground: ' ',
        mainText: ' ',
        subText: ' ',
        border: ' ',
      },
      dark: {
        // change these later
        background: ' ',
        foreground: ' ',
        mainText: ' ',
        subText: ' ',
        border: ' ',
      }
    },
  },
  plugins: [],
}

