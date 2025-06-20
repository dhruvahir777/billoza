import React from "react";

export default function PrivacySettings() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-neutral-600 dark:text-white mb-6">Privacy & Security</h2>
      <div className="space-y-6">
        <div className="p-4 bg-primary-light/10 dark:bg-primary/20 rounded-lg border border-primary-light/30 dark:border-primary/30">
          <h3 className="font-medium text-primary-dark dark:text-primary-light mb-2">Two-factor authentication</h3>
          <p className="text-sm text-primary dark:text-primary-light/80 mb-3">Add an extra layer of security to your account</p>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            Enable 2FA
          </button>
        </div>
        <div className="flex items-center justify-between p-4 bg-neutral-100 dark:bg-gray-700 rounded-lg">
          <div>
            <p className="font-medium text-neutral-600 dark:text-white">Auto-lock dashboard</p>
            <p className="text-sm text-neutral-400 dark:text-gray-400">Lock dashboard after inactivity</p>
          </div>
          <select className="px-3 py-2 border border-neutral-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-neutral-600 dark:text-white">
            <option>5 minutes</option>
            <option>15 minutes</option>
            <option>30 minutes</option>
            <option>Never</option>
          </select>
        </div>
        <div className="flex items-center justify-between p-4 bg-neutral-100 dark:bg-gray-700 rounded-lg">
          <div>
            <p className="font-medium text-neutral-600 dark:text-white">Session timeout</p>
            <p className="text-sm text-neutral-400 dark:text-gray-400">Automatically logout after inactivity</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light/30 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>
    </div>
  );
}