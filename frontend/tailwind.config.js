// tailwind.config.js
import forms from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,html}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "dark-gray-35": "#353535",
      },
      fontFamily: { display: ["Spline Sans", "sans-serif"] },
    },
  },
  plugins: [forms],
};
