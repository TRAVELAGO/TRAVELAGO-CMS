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
      primary: {
        100: "#FECE51",
      },
      dark: {
        100: "#0E1317",
      },
      gray: {
        100: "#EDECE7",
      },
    },
  },
  plugins: [],
};
