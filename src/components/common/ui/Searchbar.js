import React, { useState } from "react";

export default function Searchbar({ label, value, onChange, maxLength }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full sm:col-span-1 lg:col-span-4">
      {/* Floating Label */}
      <label
        className={`absolute left-3 px-1 bg-white transition-all duration-200 text-neutral-400 pointer-events-none
          ${isFocused || value ? "text-xs -top-2.5" : "text-sm top-3"}
          ${isFocused ? "text-primary dark:text-primary-light" : ""}
        `}
      >
        {label}
      </label>

      {/* Search Icon on the right */}
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
        <svg
          className={`h-5 w-5 ${
            isFocused ? "text-primary dark:text-primary-light" : "text-neutral-400"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Input Field */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          w-full border rounded-md pr-10 pl-3 py-3 text-sm text-neutral-600 dark:text-white
          appearance-none bg-white dark:bg-gray-800 transition-colors duration-200 focus:outline-none
          ${isFocused ? "border-primary dark:border-primary-light" : "border-neutral-300 dark:border-gray-600"}
        `}
      />
    </div>
  );
}
