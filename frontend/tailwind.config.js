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
        "campus-page-background-gradient":
          "linear-gradient(to bottom, #2980B9 0%, #6DD5FA 10%, #D2F3FF 100%)",
        "footer-gradient": "linear-gradient(to bottom, #F97316, #991B1B)",
        "fakultas-card": "linear-gradient(to bottom, #FFF 0%, #EB5E0B 100%)",
        "login":
            "linear-gradient(to bottom, #2980B9 0%, #6DD5FA 50%, #FBFFFF 100%)",
      },
      colors: {
        "orange-surface": "#EB5E0B",
        "orange-red-gradient": "linear-gradient(to right, #EB5E0B, #9E0202)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
