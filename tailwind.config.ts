import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        burgundy: {
          DEFAULT: "#8A2B4D",
          50: "#F5E1E8",
          100: "#EBC3D1",
          200: "#D787A3",
          300: "#C34B75",
          400: "#A93560",
          500: "#8A2B4D",
          600: "#6B223C",
          700: "#4D182B",
          800: "#2E0F1A",
          900: "#0F0509",
        },
        gold: {
          DEFAULT: "#D4AF37",
          50: "#FAF5E6",
          100: "#F5EBCC",
          200: "#EBD699",
          300: "#E1C266",
          400: "#DABD4A",
          500: "#D4AF37",
          600: "#B3922C",
          700: "#8A7022",
          800: "#614E18",
          900: "#392D0E",
        },
        purple: {
          DEFAULT: "#5D3FD3",
          50: "#EAE6FA",
          100: "#D5CCF5",
          200: "#AB9FEB",
          300: "#8271E0",
          400: "#5D3FD3",
          500: "#4525BD",
          600: "#361D94",
          700: "#28156C",
          800: "#1A0E45",
          900: "#0C061D",
        },
      },
      backgroundImage: {
        "purple-gold-gradient": "linear-gradient(to right, #5D3FD3, #D4AF37)",
        "purple-gold-gradient-vertical": "linear-gradient(to bottom, #5D3FD3, #D4AF37)",
        "deep-purple-gold-gradient": "linear-gradient(to right, #28156C, #D4AF37)",
        "card-gradient": "linear-gradient(145deg, rgba(93, 63, 211, 0.05), rgba(212, 175, 55, 0.05))",
        "card-gradient-hover": "linear-gradient(145deg, rgba(93, 63, 211, 0.1), rgba(212, 175, 55, 0.1))",
        "sidebar-gradient": "linear-gradient(to bottom, rgba(93, 63, 211, 0.03), rgba(212, 175, 55, 0.03))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-500px 0" },
          "100%": { backgroundPosition: "500px 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s infinite linear",
      },
      boxShadow: {
        "gradient-border": "0 0 0 1px rgba(93, 63, 211, 0.1), 0 0 0 1px rgba(212, 175, 55, 0.1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
