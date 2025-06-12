import React from "react";

// Modern glassmorphism FoodCard (now with dark mode)
export default function FoodCard({
  name = "Food Name",
  category = "Category",
  price = 0,
  onAdd = () => {},
  imageUrl = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
}) {
  return (
    <div
      className="flex bg-gray-50/80 dark:bg-surface-dark/90 backdrop-blur-md rounded-2xl border border-gray-200/60 dark:border-border-light/20 p-4 w-full max-w-md items-center gap-5 hover:border-blue-300 dark:hover:border-accent hover:bg-gray-100/80 transition-all duration-200 group"
      style={{ fontFamily: 'Poppins, Roboto, sans-serif' }}
    >
      {/* Left: Food Image (removed) */}
      {/* Right: Details */}
      <div className="flex flex-col flex-1 justify-between h-full">
        <div>
          <div className="text-lg font-bold text-gray-800 dark:text-text-dark mb-1 drop-shadow-sm tracking-wide">{name}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider bg-gray-200/70 dark:bg-gray-700/50 px-2 py-1 rounded-full inline-block">{category}</div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="text-xl font-semibold text-gray-700 dark:text-text-dark">₹{price}</div>
          <button
            onClick={onAdd}
            className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-cyan-500 dark:to-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:from-blue-600 hover:to-blue-700 dark:hover:from-cyan-400 dark:hover:to-blue-500 focus:outline-none transition-all duration-200"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
