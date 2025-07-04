import React from "react";
import { FiInfo } from "react-icons/fi";
import { APP_INFO } from "./settingsConstants";

export default function AboutSettings() {
  return (
    <div>
      <div className="flex items-center space-x-3 mb-6">
        <FiInfo className="text-primary" size={24} />
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">About</h2>
      </div>
      
      <div className="space-y-6">
        <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center shadow-lg">
              <FiInfo className="text-white" size={32} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{APP_INFO.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">Professional restaurant billing system</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Version</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{APP_INFO.version}</p>
              </div>
              
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Build Number</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{APP_INFO.build}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">License Type</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{APP_INFO.license}</p>
              </div>
              
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Support Email</p>
                <p className="text-lg font-semibold text-primary dark:text-primary-light">{APP_INFO.support}</p>
              </div>
            </div>
          </div>
          
          {/* Additional Info */}
        </div>
        
        {/* Footer Info */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-4 border-t border-gray-200 dark:border-gray-600">
          <p>© 2025 Billoza. All rights reserved by Dhruv Studios.</p>
          <p className="mt-1">✨ Crafting digital solutions that transform culinary dreams into reality ✨</p>
        </div>
      </div>
    </div>
  );
}