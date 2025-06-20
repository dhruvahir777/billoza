import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { MENU_ITEMS, TEXTS } from "./sidebarConstants";
import { useDesignSystem } from "../../design/DesignSystem";

export default function SidebarMenu({ isMinimized, closeMobileSidebar }) {
  const location = useLocation();
  const { primaryColor } = useDesignSystem();
  const menuRef = useRef(null);

  // Create dynamic styles for active menu items
  useEffect(() => {
    if (menuRef.current) {
      // Create a unique style element for this menu
      const styleId = 'sidebar-menu-styles';
      let styleEl = document.getElementById(styleId);
      
      // If style element doesn't exist, create it
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = styleId;
        document.head.appendChild(styleEl);
      }
      
      // Create CSS rules for active menu items using the primary color
      styleEl.innerHTML = `
        .sidebar-menu-item-active {
          background-color: ${primaryColor}15 !important; /* 15% opacity for light mode */
          color: ${primaryColor} !important;
        }
        .dark .sidebar-menu-item-active {
          background-color: ${primaryColor}30 !important; /* 30% opacity for dark mode */
          color: ${adjustColorLightness(primaryColor, 40)} !important; /* Lighter version for dark mode */
        }
      `;
      
      return () => {
        // Clean up if component unmounts
        if (styleEl && styleEl.parentNode) {
          styleEl.parentNode.removeChild(styleEl);
        }
      };
    }
  }, [primaryColor]);

  // Helper function to lighten a color (for dark mode text)
  function adjustColorLightness(hex, percent) {
    // Convert hex to RGB
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    
    // Make lighter
    r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
    g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
    b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));
    
    // Convert back to hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  return (
    <div className={`${isMinimized ? "px-1" : "px-4"} flex-grow`} ref={menuRef}>
      {!isMinimized && (
        <p className="text-neutral-400 dark:text-gray-500 text-[0.7rem] font-poppins font-bold mt-4">
          {TEXTS.overview}
        </p>
      )}
      <ul className="mt-2 space-y-1">
        {MENU_ITEMS.map(({ icon: Icon, label, to }) => (
          <li key={label}>
            <Link
              to={to}
              onClick={closeMobileSidebar}
              className={`flex ${
                isMinimized
                  ? "flex-col items-center px-1 py-3"
                  : "items-center px-3 py-3"
              } rounded-lg font-medium tracking-wide transition-colors duration-200
                ${
                  location.pathname === to
                    ? "sidebar-menu-item-active" // Use custom class for active items
                    : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-600 dark:text-gray-300 dark:hover:bg-gray-700/60 dark:hover:text-white"
                }`}
            >
              <Icon
                className={isMinimized ? "mb-1" : "mr-3"}
                size={isMinimized ? 16 : 18}
              />
              <span
                className={
                  isMinimized
                    ? "text-[10px] font-poppins"
                    : "text-[13px] font-poppins"
                }
              >
                {label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
