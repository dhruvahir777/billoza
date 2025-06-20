import React from "react";

export default function SidebarBrand({ isMinimized, onDoubleClick }) {
  return (
    <div
      className={`p-4 flex items-center ${isMinimized ? "justify-center" : "justify-start"}`}
      onDoubleClick={onDoubleClick}
      style={{ cursor: "pointer" }}
      title="Double click to toggle sidebar size"
    >
      {isMinimized ? (
        // Only logo when minimized
        <div className="relative">
          <div className="bg-primary dark:bg-primary-light rounded-lg p-2.5 shadow-lg">
            <img
              src={process.env.PUBLIC_URL + "/foodexlogo.png"}
              alt="Billoza Logo"
              className="h-5 w-5 object-contain filter brightness-0 invert transition-all duration-200"
            />
          </div>
        </div>
      ) : (
        // Logo and name when expanded
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="bg-primary dark:bg-primary-light rounded-lg p-2.5 shadow-lg">
              <img
                src={process.env.PUBLIC_URL + "/foodexlogo.png"}
                alt="Billoza Logo"
                className="h-6 w-6 object-contain filter brightness-0 invert transition-all duration-200"
              />
            </div>
          </div>
          <h1 className="text-lg font-bold text-neutral-600 dark:text-white">
            Billoza
          </h1>
        </div>
      )}
    </div>
  );
}
