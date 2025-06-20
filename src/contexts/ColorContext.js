import React, { createContext, useContext, useState, useEffect } from 'react';

const ColorContext = createContext();

export const useColor = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColor must be used within ColorProvider');
  }
  return context;
};

export const ColorProvider = ({ children }) => {
  // Initialize with default accent color or load from localStorage
  const [accentColor, setAccentColor] = useState(() => {
    const savedColor = localStorage.getItem('billoza_accent_color');
    return savedColor || '#4A4AFF'; // Default primary purple
  });

  // Apply accent color to CSS variables whenever it changes
  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('billoza_accent_color', accentColor);
    
    // Apply to CSS variables
    document.documentElement.style.setProperty('--color-primary', accentColor);
    
    // Generate lighter/darker variants
    const lightenColor = (color, percent) => {
      const num = parseInt(color.replace('#', ''), 16);
      const amt = Math.round(2.55 * percent);
      const R = (num >> 16) + amt;
      const G = (num >> 8 & 0x00FF) + amt;
      const B = (num & 0x0000FF) + amt;
      return '#' + (
        0x1000000 + 
        (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 + 
        (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 + 
        (B < 255 ? (B < 0 ? 0 : B) : 255)
      ).toString(16).slice(1);
    };
    
    // Set lighter and darker variants
    document.documentElement.style.setProperty('--color-primary-light', lightenColor(accentColor, 20));
    document.documentElement.style.setProperty('--color-primary-dark', lightenColor(accentColor, -20));
  }, [accentColor]);

  const value = {
    accentColor,
    setAccentColor
  };

  return (
    <ColorContext.Provider value={value}>
      {children}
    </ColorContext.Provider>
  );
};
