import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Default to light mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference on app start
  useEffect(() => {
    const savedTheme = localStorage.getItem('billoza_theme');
    
    if (savedTheme) {
      const isDark = savedTheme === 'dark';
      setIsDarkMode(isDark);
    } else {
      // Default to light mode if no preference saved
      setIsDarkMode(false);
      localStorage.setItem('billoza_theme', 'light');
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#181c23'; // dark background
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#F8F9FA'; // light background
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('billoza_theme', newDarkMode ? 'dark' : 'light');
  };

  const setTheme = (theme) => {
    const isDark = theme === 'dark';
    setIsDarkMode(isDark);
    localStorage.setItem('billoza_theme', theme);
  };

  const value = {
    isDarkMode,
    theme: isDarkMode ? 'dark' : 'light',
    toggleTheme,
    setTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};