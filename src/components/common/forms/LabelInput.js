import React, { useState } from "react";

export default function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  onFocus,
  required = false,
  placeholder = "",
  maxLength,
  customValidator,
  capitalize = "none",
  error,
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleChange = (e) => {
    let newValue = e.target.value;

    // Capitalization Logic
    if (capitalize === "uppercase") {
      newValue = newValue.toUpperCase();
    } else if (capitalize === "lowercase") {
      newValue = newValue.toLowerCase();
    }

    // Validation Check
    if (customValidator) {
      const isValid = customValidator(newValue);
      if (isValid) {
        onChange?.({
          ...e,
          target: { ...e.target, name, value: newValue },
        });
      }
    } else {
      onChange?.({
        ...e,
        target: { ...e.target, name, value: newValue },
      });
    }
  };

  const shouldFloat = isFocused || (value && value.trim().length > 0);

  return (
    <div className="relative w-full sm:col-span-1 lg:col-span-4">
      {/* Floating Label */}
      <label
        htmlFor={name}
        className={`absolute left-3 px-1 bg-white transition-all duration-200 ${
          error ? "text-red-600" : "text-grey-500"
        } pointer-events-none
          ${
            shouldFloat
              ? "text-sm -top-2.5 text-grey-800"
              : "text-sm top-3 pr-10"
          }
        `}
      >
        {label}
        {required ? "*" : ""}
      </label>

      {/* Input Field */}
      <input
        id={name}
        name={name}
        type={type}
        value={value || ""}
        required={required}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        maxLength={maxLength}
        className={`
          w-full border rounded-md px-3 py-3 text-sm text-gray-800
          appearance-none bg-white transition-colors duration-200 focus:outline-none
          hover:border-grey-800 hover:border-1
          ${
            error
              ? "border-red-500"
              : isFocused
              ? "border-grey-800 border-2"
              : "border-border"
          }
        `}
      />
    </div>
  );
}
