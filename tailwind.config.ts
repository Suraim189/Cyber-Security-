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
        background: "#050811", // Deep midnight cyber canvas
        foreground: "#F8FAFC", // Crisp silver-white text
        cyber: {
          950: "#03050B",
          900: "#050811", // Midnight background
          850: "#080D1A",
          800: "#0B1224", // Primary section surface
          750: "#0E172E", // Card background
          700: "#131F3D", // Elevated hover surface
          border: "#1C2A4F", // Cyber border
          borderLight: "#2A3D6E",
          cyan: "#00F0FF", // Electric cyber cyan accent
          cyanDim: "#00C2CF",
          blue: "#2563EB", // Technical cobalt blue
          emerald: "#10B981", // Operational green
          amber: "#F59E0B", // High-severity amber
          rose: "#F43F5E", // Alert red
        },
        navy: {
          50: "#F4F6FA",
          100: "#E9ECF3",
          200: "#D4DAE8",
          300: "#B3BDD4",
          400: "#8B9BB9",
          500: "#6B7C9E",
          600: "#506082",
          700: "#3E4C69",
          800: "#172033",
          900: "#0C1222",
          DEFAULT: "#0C1222",
        },
        slate: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
        charcoal: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E2638",
          900: "#171D2E",
        },
        surface: {
          DEFAULT: "#0B1224",
          muted: "#080D1A",
          tinted: "#0D152B",
          elevated: "#131F3D",
          border: "#1C2A4F",
        },
        brand: {
          50: "#F0F7FF",
          100: "#E0EFFE",
          200: "#BAE0FD",
          300: "#7DC5FC",
          400: "#38A8F8",
          500: "#0EA5E9",
          600: "#0284C7",
          700: "#0369A1",
          800: "#075985",
          900: "#0C4A6E",
          DEFAULT: "#0284C7",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "Fira Code", "monospace"],
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.4)",
        card: "0 4px 20px -2px rgba(3, 5, 11, 0.6)",
        "card-hover": "0 12px 30px -4px rgba(0, 240, 255, 0.08), 0 4px 12px -2px rgba(37, 99, 235, 0.15)",
        elevated: "0 20px 40px -8px rgba(2, 6, 23, 0.8)",
        "cyber-glow": "0 0 25px -4px rgba(0, 240, 255, 0.25)",
        "cyan-border": "0 0 0 1px rgba(0, 240, 255, 0.4), 0 0 16px -2px rgba(0, 240, 255, 0.2)",
        "blue-glow": "0 0 30px -5px rgba(37, 99, 235, 0.35)",
      },
      backgroundImage: {
        "cyber-gradient": "radial-gradient(ellipse at top, #0E1A38 0%, #050811 70%)",
        "radial-highlight": "radial-gradient(circle at 50% 0%, rgba(0, 240, 255, 0.12) 0%, transparent 60%)",
      },
      keyframes: {
        "pulse-cyan": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        "pulse-cyan": "pulse-cyan 2.5s ease-in-out infinite",
        scanline: "scanline 8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
