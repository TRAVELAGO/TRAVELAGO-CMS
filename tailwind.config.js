/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lato: "Lato",
      },
    },
    colors: {
      white: "#FFFFFF",
      primary: {
        100: "#B89146",
        200: "#FECE51",
      },
      dark: {
        100: "#666666",
        200: "#999999",
        300: "#CCCCCC",
        400: "#F7F7F7",
        500: "#EDECE7",
        600: "#141C21",
        700: "#262B2E",
        800: "#3E4245",
        900: "#8A8A8A",
        1000: "#D9D9D9",
        1100: "#E0E0E1",
        1200: "#CFD0D1",
        1300: "#0E1111",
      },
      gray: {
        100: "#373939",
        200: "#E7E7E8",
        300: "#E7E8E9",
        400: "#DEDFDF",
        500: "#282A2A",
      },
    },
  },
  plugins: [],
};
