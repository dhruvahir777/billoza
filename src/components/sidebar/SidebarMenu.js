import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MENU_ITEMS, TEXTS } from "./sidebarConstants";

export default function SidebarMenu({ isMinimized, closeMobileSidebar }) {
  const location = useLocation();

  return (
    <div className={`${isMinimized ? "px-1" : "px-4"} flex-grow`}>
      {!isMinimized && (
        <p className="text-gray-400 dark:text-gray-500 text-[0.7rem] font-poppins font-bold mt-4">
          {TEXTS.overview}
        </p>
      )}
      <ul className="mt-2 space-y-1">
        {MENU_ITEMS.map(({ icon: Icon, label, to }) => (
          <li key={label}>
            <Link
              to={to}
              onClick={closeMobileSidebar}
              className={`flex ${
                isMinimized
                  ? "flex-col items-center px-1 py-3"
                  : "items-center px-3 py-3"
              } rounded-lg font-medium tracking-wide transition-colors duration-200
                ${
                  location.pathname === to
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700/60 dark:hover:text-white"
                }`}
            >
              <Icon
                className={isMinimized ? "mb-1" : "mr-3"}
                size={isMinimized ? 16 : 18}
              />
              <span
                className={
                  isMinimized
                    ? "text-[10px] font-poppins"
                    : "text-[13px] font-poppins"
                }
              >
                {label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
