import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Linear-inspired colors
        background: "rgb(10 11 13)",
        foreground: "rgb(255 255 255)",
        primary: {
          DEFAULT: "rgb(94 106 210)",
          foreground: "rgb(255 255 255)",
        },
        secondary: {
          DEFAULT: "rgb(42 45 53)",
          foreground: "rgb(255 255 255)",
        },
        muted: {
          DEFAULT: "rgb(110 111 122)",
          foreground: "rgb(168 169 180)",
        },
        accent: {
          DEFAULT: "rgb(94 106 210)",
          foreground: "rgb(255 255 255)",
        },
        destructive: {
          DEFAULT: "rgb(248 113 113)",
          foreground: "rgb(255 255 255)",
        },
        border: "rgb(42 45 53)",
        input: "rgb(26 29 35)",
        ring: "rgb(94 106 210)",
        card: {
          DEFAULT: "rgb(26 29 35)",
          foreground: "rgb(255 255 255)",
        },
        popover: {
          DEFAULT: "rgb(26 29 35)",
          foreground: "rgb(255 255 255)",
        },
        // Additional Linear colors
        "primary-purple": "rgb(139 92 246)",
        "bg-secondary": "rgb(17 19 24)",
        "bg-tertiary": "rgb(26 29 35)",
        "bg-hover": "rgb(42 45 53)",
        "text-secondary": "rgb(168 169 180)",
        "text-tertiary": "rgb(110 111 122)",
        "border-secondary": "rgb(58 61 69)",
        "accent-green": "rgb(74 222 128)",
        "accent-red": "rgb(248 113 113)",
        "accent-yellow": "rgb(250 204 21)",
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        '7xl': '72px',
        '6xl': '60px',
        '5xl': '48px',
        '4xl': '36px',
        '3xl': '30px',
        '2xl': '24px',
        'xl': '20px',
        'lg': '18px',
        'base': '16px',
        'sm': '14px',
        'xs': '12px',
      },
      spacing: {
        '18': '72px',
        '22': '88px',
        '26': '104px',
        '30': '120px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'gradient-shift': 'gradientShift 3s ease infinite',
      },
      borderRadius: {
        'sm': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'glow': '0 0 0 1px rgb(94 106 210), 0 10px 40px rgba(94, 106, 210, 0.1)',
        'glow-lg': '0 0 0 1px rgb(94 106 210), 0 20px 60px rgba(94, 106, 210, 0.2)',
        'glow-blue': '0 0 50px rgba(59, 130, 246, 0.5)',
        'glow-blue-lg': '0 0 60px rgba(59, 130, 246, 0.7)',
        'glow-blue-sm': '0 0 30px rgba(59, 130, 246, 0.3)',
      },
    },
  },
  plugins: [],
} satisfies Config;