import React, { useState, useEffect } from "react";
import { FiGlobe, FiChevronDown } from "react-icons/fi";

export default function LanguageSettings() {
  const [selectedLanguage, setSelectedLanguage] = useState(() => 
    localStorage.getItem("restaurant_language") || "en"
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Available languages with their details
  const languages = [
    { 
      code: "en", 
      name: "English", 
      nativeName: "English",
      flag: "🇺🇸"
    },
    { 
      code: "hi", 
      name: "Hindi", 
      nativeName: "हिन्दी",
      flag: "🇮🇳"
    },
    { 
      code: "gu", 
      name: "Gujarati", 
      nativeName: "ગુજરાતી",
      flag: "🇮🇳"
    },
    { 
      code: "mr", 
      name: "Marathi", 
      nativeName: "मराठी",
      flag: "🇮🇳"
    },
    { 
      code: "pa", 
      name: "Punjabi", 
      nativeName: "ਪੰਜਾਬੀ",
      flag: "🇮🇳"
    },
    { 
      code: "zh", 
      name: "Chinese", 
      nativeName: "中文",
      flag: "🇨🇳"
    },
    { 
      code: "ja", 
      name: "Japanese", 
      nativeName: "日本語",
      flag: "🇯🇵"
    },
    { 
      code: "ru", 
      name: "Russian", 
      nativeName: "Русский",
      flag: "🇷🇺"
    },
    { 
      code: "ko", 
      name: "Korean", 
      nativeName: "한국어",
      flag: "🇰🇷"
    },
    { 
      code: "de", 
      name: "German", 
      nativeName: "Deutsch",
      flag: "🇩🇪"
    },
    { 
      code: "es", 
      name: "Spanish", 
      nativeName: "Español",
      flag: "🇪🇸"
    },
    { 
      code: "fr", 
      name: "French", 
      nativeName: "Français",
      flag: "🇫🇷"
    }
  ];

  useEffect(() => {
    localStorage.setItem("restaurant_language", selectedLanguage);
    document.documentElement.setAttribute("lang", selectedLanguage);
  }, [selectedLanguage]);

  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode);
    setIsDropdownOpen(false);
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === selectedLanguage) || languages[0];
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.language-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
      <div className="flex items-center space-x-3 mb-6">
        <FiGlobe className="text-blue-500" size={24} />
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Language</h2>
      </div>
      
      {/* Language Selection Dropdown */}
      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Choose your preferred language for the interface.
        </p>
        
        <div className="relative language-dropdown max-w-sm">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{getCurrentLanguage().flag}</span>
              <div className="text-left">
                <div className="font-medium text-gray-900 dark:text-white">
                  {getCurrentLanguage().name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {getCurrentLanguage().nativeName}
                </div>
              </div>
            </div>
            <FiChevronDown 
              className={`text-gray-400 transition-transform duration-200 ${
                isDropdownOpen ? 'transform rotate-180' : ''
              }`} 
              size={18} 
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              {languages.map((language, index) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    selectedLanguage === language.code 
                      ? "bg-blue-50 dark:bg-blue-900/30" 
                      : ""
                  } ${index !== languages.length - 1 ? "border-b border-gray-100 dark:border-gray-700" : ""}`}
                >
                  <span className="text-lg">{language.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {language.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {language.nativeName}
                    </div>
                  </div>
                  {selectedLanguage === language.code && (
                    <div className="flex-shrink-0">
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}