// src/components/common/PageHeader.js
import React from "react";

const PageHeader = ({ title, subtitle, actions }) => {
  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-neutral-600 dark:text-white">{title}</h1>
        {subtitle && (
          <p className="text-sm text-neutral-400 dark:text-gray-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex gap-2 items-center">{actions}</div>}
    </div>
  );
};

export default PageHeader;
