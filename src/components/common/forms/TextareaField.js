import React, { useState } from "react";

export default function TextareaField({
  label,
  name,
  value,
  onChange,
  onBlur,
  onFocus,
  required = false,
  placeholder = "",
  rows = 4,
  maxLength,
  error,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [charCount, setCharCount] = useState(value?.length || 0);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setCharCount(newValue.length);

    if (onChange) {
      onChange({
        ...e,
        target: { ...e.target, name, value: newValue },
      });
    }
  };

  return (
    <div className="relative w-full sm:col-span-1 lg:col-span-4">
      <label
        htmlFor={name}
        className={`absolute left-3 px-1 bg-white transition-all duration-200 ${
          error ? "text-red-600" : "text-gray-500"
        } pointer-events-none
          ${
            isFocused || value
              ? "text-xs -top-2.5 text-gray-800"
              : "text-sm top-3"
          }
        `}
      >
        {label}
        {required ? "*" : ""}
      </label>
      <textarea
        id={name}
        name={name}
        value={value || ""}
        required={required}
        placeholder={placeholder}
        rows={rows}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        maxLength={maxLength}
        className={`
          w-full border rounded-md pr-3 pl-3 py-3 text-sm text-gray-800
          appearance-none bg-white transition-colors duration-200 focus:outline-none hover:border-gray-800 resize-none
          ${
            error
              ? "border-red-500"
              : isFocused
              ? "border-gray-800 border-2"
              : "border-gray-300"
          }
        `}
      />
      {maxLength && (
        <div className="text-xs text-gray-500 mt-1 text-right">
          {charCount}/{maxLength}
        </div>
      )}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
