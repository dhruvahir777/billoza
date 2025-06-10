import React, { useState } from "react";
import { FiMonitor } from "react-icons/fi";

export default function AppearanceSettings({ theme, setTheme }) {
  const [accentColor, setAccentColor] = useState("#3B82F6"); // Default blue
  const [customColor, setCustomColor] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Predefined accent colors
  const predefinedColors = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Green", value: "#10B981" },
    { name: "Red", value: "#EF4444" },
    { name: "Orange", value: "#F59E0B" },
    { name: "Pink", value: "#EC4899" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Teal", value: "#14B8A6" },
  ];

  const handleColorSelect = (color) => {
    setAccentColor(color);
    setShowCustomInput(false);
    setCustomColor("");
  };

  const handleCustomColorSubmit = () => {
    if (customColor && /^#[0-9A-F]{6}$/i.test(customColor)) {
      setAccentColor(customColor);
      setShowCustomInput(false);
    }
  };

  const isValidHexColor = (color) => {
    return /^#[0-9A-F]{6}$/i.test(color);
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
      <div className="flex items-center space-x-3 mb-6">
        <FiMonitor className="text-blue-500" size={24} />
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Appearance</h2>
      </div>
      
      {/* Theme Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Theme</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Choose your preferred theme for the entire dashboard.</p>
        
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <button
            onClick={() => setTheme("light")}
            className={`p-4 rounded-lg border-2 transition-all ${
              theme === "light"
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
            }`}
          >
            <div className="w-full h-16 bg-gradient-to-br from-white to-gray-100 rounded mb-3 border"></div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">Light Mode</div>
          </button>
          
          <button
            onClick={() => setTheme("dark")}
            className={`p-4 rounded-lg border-2 transition-all ${
              theme === "dark"
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
            }`}
          >
            <div className="w-full h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded mb-3 border"></div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</div>
          </button>
        </div>
      </div>

      {/* Accent Color Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Accent Color</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Choose your preferred accent color for buttons, links, and highlights.</p>
        
        {/* Current Color Preview */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 shadow-sm"
              style={{ backgroundColor: accentColor }}
            ></div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Current Accent Color</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{accentColor.toUpperCase()}</p>
            </div>
          </div>
        </div>

        {/* Predefined Colors */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Predefined Colors</h4>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {predefinedColors.map((color) => (
              <button
                key={color.value}
                onClick={() => handleColorSelect(color.value)}
                className={`group relative w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 ${
                  accentColor === color.value
                    ? "border-gray-800 dark:border-white shadow-lg ring-2 ring-gray-300 dark:ring-gray-600"
                    : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              >
                {accentColor === color.value && (
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
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">Custom Color</h4>
            <button
              onClick={() => setShowCustomInput(!showCustomInput)}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              {showCustomInput ? "Cancel" : "Add Custom Color"}
            </button>
          </div>
          
          {showCustomInput && (
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-300">
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    placeholder="#3B82F6"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Enter a hex color code (e.g., #3B82F6)
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  {customColor && isValidHexColor(customColor) && (
                    <div 
                      className="w-10 h-10 rounded border border-gray-300 dark:border-gray-600"
                      style={{ backgroundColor: customColor }}
                    ></div>
                  )}
                  <button
                    onClick={handleCustomColorSubmit}
                    disabled={!customColor || !isValidHexColor(customColor)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
              {customColor && !isValidHexColor(customColor) && (
                <p className="text-xs text-red-500 mt-2">Please enter a valid hex color code</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Display Settings */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Display</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Compact mode</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Reduce spacing between elements</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}