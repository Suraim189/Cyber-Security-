import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#171D2E", // Deep navy primary text
        navy: {
          50: "#F4F6FA",
          100: "#E9ECF3",
          200: "#D4DAE8",
          300: "#B3BDD4",
          400: "#8B9BB9",
          500: "#6B7C9E",
          600: "#506082",
          700: "#3E4C69",
          800: "#2B354C",
          900: "#171D2E", // Authoritative deep navy
          DEFAULT: "#171D2E",
        },
        slate: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0", // Soft neutral border
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B", // Slate gray secondary text
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F8FAFC",
          tinted: "#F5F8FF", // Subtle blue-tinted section background
          elevated: "#FFFFFF",
          border: "#E2E8F0",
        },
        brand: {
          50: "#F0F4FE",
          100: "#DBE5FD",
          200: "#BFD0FB",
          300: "#94B2F7",
          400: "#648DF3",
          500: "#3D6EEF",
          600: "#2453E6", // Royal blue (#2453E6)
          700: "#1C42BC",
          800: "#193694",
          900: "#182E74",
          DEFAULT: "#2453E6",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(23, 29, 46, 0.05)",
        card: "0 1px 3px 0 rgba(23, 29, 46, 0.04), 0 1px 2px -1px rgba(23, 29, 46, 0.04)",
        "card-hover": "0 12px 28px -4px rgba(23, 29, 46, 0.08), 0 4px 8px -2px rgba(23, 29, 46, 0.02)",
        elevated: "0 20px 35px -8px rgba(23, 29, 46, 0.10)",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        md: "0.625rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
