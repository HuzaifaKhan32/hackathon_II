// frontend/tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: "selector", // Enable dark mode based on a selector (e.g., <html class="dark">)
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Include our new components
  ],
  theme: {
    extend: {
      colors: {
        // Consolidated Primary Color - Flattened for better utility support
        "primary": "#895bf5", 
        "primary-light": "#7b46f5",
        "primary-dark": "#6c42ca",
        "primary-indigo": "#6366f1",
        "primary-dark-variant": "#4f46e5",
        "primary-darker": "#7c3dff",
        
        "secondary": "#00d4ff", // Added from design
        
        // Consolidated Accent Colors
        "accent": {
          DEFAULT: "#ff00d4", // Main accent color (pink)
          pink: "#ec4899",   // Specific pink variant
          purple: "#a855f7", // Specific purple variant
          cyan: "#00d4ff",   // Specific cyan variant
        },

        // Background Colors
        "background": { // Renamed from main-bg to match design file usage if needed, but sticking to design file classes
             light: "#f6f5f8",
             dark: "#151022",
        },
        "main-bg": { // Keeping for backward compatibility
          light: "#f6f5f8",    
          dark: "#151022",     
          'dark-deep': "#0f0f13", 
          'dark-contrast': "#0a0a0f", 
          page: {
            light: "#f8fafc", 
          },
        },

        // Surface/Card Colors
        "surface": {
          light: "#ffffff",    
          'light-alt': "#f1f5f9", 
          dark: "#1e1a29",     
        },

        // Border Colors
        "border": {
          light: "#e2e8f0",    
          dark: "#2d2839",     
        },

        // Text Colors
        "text": {
          main: {
            light: "#0f172a", 
            dark: "#ffffff",  
          },
          secondary: {
            light: "#64748b", 
            dark: "#a59cba",  
          },
          muted: {
            light: "#6b7280", 
          },
        },

        // Glassmorphism specific colors
        "glass": {
          'border-dark': "rgba(255, 255, 255, 0.08)",
          'bg-dark': "rgba(255, 255, 255, 0.03)",
          'border-light': "rgba(0, 0, 0, 0.05)",
          'bg-light': "rgba(255, 255, 255, 0.7)",
        },

        // Specific shades
        "purple": {
          "300": "#c4b5fd", 
          "400": "#a78bfa", 
          "500": "#895bf5", 
          "600": "#7c3aed",
          "700": "#6d28d9",
          "800": "#5b21b6",
          "900": "#4c1d95",
        },
        "pink": {
          "400": "#f472b6",
          "500": "#ec4899", 
          "600": "#db2777",
        },
        "blue": {
          "400": "#60a5fa",
          "500": "#3b82f6",
          "600": "#2563eb",
        },
        "cyan": {
          "400": "#22d3ee",
          "500": "#06b6d4",
        },
        "emerald": {
          "500": "#10b981",
          "600": "#059669",
        },
        "teal": {
          "400": "#2dd4bf",
          "500": "#14b8a6",
        },
        "orange": {
          "400": "#fb923c",
          "500": "#f97316",
          "600": "#ea580c",
        },
        "amber": {
          "500": "#f59e0b",
          "600": "#d97706",
        },
        "indigo": {
          "500": "#6366f1",
          "600": "#4f46e5",
        },
        "violet": {
          "500": "#8b5cf6",
          "600": "#7c3aed",
        },
        "rose": {
          "500": "#f43f5e",
          "600": "#e11d48",
        },
        "green": {
          "400": "#4ade80",
          "500": "#22c55e",
          "600": "#16a34a",
        },
        "red": {
          "400": "#ef4444",
          "500": "#dc2626",
          "600": "#b91c1c",
        },
        "yellow": {
          "400": "#facc15",
          "500": "#eab308",
          "600": "#d97706",
        },
        "slate": {
            "50": "#f8fafc",
            "100": "#f1f5f9",
            "200": "#e2e8f0",
            "300": "#cbd5e1",
            "400": "#94a3b8",
            "500": "#64748b",
            "600": "#475569",
            "700": "#334155",
            "800": "#1e293b",
            "900": "#0f172a"
        },
        "gray": {
            "50": "#f9fafb",
            "100": "#f3f4f6",
            "200": "#e5e7eb",
            "300": "#d1d5db",
            "400": "#9ca3af",
            "500": "#6b7280",
            "600": "#4b5563",
            "700": "#374151",
            "800": "#1f2937",
            "900": "#111827"
        },

      },
      fontFamily: {
        "display": ["Space Grotesk", "sans-serif"],
        "sans": ["Space Grotesk", "sans-serif"], 
        "body": ["Noto Sans", "sans-serif"], 
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg": "1.5rem",
        "xl": "2rem",
        "2xl": "2.5rem",
        "3xl": "3rem", 
        "full": "9999px"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-border': 'linear-gradient(to bottom right, #520ef1, #ec4899)',
        'gradient-primary': 'linear-gradient(135deg, #895bf5 0%, #a27bfc 100%)',
        'gradient-pink': 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
        'gradient-cyan': 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
        'gradient-card-high': 'linear-gradient(to bottom, #ff4b91, #ff9068)',
        'gradient-card-med': 'linear-gradient(to bottom, #895bf5, #00d4ff)',
        'gradient-card-low': 'linear-gradient(to bottom, #00f260, #0575e6)',
        'gradient-button-primary': 'linear-gradient(90deg, #895bf5, #ec4899, #f97316)',
        'subtle-grid-dark': 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")',
        'subtle-grid-light': 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23895bf5\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")',
        'gradient-dark-fade': 'linear-gradient(180deg, rgba(21,18,30,0) 0%, #15121e 100%)',
        'gradient-light-fade': 'linear-gradient(180deg, rgba(248,250,252,0) 0%, #f1f5f9 100%)',
        'gradient-sidebar': 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
        'glow-hover': '0 0 30px rgba(99, 102, 241, 0.5)',
      },
      animation: {
        'blob': 'blob 7s infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 7s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradientMove': 'gradientMove 5s ease infinite', 
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
          '100%': { transform: 'translateY(0px) rotate(0deg)' },
        },
        'float-delayed': {
          '0%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(-2deg)' },
          '100%': { transform: 'translateY(0px) rotate(0deg)' },
        },
        gradientMove: {
            '0%': { 'background-position': '0% 50%' },
            '50%': { 'background-position': '100% 50%' },
            '100%': { 'background-position': '0% 50%' },
        }
      }
    },
  },
  plugins: [],
};

export default config;
