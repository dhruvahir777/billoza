import React from "react";
import { FiShield } from "react-icons/fi";

export default function SecuritySettings() {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
      <div className="flex items-center space-x-3 mb-6">
        <FiShield className="text-red-500" size={24} />
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Security & Privacy</h2>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
            <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">Enabled</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Add an extra layer of security to your account</p>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Manage 2FA Settings</button>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="font-medium text-gray-900 dark:text-white">Login Sessions</p>
            <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">3 Active</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Manage your active login sessions</p>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">View All Sessions</button>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="font-medium text-gray-900 dark:text-white">Password</p>
            <span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded">Last changed 30 days ago</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Keep your account secure with a strong password</p>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Change Password</button>
        </div>
      </div>
    </div>
  );
}