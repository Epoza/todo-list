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
      colors: {
        light: {
          background: '#f4faff',
          foreground: '#f0f8ff',
          mainText: '#00283d',
          subText: '#343434',
          border: 'black',
          icon: 'black',
        },
        dark: {
          background: '#001A2C',
          foreground: '#001523',
          mainText: '#dbebfa',
          subText: '#92c2f1',
          border: '#dcedfe',
          icon: '#92c2f1',
        }
      }
    },
  },
  plugins: [],
}

