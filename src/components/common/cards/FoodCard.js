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
      className="flex bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md rounded-2xl shadow-md p-4 w-full max-w-md items-center gap-5 border border-border-dark/20 dark:border-border-light/20 hover:border-accent transition group"
      style={{ fontFamily: 'Poppins, Roboto, sans-serif' }}
    >
      {/* Left: Food Image (removed) */}
      {/* Right: Details */}
      <div className="flex flex-col flex-1 justify-between h-full">
        <div>
          <div className="text-lg font-bold text-text-light dark:text-text-dark mb-1 drop-shadow-sm tracking-wide">{name}</div>
          <div className="text-xs text-gray-400 mb-2 uppercase tracking-wider">{category}</div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="text-xl text-text-light dark:text-text-dark">₹{price}</div>
          <button
            onClick={onAdd}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow-lg hover:from-cyan-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 transition-all"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
