import React, { useState } from "react";
import { PROFILE_ICONS, TEXTS } from "./sidebarConstants";

export default function SidebarProfile({ isMinimized }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  const {
    profile: ProfileIcon,
    settings: SettingsIcon,
    more: MoreIcon,
  } = PROFILE_ICONS;

  return (
    <div
      className={`mt-auto p-3 font-poppins ${
        isMinimized ? "text-center" : "flex items-center"
      } bg-transparent`}
    >
      {isMinimized ? (
        <div className="flex items-center justify-between">
          <div className="w-8 h-8 bg-cyan-700 text-white rounded-full flex items-center justify-center font-bold mb-1">
            {TEXTS.userInitials}
          </div>
          <div className="relative cursor-pointer">
            <MoreIcon
              size={24}
              onClick={togglePopup}
              className="text-text-light dark:text-text-dark"
            />
            {isPopupOpen && (
              <div className="absolute bottom-6 -right-12 bg-surface-light dark:bg-surface-dark shadow-md rounded-md p-2 w-32 z-[1000] border border-border-light dark:border-border-dark">
                <ul className="text-[10px] text-text-light dark:text-text-dark">
                  <li className="py-1 px-2 hover:bg-background-light dark:hover:bg-background-dark cursor-pointer flex flex-col items-center">
                    <ProfileIcon size={24} />
                    <div>{TEXTS.profile}</div>
                  </li>
                  <li className="py-1 px-2 hover:bg-background-light dark:hover:bg-background-dark cursor-pointer flex flex-col items-center">
                    <SettingsIcon size={24} />
                    <div>{TEXTS.settings}</div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-cyan-700 text-white rounded-full flex items-center justify-center font-bold mr-3">
              {TEXTS.userInitials}
            </div>
            <p className="text-sm font-medium text-text-light dark:text-text-dark">
              {TEXTS.userName}
            </p>
          </div>
          <div className="relative cursor-pointer">
            <MoreIcon
              size={24}
              onClick={togglePopup}
              className="text-text-light dark:text-text-dark"
            />
            {isPopupOpen && (
              <div className="absolute bottom-5 right-3 bg-surface-light dark:bg-surface-dark shadow-md rounded-md p-2 w-32 z-50 border border-border-light dark:border-border-dark">
                <ul className="text-sm text-text-light dark:text-text-dark">
                  <li className="py-1 px-2 hover:bg-background-light dark:hover:bg-background-dark cursor-pointer flex justify-between">
                    <ProfileIcon size={24} />
                    <div>{TEXTS.profile}</div>
                  </li>
                  <li className="py-1 px-2 hover:bg-background-light dark:hover:bg-background-dark cursor-pointer flex justify-between">
                    <SettingsIcon size={24} />
                    <div>{TEXTS.settings}</div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
