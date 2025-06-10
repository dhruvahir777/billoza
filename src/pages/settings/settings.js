import React, { useEffect, useState } from "react";
import { FiUser, FiCheckCircle, FiDownload } from "react-icons/fi";
import { USER_INFO, THEME_KEY } from "../../components/settings/settingsConstants";
import AppearanceSettings from "../../components/settings/AppearanceSettings";
import LanguageSettings from "../../components/settings/LanguageSettings";
import SystemSettings from "../../components/settings/SystemSettings";
import NotificationSettings from "../../components/settings/NotificationSettings";
import SecuritySettings from "../../components/settings/SecuritySettings";
import AboutSettings from "../../components/settings/AboutSettings";

export default function Settings() {
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || "dark");

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Fixed Header with Glass Morphism Effect - Responsive to sidebar state */}
      <div className="fixed top-0 left-52 right-0 p-6 pb-4 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-md border-b-2 border-gray-300 dark:border-gray-600 z-40 transition-all duration-300 sidebar-responsive-header">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account and application preferences</p>
      </div>

      {/* Content with top padding to account for fixed header */}
      <div className="pt-32">
        {/* User Profile Card */}
        <div className="px-6 pb-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <FiUser className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{USER_INFO.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{USER_INFO.email}</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors flex items-center space-x-2">
                  <FiCheckCircle size={16} />
                  <span>Update</span>
                </button>
                <button className="px-4 py-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors flex items-center space-x-2">
                  <FiDownload size={16} />
                  <span>Backup</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="px-6 pb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-10">
            
            {/* Appearance Settings */}
            <AppearanceSettings theme={theme} setTheme={setTheme} />
            
            {/* Language Settings */}
            <LanguageSettings />
            
            {/* System Settings */}
            <SystemSettings />
            
            {/* Notification Settings */}
            <NotificationSettings />
            
            {/* Security Settings */}
            <SecuritySettings />

            {/* About Section */}
            <AboutSettings />
          </div>
        </div>
      </div>
    </div>
  );
}
