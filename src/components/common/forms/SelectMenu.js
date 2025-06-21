import React from "react";
import FancyDropdown from "../ui/Dropdown";

export default function SelectMenu({
  label,
  options,
  value,
  onChange,
  disabled = false,
  isReadOnly = false,
  error = false,
}) {
  return (
    <div className="relative w-full">
      <FancyDropdown
        label={label}
        options={options}
        value={value}
        onChange={onChange}
        placeholder="Select..."
        popoverClassName="dropdown-popover"
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
