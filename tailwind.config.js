/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4A4F61",
        secondary: "#BDC2D4",
        base: "#4E4E4E",
      },
    },
  },
  plugins: [],
};
