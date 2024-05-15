/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('./src/assets/bgPages/tvBG.gif')",
        "stars-pattern":"url('./src/assets/gifs/stars.gif')",
        "fireworks-pattern":"url('./src/assets/gifs/fireworks.gif')",
      },
    },
  },
  plugins: [],
};
