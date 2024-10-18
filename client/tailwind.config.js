/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/*.jsx","./src/Pages/*.jsx","./src/Components/*.jsx"],
  theme: {
    extend: {
      width:{
        "128":"36.5rem"
      },
      lineHeight:{
        "relaxer":"1.425"
      }
    },
  },
  plugins: [],
}

