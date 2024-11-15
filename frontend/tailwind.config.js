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
        "blue-pixel-gradient":
          "linear-gradient(90deg, #5CC4FF 0%, #0062B8 100%)",
        "landing-page-background-gradient":
          "linear-gradient(to bottom, #EC5F0C, #A20703)",
        "blue-gradient": "linear-gradient(to bottom, #166191, #6DD5FA)",
        "vote-card-odd": "linear-gradient(to bottom, #EB5E0B, #9E0202)",
        "vote-card-even": "linear-gradient(to bottom, #6DD5FA, #166191)",
      },
      colors: {
        "orange-surface": "#EB5E0B",
      },
    },
  },
  plugins: [],
};
