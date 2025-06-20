import React from "react";
import { FiUser, FiCheckCircle, FiDownload } from "react-icons/fi";
import { USER_INFO } from "../../components/settings/settingsConstants";
import AppearanceSettings from "../../components/settings/AppearanceSettings";
import LanguageSettings from "../../components/settings/LanguageSettings";
import SystemSettings from "../../components/settings/SystemSettings";
import NotificationSettings from "../../components/settings/NotificationSettings";
import SecuritySettings from "../../components/settings/SecuritySettings";
import AboutSettings from "../../components/settings/AboutSettings";
import BusinessSettings from "../../components/settings/BusinessSettings";
import { useTheme } from "../../contexts/ThemeContext";

export default function Settings() {
  // Use the global theme context instead of local state
  const { theme } = useTheme();

  return (
    <div className="relative min-h-screen bg-neutral-100 dark:bg-gray-900">
      {/* Fixed Header with Glass Morphism Effect - Responsive to sidebar state */}
      <div className="fixed top-0 left-52 right-0 p-6 pb-4 bg-neutral-100/80 dark:bg-gray-900/80 backdrop-blur-md border-b-2 border-neutral-200 dark:border-gray-600 z-40 transition-all duration-300 sidebar-responsive-header">
        <h1 className="text-3xl font-semibold text-neutral-600 dark:text-white mb-2">Settings</h1>
        <p className="text-neutral-400 dark:text-gray-400">Manage your account and application preferences</p>
      </div>

      {/* Content with top padding to account for fixed header */}
      <div className="pt-32">
        {/* User Profile Card */}
        <div className="px-6 pb-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-neutral-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <FiUser className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-600 dark:text-white">{USER_INFO.name}</h3>
                  <p className="text-neutral-400 dark:text-gray-400">{USER_INFO.email}</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-primary-light/20 dark:bg-primary/30 text-primary dark:text-primary-light rounded-lg hover:bg-primary-light/30 dark:hover:bg-primary/50 transition-colors flex items-center space-x-2">
                  <FiCheckCircle size={16} />
                  <span>Update</span>
                </button>
                <button className="px-4 py-2 bg-accent-light/20 dark:bg-accent/30 text-accent dark:text-accent-light rounded-lg hover:bg-accent-light/30 dark:hover:bg-accent/50 transition-colors flex items-center space-x-2">
                  <FiDownload size={16} />
                  <span>Backup</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="px-6 pb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-neutral-200 dark:border-gray-700 p-6 space-y-10">
            
            {/* Appearance Settings */}
            <AppearanceSettings />
            
            {/* Business Settings */}
            <BusinessSettings />
            
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
