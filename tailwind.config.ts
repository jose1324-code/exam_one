import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A237E",
        primaryLight: "#283593",
        accent: "#FF6F00",
        accentDark: "#E65100",
        accentSoft: "#FFB74D",
        bg: "#F5F7FF",
        ink: "#1C1C2E",
        muted: "#6B7280",
        success: "#10B981",
        deep: "#0D1442",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        grotesk: ["var(--font-grotesk)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 24px rgba(26,35,126,0.08)",
        lift: "0 12px 40px rgba(26,35,126,0.16)",
        glow: "0 8px 24px rgba(255,111,0,0.35)",
      },
      borderRadius: {
        card: "16px",
      },
    },
  },
  plugins: [],
};

export default config;
