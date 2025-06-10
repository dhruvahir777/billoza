// src/components/common/PageHeader.js
import React from "react";
import { Plus } from "lucide-react";

const PageHeader = ({ title, subtitle, buttonText, onButtonClick }) => {
  return (
    <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface-light dark:bg-surface-dark rounded-2xl shadow mb-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-primary">{title}</h2>
        <p className="text-text-light dark:text-text-dark mt-1 text-sm sm:text-base">{subtitle}</p>
      </div>
      {buttonText && (
        <button
          onClick={onButtonClick}
          className="flex items-center bg-primary text-white px-4 py-2 rounded-md transition text-sm sm:text-base hover:bg-primary-light"
        >
          <Plus className="w-4 h-4 mr-2" />
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default PageHeader;
