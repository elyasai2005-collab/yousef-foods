/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0F1115",
          raised: "#161922",
        },
        surface: {
          DEFAULT: "#191C22",
          alt: "#20242C",
          high: "#282D37",
        },
        ink: {
          DEFAULT: "#ECEDEE",
          muted: "#9AA0A6",
          faint: "#5C6169",
        },
        cal: "#FF8A5B",
        protein: "#4ADE80",
        carbs: "#60A5FA",
        fat: "#F5B942",
        danger: "#F4655A",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        brand: [
          "Georgia",
          "Iowan Old Style",
          "Apple Garamond",
          "Baskerville",
          "Times New Roman",
          "serif",
        ],
      },
      borderRadius: {
        xl2: "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.4), 0 8px 24px -8px rgba(0,0,0,0.5)",
      },
      keyframes: {
        "sheet-in": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "sheet-out": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
        "toast-in": {
          "0%": { transform: "translateY(12px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "scrim-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pop": {
          "0%": { transform: "scale(0.9)", opacity: "0.6" },
          "60%": { transform: "scale(1.03)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "sheet-in": "sheet-in 220ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        "sheet-out": "sheet-out 180ms cubic-bezier(0.4, 0, 1, 1)",
        "toast-in": "toast-in 180ms ease-out",
        "scrim-in": "scrim-in 180ms ease-out",
        pop: "pop 260ms cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
