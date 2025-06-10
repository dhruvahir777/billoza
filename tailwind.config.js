// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      // Standardized border radius for consistent rounded corners
      borderRadius: {
        'none': '0px',
        'sm': '0.375rem',     // 6px - Small elements
        'DEFAULT': '0.75rem', // 12px - Default rounded (was 0.25rem)
        'md': '0.75rem',      // 12px - Medium elements  
        'lg': '1rem',         // 16px - Large cards and containers
        'xl': '1.25rem',      // 20px - Extra large containers
        '2xl': '1.5rem',      // 24px - Very large containers
        '3xl': '2rem',        // 32px - Maximum rounded corners
        'full': '9999px',     // Full circle/pill shape
      },
      colors: {
        // Unified semantic color palette
        primary: {
          light: '#60a5fa', // blue-400
          DEFAULT: '#2563eb', // blue-600
          dark: '#1e40af', // blue-800
        },
        secondary: {
          light: '#fbbf24', // amber-400
          DEFAULT: '#f59e42', // amber-500
          dark: '#b45309', // amber-800
        },
        background: {
          light: '#f9fafb', // gray-50
          DEFAULT: '#181c23', // dark bg
          dark: '#101217', // even darker
        },
        surface: {
          light: '#ffffff',
          DEFAULT: '#ffffff', // default to white
          dark: '#232a36',
        },
        border: {
          light: '#e5e7eb', // gray-200
          DEFAULT: '#e5e7eb', // default to light
          dark: '#232a39',
        },
        text: {
          light: '#18181b', // zinc-900
          DEFAULT: '#18181b', // default to dark text
          dark: '#f3f4f6', // gray-100
        },
        accent: {
          light: '#38bdf8', // sky-400
          DEFAULT: '#0891b2', // cyan-700
          dark: '#0891b2', // cyan-700
        },
        error: {
          light: '#fca5a5', // red-300
          dark: '#ef4444', // red-500
        },
        success: {
          light: '#bbf7d0', // green-200
          dark: '#22c55e', // green-500
        },
        warning: {
          light: '#fde68a', // yellow-200
          dark: '#f59e42', // amber-500
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        publicSans: ["Public Sans", "sans-serif"],
      },
      boxShadow: {
        "1":
          "0 0 4px 0 rgba(145, 158, 171, 0.1), 0 10px 24px -2px rgba(145, 158, 171, 0.12)",
      },
    },
  },
  animation: {
    dropdown: 'dropdownFade 0.2s ease-out forwards',
  },
  plugins: [],
};