/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        palanquin: ["Palanquin", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        background: "rgb(var(--color-background))",
        text: "rgb(var(--color-text))",
        secondaryText: "rgb(var(--color-secondary-text))",
        accent: "rgb(var(--color-accent))",
        secondary: "rgb(var(--color-secondary))",
        border: "rgb(var(--color-border))",
        hover: "rgb(var(--color-hover))",
        primaryBtn: "rgb(var(--primary-btn))",
        secondaryBtn: "rgb(var(--secondary-btn))",
      },
      backgroundImage: {
        loginBg: "url('/src/assets/loginbg.png')",
      },
      boxShadow: {
        orange: "0 4px 3px rgba(255, 152, 0, 0.2)",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
      },
    },
  },
  // darkMode: "class",
  plugins: [],
};
