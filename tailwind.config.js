import designTokens from './src/design/tokens.js';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: designTokens.colors,
      borderRadius: designTokens.borderRadius,
      fontFamily: designTokens.typography.fontFamily,
      fontSize: designTokens.typography.fontSize,
      fontWeight: designTokens.typography.fontWeight,
      boxShadow: designTokens.shadows.boxShadow,
      spacing: designTokens.spacing,
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transitionDuration: {
        '2000': '2000ms',
      }
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        // Parent Card - with 28px border radius (3xl)
        '.card-parent': {
          '@apply bg-white dark:bg-surface-dark rounded-3xl border border-border-light dark:border-border-dark shadow-card transition-all p-6': {},
          '&:hover': {
            '@apply shadow-card-hover': {},
          },
        },
        // Child Card - with standard border radius
        '.card-child': {
          '@apply bg-white dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm p-4': {},
        },
        // Button styles
        '.btn': {
          '@apply px-4 py-2 font-medium transition-all rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2': {},
        },
        '.btn-primary': {
          '@apply bg-primary text-white hover:bg-primary-dark focus:ring-primary-light': {},
        },
        '.btn-secondary': {
          '@apply bg-secondary text-primary hover:bg-secondary-dark focus:ring-secondary-light': {},
        },
        '.btn-outline': {
          '@apply border border-primary text-primary hover:bg-primary-lighter hover:text-primary-dark focus:ring-primary-light': {},
        },
        // Food Card
        '.food-card': {
          '@apply bg-white dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-card hover:shadow-card-hover transition-all overflow-hidden': {},
        },
      })
    },
    function ({ addBase, theme }) {
      addBase({
        'html': { 
          fontFamily: theme('fontFamily.publicSans'),
          color: theme('colors.text.DEFAULT'),
          backgroundColor: theme('colors.background.DEFAULT'),
        },
        'body': {
          '@apply bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors': {},
        },
        'h1': { 
          '@apply text-3xl font-bold': {},
        },
        'h2': { 
          '@apply text-2xl font-semibold': {},
        },
        'h3': { 
          '@apply text-xl font-semibold': {},
        },
        'h4': { 
          '@apply text-lg font-medium': {},
        },
        'p': { 
          '@apply text-base': {},
        },
      })
    },
  ],
};