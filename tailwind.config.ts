import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        serif: ["'Cormorant Garamond'", "serif"],
        display: ["'Space Grotesk'", "sans-serif"],
      },
      boxShadow: {
        paper: "0 24px 80px rgba(15, 23, 42, 0.14)",
      },
    },
  },
  plugins: [],
} satisfies Config;
