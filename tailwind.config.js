/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "17px",
      },
    },
    extend: {
      colors: {
        primary: "#3565E0",
        secondary: "#000000",
        gray: "#212121",
      },
    },
  },
};
