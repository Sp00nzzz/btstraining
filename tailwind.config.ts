import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "var(--color-base)",
        surface: "var(--color-surface)",
        ink: "var(--color-ink)",
        muted: "var(--color-muted)",
        accent: "#026cdf", // Ticketmaster Azure
        accentSoft: "#EBF5FF",
        warn: "var(--color-warn)",
        good: "var(--color-good)",
        tmBlue: "#026cdf",
        tmDark: "#1f262d",
        tmGray: "#e1e1e4",
        tmLight: "#f2f2f4"
      },
      borderRadius: {
        xl: "14px",
        "2xl": "20px"
      },
      boxShadow: {
        lift: "0 14px 30px rgba(0,0,0,0.12)",
        soft: "0 8px 18px rgba(15, 23, 42, 0.12)"
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        pixelify: ["var(--font-pixelify-sans)", "monospace"],
        nunito: ["var(--font-nunito)", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
