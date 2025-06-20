import React, { createContext, useContext, useEffect, useState } from 'react';
import { colors } from './tokens';

// Converts hex to RGB values to use in CSS variables
const hexToRgb = (hex) => {
  // Remove the hash if it exists
  hex = hex.replace('#', '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r}, ${g}, ${b}`;
};

// Context for the design system
const DesignSystemContext = createContext();

export const useDesignSystem = () => {
  const context = useContext(DesignSystemContext);
  if (!context) {
    throw new Error('useDesignSystem must be used within a DesignSystemProvider');
  }
  return context;
};

export const DesignSystemProvider = ({ children }) => {
  // Primary color state
  const [primaryColor, setPrimaryColor] = useState(colors.primary.DEFAULT);
  
  // Border radius state
  const [borderRadius, setBorderRadius] = useState({
    parent: '1.75rem', // 28px (3xl)
    child: '0.75rem',  // 12px (default)
    button: '9999px',  // full
  });
  
  // Font family state
  const [fontFamily, setFontFamily] = useState('Public Sans');

  // Apply theme changes
  useEffect(() => {
    // Update CSS variables for primary color
    document.documentElement.style.setProperty('--color-primary', primaryColor);
    
    // Calculate and set lighter and darker variants
    const primaryRgb = hexToRgb(primaryColor);
    document.documentElement.style.setProperty('--color-primary-rgb', primaryRgb);
    
    // Generate lighter and darker shades
    const lightenColor = (color, percent) => {
      const num = parseInt(color.replace('#', ''), 16);
      const amt = Math.round(2.55 * percent);
      const R = Math.min(255, Math.max(0, (num >> 16) + amt));
      const G = Math.min(255, Math.max(0, (((num >> 8) & 0x00FF)) + amt));
      const B = Math.min(255, Math.max(0, ((num & 0x0000FF)) + amt));
      return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    };
    
    // Set lighter variants
    const primaryLighter = lightenColor(primaryColor, 20);
    const primaryLight = lightenColor(primaryColor, 10);
    
    // Set darker variants
    const primaryDark = lightenColor(primaryColor, -20);
    const primaryDarker = lightenColor(primaryColor, -40);
    
    // Apply color variants to CSS variables
    document.documentElement.style.setProperty('--color-primary-lighter', primaryLighter);
    document.documentElement.style.setProperty('--color-primary-light', primaryLight);
    document.documentElement.style.setProperty('--color-primary-dark', primaryDark);
    document.documentElement.style.setProperty('--color-primary-darker', primaryDarker);
    
    // Update border radius variables
    document.documentElement.style.setProperty('--border-radius-3xl', borderRadius.parent);
    document.documentElement.style.setProperty('--border-radius-default', borderRadius.child);
    document.documentElement.style.setProperty('--border-radius-full', borderRadius.button);
    
    // Update font family
    document.documentElement.style.setProperty('--font-family-current', fontFamily);
    
    // Update button shadow based on primary color
    const buttonShadow = `0 2px 6px 0 ${primaryColor}26`; // 26 is hex for 15% opacity
    document.documentElement.style.setProperty('--shadow-button', buttonShadow);
    
  }, [primaryColor, borderRadius, fontFamily]);
  
  // Function to update the primary color
  const updatePrimaryColor = (newColor) => {
    setPrimaryColor(newColor);
  };
  
  // Function to update border radius
  const updateBorderRadius = (type, value) => {
    setBorderRadius(prev => ({
      ...prev,
      [type]: value,
    }));
  };
  
  // Function to update font family
  const updateFontFamily = (font) => {
    setFontFamily(font);
  };
  
  // Reset to default theme
  const resetTheme = () => {
    setPrimaryColor(colors.primary.DEFAULT);
    setBorderRadius({
      parent: '1.75rem', // 28px (3xl)
      child: '0.75rem',  // 12px (default)
      button: '9999px',  // full
    });
    setFontFamily('Public Sans');
  };
  
  const value = {
    primaryColor,
    borderRadius,
    fontFamily,
    updatePrimaryColor,
    updateBorderRadius,
    updateFontFamily,
    resetTheme,
  };
  
  return (
    <DesignSystemContext.Provider value={value}>
      {children}
    </DesignSystemContext.Provider>
  );
};