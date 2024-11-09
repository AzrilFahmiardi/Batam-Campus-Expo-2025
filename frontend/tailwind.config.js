/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        pixelify: ["Pixelify Sans", "sans-serif"],
      },
      backgroundImage: {
        "orange-red-gradient": "linear-gradient(to right, #EB5E0B, #9E0202)",
      },
      colors: {
        "orange-surface": "#EB5E0B",
      },
    },
  },
  plugins: [],
};
