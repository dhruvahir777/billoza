import React, { useState, useEffect } from "react";
import { FiMonitor } from "react-icons/fi";
import { useTheme } from "../../contexts/ThemeContext";
import { useColor } from "../../contexts/ColorContext";
import { useDesignSystem } from "../../design/DesignSystem";


export default function AppearanceSettings() {
  const { isDarkMode,  setTheme } = useTheme();
  const {  setAccentColor } = useColor();
  const { primaryColor, updatePrimaryColor, borderRadius, updateBorderRadius, resetTheme } = useDesignSystem();
  
  const [customColor, setCustomColor] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  
  // Border radius options
  const borderRadiusOptions = [
    { label: "Default (28px)", value: "1.75rem" },
    { label: "Large (24px)", value: "1.5rem" },
    { label: "Medium (16px)", value: "1rem" },
    { label: "Small (12px)", value: "0.75rem" },
  ];

  // Predefined accent colors
  const predefinedColors = [
    { name: "Purple", value: "#4A4AFF" }, // Primary purple
    { name: "Blue", value: "#3B82F6" }, // Blue
    { name: "Teal", value: "#06B6D4" }, // Teal
    { name: "Green", value: "#4CD471" }, // Success green
    { name: "Red", value: "#FF5252" }, // Error red
    { name: "Amber", value: "#FFC25E" }, // Warning amber
    { name: "Pink", value: "#F178B6" }, // Pink
    { name: "Indigo", value: "#7879F1" }, // Indigo
  ];

  const handleColorSelect = (color) => {
    updatePrimaryColor(color);
    setAccentColor(color); // Keep both in sync
    setShowCustomInput(false);
    setCustomColor("");
  };

  const handleCustomColorSubmit = () => {
    if (customColor && /^#[0-9A-F]{6}$/i.test(customColor)) {
      updatePrimaryColor(customColor);
      setAccentColor(customColor); // Keep both in sync
      setShowCustomInput(false);
    }
  };

  const isValidHexColor = (color) => {
    return /^#[0-9A-F]{6}$/i.test(color);
  };

  useEffect(() => {
    // Initialize custom color with current primary color
    setCustomColor(primaryColor);
  }, [primaryColor]);

  return (
    <div className="border-b border-neutral-200 dark:border-gray-700 pb-8">
      <div className="flex items-center space-x-3 mb-6">
        <FiMonitor className="text-primary" size={24} />
        <h2 className="text-2xl font-semibold text-neutral-600 dark:text-white">Appearance</h2>
      </div>
      
      {/* Theme Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-neutral-600 dark:text-white mb-4">Theme</h3>
        <p className="text-neutral-400 dark:text-gray-400 mb-6">Choose your preferred theme for the entire dashboard.</p>
        
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <button
            onClick={() => setTheme("light")}
            className={`p-4 rounded-lg border-2 transition-all ${
              !isDarkMode
                ? "border-primary bg-primary-light/10 dark:bg-primary/30"
                : "border-neutral-200 dark:border-gray-600 hover:border-neutral-300 dark:hover:border-gray-500"
            }`}
          >
            <div className="w-full h-16 bg-gradient-to-br from-white to-neutral-100 rounded mb-3 border"></div>
            <div className="text-sm font-medium text-neutral-600 dark:text-white">Light Mode</div>
          </button>
          
          <button
            onClick={() => setTheme("dark")}
            className={`p-4 rounded-lg border-2 transition-all ${
              isDarkMode
                ? "border-primary bg-primary-light/10 dark:bg-primary/30"
                : "border-neutral-200 dark:border-gray-600 hover:border-neutral-300 dark:hover:border-gray-500"
            }`}
          >
            <div className="w-full h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded mb-3 border"></div>
            <div className="text-sm font-medium text-neutral-600 dark:text-white">Dark Mode</div>
          </button>
        </div>
        
        <div className="mt-4 p-3 bg-primary-light/10 dark:bg-primary/20 rounded-lg border border-primary-light/30 dark:border-primary/30">
          <p className="text-sm text-primary-dark dark:text-primary-light">
            💡 <strong>Note:</strong> You can switch between Light and Dark Mode anytime from here.
          </p>
        </div>
      </div>

      {/* Primary Color Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-neutral-600 dark:text-white mb-4">Primary Color</h3>
        <p className="text-neutral-400 dark:text-gray-400 mb-6">Choose your preferred primary color for buttons, links, and highlights.</p>
        
        {/* Current Color Preview */}
        <div className="mb-6 p-4 bg-neutral-100 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-lg border-2 border-neutral-200 dark:border-gray-600 shadow-sm"
              style={{ backgroundColor: primaryColor }}
            ></div>
            <div>
              <p className="font-medium text-neutral-600 dark:text-white">Current Primary Color</p>
              <p className="text-sm text-neutral-400 dark:text-gray-400">{primaryColor.toUpperCase()}</p>
            </div>
          </div>
        </div>

        {/* Color Preview - Shows all color variants */}
        <div className="mb-6 p-4 bg-neutral-100 dark:bg-gray-700 rounded-lg">
          <p className="font-medium text-neutral-600 dark:text-white mb-3">Color Preview</p>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-col items-center">
              <div className="w-12 h-8 rounded-t-lg" style={{ backgroundColor: 'var(--color-primary-lighter)' }}></div>
              <div className="text-xs text-neutral-400 dark:text-gray-400 mt-1">Lighter</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-8 rounded-t-lg" style={{ backgroundColor: 'var(--color-primary-light)' }}></div>
              <div className="text-xs text-neutral-400 dark:text-gray-400 mt-1">Light</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-8 rounded-t-lg" style={{ backgroundColor: 'var(--color-primary)' }}></div>
              <div className="text-xs text-neutral-400 dark:text-gray-400 mt-1">Default</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-8 rounded-t-lg" style={{ backgroundColor: 'var(--color-primary-dark)' }}></div>
              <div className="text-xs text-neutral-400 dark:text-gray-400 mt-1">Dark</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-8 rounded-t-lg" style={{ backgroundColor: 'var(--color-primary-darker)' }}></div>
              <div className="text-xs text-neutral-400 dark:text-gray-400 mt-1">Darker</div>
            </div>
          </div>
        </div>

        {/* Predefined Colors */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-neutral-600 dark:text-white mb-3">Predefined Colors</h4>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {predefinedColors.map((color) => (
              <button
                key={color.value}
                onClick={() => handleColorSelect(color.value)}
                className={`group relative w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 ${
                  primaryColor === color.value
                    ? "border-neutral-600 dark:border-white shadow-lg ring-2 ring-neutral-300 dark:ring-gray-600"
                    : "border-neutral-200 dark:border-gray-600 hover:border-neutral-300 dark:hover:border-gray-500"
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              >
                {primaryColor === color.value && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Color Input */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-neutral-600 dark:text-white">Custom Color</h4>
            <button
              onClick={() => setShowCustomInput(!showCustomInput)}
              className="text-sm text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-primary-light transition-colors"
            >
              {showCustomInput ? "Cancel" : "Add Custom Color"}
            </button>
          </div>
          
          {showCustomInput && (
            <div className="bg-neutral-100 dark:bg-gray-700 p-4 rounded-lg border border-neutral-200 dark:border-gray-600 transition-all duration-300">
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    placeholder="#4A4AFF"
                    className="w-full px-3 py-2 border border-neutral-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-neutral-600 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <p className="text-xs text-neutral-400 dark:text-gray-400 mt-1">
                    Enter a hex color code (e.g., #4A4AFF)
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  {customColor && isValidHexColor(customColor) && (
                    <div 
                      className="w-10 h-10 rounded border border-neutral-300 dark:border-gray-600"
                      style={{ backgroundColor: customColor }}
                    ></div>
                  )}
                  <button
                    onClick={handleCustomColorSubmit}
                    disabled={!customColor || !isValidHexColor(customColor)}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:bg-neutral-400 disabled:cursor-not-allowed transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
              {customColor && !isValidHexColor(customColor) && (
                <p className="text-xs text-error-dark mt-2">Please enter a valid hex color code</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Border Radius Settings */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-neutral-600 dark:text-white mb-4">Border Radius</h3>
        <p className="text-neutral-400 dark:text-gray-400 mb-6">Adjust the roundness of corners in the application.</p>
        
        <div className="mb-6">
          <h4 className="text-sm font-medium text-neutral-600 dark:text-white mb-3">Parent Container Radius</h4>
          <div className="grid grid-cols-4 gap-3 mb-4">
            {borderRadiusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateBorderRadius('parent', option.value)}
                className={`relative p-3 rounded-lg border transition-all ${
                  borderRadius.parent === option.value
                    ? "border-primary bg-primary-light/10 dark:bg-primary/30"
                    : "border-neutral-200 dark:border-gray-600 hover:border-neutral-300 dark:hover:border-gray-500"
                }`}
              >
                <div 
                  className="w-full h-12 bg-neutral-200 dark:bg-gray-600 mb-2"
                  style={{ borderRadius: option.value }}
                ></div>
                <div className="text-xs font-medium text-neutral-600 dark:text-white">{option.label}</div>
              </button>
            ))}
          </div>

          {/* Preview of current border radius */}
          <div className="p-4 bg-neutral-100 dark:bg-gray-700 rounded-lg">
            <p className="font-medium text-neutral-600 dark:text-white mb-3">Current Border Radius Preview</p>
            <div className="flex flex-wrap gap-4">
              <div>
                <div 
                  className="w-24 h-16 bg-primary flex items-center justify-center text-white font-medium"
                  style={{ borderRadius: borderRadius.parent }}
                >
                  Parent
                </div>
                <p className="text-xs text-neutral-400 dark:text-gray-400 mt-2 text-center">
                  Parent: {borderRadius.parent}
                </p>
              </div>
              <div>
                <div 
                  className="w-24 h-16 bg-primary-light flex items-center justify-center text-primary font-medium"
                  style={{ borderRadius: borderRadius.child }}
                >
                  Child
                </div>
                <p className="text-xs text-neutral-400 dark:text-gray-400 mt-2 text-center">
                  Child: {borderRadius.child}
                </p>
              </div>
              <div>
                <div 
                  className="w-24 h-16 bg-primary flex items-center justify-center text-white font-medium"
                  style={{ borderRadius: borderRadius.button }}
                >
                  Button
                </div>
                <p className="text-xs text-neutral-400 dark:text-gray-400 mt-2 text-center">
                  Button: {borderRadius.button}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reset All Theme Settings */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-neutral-600 dark:text-white mb-4">Reset Settings</h3>
        <p className="text-neutral-400 dark:text-gray-400 mb-6">Restore all appearance settings to default values.</p>
        
        <button
          onClick={resetTheme}
          className="px-6 py-3 bg-neutral-100 dark:bg-gray-700 border border-neutral-200 dark:border-gray-600 text-neutral-600 dark:text-white rounded-lg hover:bg-neutral-200 dark:hover:bg-gray-600 transition-colors"
        >
          Reset to Default Theme
        </button>
      </div>

      {/* Display Settings */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-neutral-600 dark:text-white mb-4">Display</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-neutral-100 dark:bg-gray-700 rounded-lg">
            <div>
              <p className="font-medium text-neutral-600 dark:text-white">Compact mode</p>
              <p className="text-sm text-neutral-400 dark:text-gray-400">Reduce spacing between elements</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light/30 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}