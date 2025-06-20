import React, { useEffect, useRef } from "react";
import { useDesignSystem } from "../../../design/DesignSystem";

// Modern FoodCard with new color palette that properly responds to theme changes
export default function FoodCard({
  name = "Food Name",
  category = "Category",
  price = 0,
  onAdd = () => {},
  imageUrl = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
}) {
  const cardRef = useRef(null);
  const { primaryColor } = useDesignSystem();
  
  // Update the card's hover style when primaryColor changes
  useEffect(() => {
    if (cardRef.current) {
      // Create a custom CSS rule for this specific card
      const styleEl = document.createElement('style');
      const uniqueId = `food-card-${Math.random().toString(36).substring(2, 10)}`;
      
      cardRef.current.classList.add(uniqueId);
      
      styleEl.innerHTML = `
        .${uniqueId}:hover {
          border-color: ${primaryColor} !important;
          box-shadow: 0 0 0 1px ${primaryColor}33 !important;
        }
      `;
      
      document.head.appendChild(styleEl);
      
      return () => {
        document.head.removeChild(styleEl);
      };
    }
  }, [primaryColor]);

  return (
    <div
      ref={cardRef}
      className="flex bg-white dark:bg-gray-700 rounded-2xl border-2 border-neutral-200 dark:border-gray-600 p-4 w-full max-w-md items-center gap-5 transition-all duration-300 group shadow-sm"
      style={{ fontFamily: 'Poppins, Roboto, sans-serif' }}
    >
      {/* Right: Details */}
      <div className="flex flex-col flex-1 justify-between h-full">
        <div>
          <div className="text-lg font-bold text-neutral-600 dark:text-white mb-1 tracking-wide">{name}</div>
          <div className="text-xs text-neutral-500 dark:text-gray-300 mb-2 uppercase tracking-wider bg-neutral-100 dark:bg-gray-600 px-2 py-1 rounded-full inline-block">{category}</div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="text-xl font-semibold text-neutral-600 dark:text-white">₹{price}</div>
          <button
            onClick={onAdd}
            className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-full font-semibold focus:outline-none transition-all duration-200"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
