/**
 * Design Tokens - Central source of truth for Billoza's design system
 * 
 * This file defines all the design tokens used throughout the application.
 * Any changes made here will propagate through the entire system when applied
 * through the Tailwind config or CSS variables.
 */

// COLOR SYSTEM
export const colors = {
  // Primary color and its variants
  primary: {
    lighter: '#7878FF', // Even lighter variant for subtle backgrounds
    light: '#6B78FF',   // Lighter variant for hover states
    DEFAULT: '#4A4AFF', // Main primary color (changed from 5465FF)
    dark: '#3838CC',    // Darker variant for active states
    darker: '#292999',  // Even darker variant for text on light backgrounds
  },
  
  // Secondary color and its variants
  secondary: {
    lighter: '#F0F2FF', // Very light variant for backgrounds
    light: '#E9ECFF',   // Light variant
    DEFAULT: '#DDE1FF', // Main secondary color
    dark: '#C5CAFF',    // Darker variant
    darker: '#A6AEFF',  // Even darker variant
  },
  
  // Accent color and its variants
  accent: {
    lighter: '#FFF0F2', // Very light variant for backgrounds
    light: '#FFE6E9',   // Light variant
    DEFAULT: '#FFD6DB', // Main accent color
    dark: '#FFBDC4',    // Darker variant
    darker: '#FF9AA6',  // Even darker variant
  },
  
  // Background colors
  background: {
    lighter: '#FFFFFF', // Pure white
    light: '#FFFFFF',   // White for light mode
    DEFAULT: '#F8F9FA', // Very light gray (default background)
    dark: '#202945',    // Dark blue-gray (for dark mode)
    darker: '#171F38',  // Even darker blue-gray (for dark mode depths)
  },
  
  // Surface colors (for cards, dialogs, etc.)
  surface: {
    lighter: '#FFFFFF', // Pure white
    light: '#FFFFFF',   // White for light mode
    DEFAULT: '#FFFFFF', // Default to white
    dark: '#2C3651',    // Dark blue-gray (for dark mode)
    darker: '#232A40',  // Even darker blue-gray (for dark mode depths)
  },
  
  // Border colors
  border: {
    lighter: '#F0F2F5', // Very light gray
    light: '#E6E8EC',   // Light gray
    DEFAULT: '#D3D3D3', // Medium light gray
    dark: '#353E59',    // Dark blue-gray (for dark mode)
    darker: '#2A324A',  // Even darker blue-gray (for dark mode emphasis)
  },
  
  // Text colors
  text: {
    lighter: '#6E7A8A', // Light gray (for less important text)
    light: '#4A5568',   // Medium gray (for secondary text)
    DEFAULT: '#151C35', // Very dark blue (for primary text in light mode)
    dark: '#F8F9FA',    // Very light gray (for primary text in dark mode)
    darker: '#FFFFFF',  // White (for emphasized text in dark mode)
  },
  
  // Status/Semantic colors
  error: {
    lighter: '#FFEEEE', // Very light red for backgrounds
    light: '#FF7A7A',   // Light red for borders
    DEFAULT: '#FF5252', // Standard red for text and icons
    dark: '#E63E3E',    // Darker red for hover/active states
    darker: '#CC3333',  // Very dark red for text on light backgrounds
  },
  
  success: {
    lighter: '#EEFFF4', // Very light green for backgrounds
    light: '#7CE495',   // Light green for borders
    DEFAULT: '#4CD471', // Standard green for text and icons
    dark: '#38C05E',    // Darker green for hover/active states
    darker: '#28A048',  // Very dark green for text on light backgrounds
  },
  
  warning: {
    lighter: '#FFF9E6', // Very light yellow for backgrounds
    light: '#FFD392',   // Light yellow for borders
    DEFAULT: '#FFC25E', // Standard yellow for text and icons
    dark: '#F0B04A',    // Darker yellow for hover/active states
    darker: '#E09E33',  // Very dark yellow for text on light backgrounds
  },
  
  info: {
    lighter: '#EFF8FF', // Very light blue for backgrounds
    light: '#7BBFFF',   // Light blue for borders
    DEFAULT: '#50A1FF', // Standard blue for text and icons
    dark: '#3B8CF0',    // Darker blue for hover/active states
    darker: '#2970CC',  // Very dark blue for text on light backgrounds
  },
  
  // Neutral colors (grayscale)
  neutral: {
    50: '#FAFAFA',  // Nearly white
    100: '#F4F4F5', // Very light gray
    200: '#E6E8EC', // Light gray
    300: '#D3D3D3', // Medium light gray
    400: '#BBBBBB', // Medium gray
    500: '#8D8D8D', // Medium dark gray
    600: '#636363', // Dark gray
    700: '#212B42', // Dark blue-gray
    800: '#151C35', // Very dark blue
    900: '#0C1024', // Nearly black
  }
};

// SPACING SYSTEM
export const spacing = {
  // Base spacing unit: 4px (0.25rem)
  // Use these values for margin, padding, gap, etc.
  '0': '0px',
  '0.5': '0.125rem', // 2px
  '1': '0.25rem',    // 4px
  '1.5': '0.375rem', // 6px
  '2': '0.5rem',     // 8px
  '2.5': '0.625rem', // 10px
  '3': '0.75rem',    // 12px
  '3.5': '0.875rem', // 14px
  '4': '1rem',       // 16px
  '5': '1.25rem',    // 20px
  '6': '1.5rem',     // 24px
  '7': '1.75rem',    // 28px
  '8': '2rem',       // 32px
  '9': '2.25rem',    // 36px
  '10': '2.5rem',    // 40px
  '11': '2.75rem',   // 44px
  '12': '3rem',      // 48px
  '14': '3.5rem',    // 56px
  '16': '4rem',      // 64px
  '20': '5rem',      // 80px
  '24': '6rem',      // 96px
  '28': '7rem',      // 112px
  '32': '8rem',      // 128px
  '36': '9rem',      // 144px
  '40': '10rem',     // 160px
  '44': '11rem',     // 176px
  '48': '12rem',     // 192px
  '52': '13rem',     // 208px
  '56': '14rem',     // 224px
  '60': '15rem',     // 240px
  '64': '16rem',     // 256px
  '72': '18rem',     // 288px
  '80': '20rem',     // 320px
  '96': '24rem',     // 384px
};

// BORDER RADIUS SYSTEM
export const borderRadius = {
  'none': '0px',
  'xs': '0.25rem',      // 4px - Tiny elements
  'sm': '0.375rem',     // 6px - Small elements
  'DEFAULT': '0.75rem', // 12px - Default rounded
  'md': '0.75rem',      // 12px - Medium elements  
  'lg': '1rem',         // 16px - Large cards and containers
  'xl': '1.25rem',      // 20px - Extra large containers
  '2xl': '1.5rem',      // 24px - Very large containers
  '3xl': '1.75rem',     // 28px - Parent containers (as requested)
  '4xl': '2rem',        // 32px - Maximum rounded corners
  'full': '9999px',     // Full circle/pill shape for buttons and small elements
};

// TYPOGRAPHY SYSTEM
export const typography = {
  // Font families
  fontFamily: {
    poppins: ['Poppins', 'sans-serif'],
    roboto: ['Roboto', 'sans-serif'],
    publicSans: ['Public Sans', 'sans-serif'],
  },
  
  // Font sizes
  fontSize: {
    'xs': ['0.75rem', { lineHeight: '1rem' }],        // 12px
    'sm': ['0.875rem', { lineHeight: '1.25rem' }],    // 14px
    'base': ['1rem', { lineHeight: '1.5rem' }],       // 16px
    'lg': ['1.125rem', { lineHeight: '1.75rem' }],    // 18px
    'xl': ['1.25rem', { lineHeight: '1.75rem' }],     // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],        // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],   // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],     // 36px
    '5xl': ['3rem', { lineHeight: '1' }],             // 48px
    '6xl': ['3.75rem', { lineHeight: '1' }],          // 60px
    '7xl': ['4.5rem', { lineHeight: '1' }],           // 72px
    '8xl': ['6rem', { lineHeight: '1' }],             // 96px
    '9xl': ['8rem', { lineHeight: '1' }],             // 128px
  },
  
  // Font weights
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
};

// SHADOWS SYSTEM
export const shadows = {
  // Box shadows
  boxShadow: {
    'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
    'none': 'none',
    // Custom shadows for the Billoza app
    '1': '0 0 4px 0 rgba(145, 158, 171, 0.1), 0 10px 24px -2px rgba(145, 158, 171, 0.12)',
    'card': '0 2px 8px 0 rgba(99, 99, 99, 0.1)',
    'card-hover': '0 6px 20px 0 rgba(99, 99, 99, 0.15)',
    'dropdown': '0 4px 16px 0 rgba(34, 48, 73, 0.12)',
    'button': '0 2px 6px 0 rgba(74, 74, 255, 0.15)',
  },
};

// ANIMATION SYSTEM
export const animations = {
  transition: {
    'DEFAULT': 'all 0.2s ease',
    'fast': 'all 0.1s ease',
    'slow': 'all 0.3s ease',
    'bezier': 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
  },
  keyframes: {
    fadeIn: {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' }
    },
    fadeOut: {
      '0%': { opacity: '1' },
      '100%': { opacity: '0' }
    },
    slideIn: {
      '0%': { transform: 'translateY(-10px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' }
    },
    slideOut: {
      '0%': { transform: 'translateY(0)', opacity: '1' },
      '100%': { transform: 'translateY(-10px)', opacity: '0' }
    },
    pulse: {
      '0%, 100%': { opacity: '1' },
      '50%': { opacity: '0.5' }
    }
  },
  animation: {
    'fade-in': 'fadeIn 0.3s ease-out forwards',
    'fade-out': 'fadeOut 0.3s ease-out forwards',
    'slide-in': 'slideIn 0.3s ease-out forwards',
    'slide-out': 'slideOut 0.3s ease-out forwards',
    'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  }
};

// Export all tokens
export default {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
  animations
};