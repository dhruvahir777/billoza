import React from "react";
import { FiInfo } from "react-icons/fi";
import { APP_INFO } from "./settingsConstants";

export default function AboutSettings() {
  return (
    <div>
      <div className="flex items-center space-x-3 mb-6">
        <FiInfo className="text-purple-500" size={24} />
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">About</h2>
      </div>
      
      <div className="space-y-6">
        <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <FiInfo className="text-white" size={32} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{APP_INFO.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">Professional restaurant management solution</p>
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
                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">{APP_INFO.support}</p>
              </div>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="text-blue-600 dark:text-blue-400 font-semibold">Release Date</p>
                <p className="text-gray-900 dark:text-white">June 2025</p>
              </div>
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <p className="text-green-600 dark:text-green-400 font-semibold">Platform</p>
                <p className="text-gray-900 dark:text-white">Web Application</p>
              </div>
              <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <p className="text-purple-600 dark:text-purple-400 font-semibold">Framework</p>
                <p className="text-gray-900 dark:text-white">React 18</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button className="flex-1 min-w-[200px] px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
            <FiInfo size={16} />
            <span>Check for Updates</span>
          </button>
          
          <button className="flex-1 min-w-[200px] px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            View Documentation
          </button>
          
          <button className="flex-1 min-w-[200px] px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Contact Support
          </button>
        </div>
        
        {/* Footer Info */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-4 border-t border-gray-200 dark:border-gray-600">
          <p>© 2025 Restaurant Management System. All rights reserved by Dhruv Studios.</p>
          <p className="mt-1">✨ Crafting digital solutions that transform culinary dreams into reality ✨</p>
        </div>
      </div>
    </div>
  );
}