import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function FancyDropdown({
  label,
  options,
  value,
  onChange,
  placeholder = "Select...",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div className="relative w-full" ref={ref}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <button
        type="button"
        className={`w-full min-w-[200px] flex justify-between items-center border rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md ${
          open ? "border-blue-500 ring-2 ring-blue-500/20" : "border-gray-200 dark:border-gray-600"
        }`}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="flex-1 text-left truncate">
          {selected ? (
            <span className="text-gray-900 dark:text-gray-100">{selected.label}</span>
          ) : (
            <span className="text-gray-400 dark:text-gray-500">{placeholder}</span>
          )}
        </span>
        <ChevronDown
          className={`ml-2 h-4 w-4 text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      
      {open && (
        <div className="absolute z-[9999] mt-2 w-full min-w-[200px] bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 py-2 max-h-64 overflow-auto">
          <div className="py-1">
            {options.map((opt, index) => (
              <button
                key={opt.value}
                type="button"
                className={`w-full px-4 py-3 text-left text-sm font-medium transition-all duration-150 hover:bg-blue-50 dark:hover:bg-gray-700 focus:outline-none focus:bg-blue-50 dark:focus:bg-gray-700 ${
                  value === opt.value 
                    ? "bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 border-r-2 border-blue-500" 
                    : "text-gray-700 dark:text-gray-200"
                } ${index === 0 ? 'rounded-t-lg' : ''} ${index === options.length - 1 ? 'rounded-b-lg' : ''}`}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="truncate">{opt.label}</span>
                  {value === opt.value && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
