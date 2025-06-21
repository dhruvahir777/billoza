import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";

export default function FancyDropdown({
  label,
  options,
  value,
  onChange,
  placeholder = "Select...",
  disabled = false,
  popoverClassName = ""
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  // Calculate dropdown position
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative w-full">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <button
        ref={buttonRef}
        type="button"
        className="flex w-full items-center justify-between rounded-lg bg-white dark:bg-gray-700 px-4 py-3 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className={`block truncate ${value ? '' : 'text-gray-400'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      
      {isOpen && createPortal(
        <div 
          ref={dropdownRef}
          className={`fixed py-1 max-h-60 overflow-auto rounded-md bg-white dark:bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[9999] ${popoverClassName}`}
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${dropdownPosition.width}px`
          }}
        >
          <ul className="py-1 text-sm">
            {options.map((option) => (
              <li
                key={option.value}
                className={`cursor-pointer select-none px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-600 ${
                  value === option.value ? 'bg-gray-100 dark:bg-gray-600' : ''
                }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </li>
            ))}
            {options.length === 0 && (
              <li className="px-4 py-2.5 text-gray-400 cursor-default">
                No options available
              </li>
            )}
          </ul>
        </div>,
        document.body
      )}
    </div>
  );
}
