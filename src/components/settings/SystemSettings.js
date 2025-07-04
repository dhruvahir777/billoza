import React, { useState } from "react";
import { FiSettings } from "react-icons/fi";

export default function SystemSettings() {
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [dataSync, setDataSync] = useState(false);

  return (
    <div className="border-b border-neutral-200 dark:border-gray-700 pb-8">
      <div className="flex items-center space-x-3 mb-6">
        <FiSettings className="text-primary" size={24} />
        <h2 className="text-2xl font-semibold text-neutral-600 dark:text-white">System</h2>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-neutral-100 dark:bg-gray-700 rounded-lg">
          <div>
            <p className="font-medium text-neutral-600 dark:text-white">Auto Update</p>
            <p className="text-sm text-neutral-400 dark:text-gray-400">Automatically update the application when new versions are available</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={autoUpdate}
              onChange={(e) => setAutoUpdate(e.target.checked)}
            />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light/30 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-neutral-100 dark:bg-gray-700 rounded-lg">
          <div>
            <p className="font-medium text-neutral-600 dark:text-white">Auto Backup</p>
            <p className="text-sm text-neutral-400 dark:text-gray-400">Automatically backup your data daily</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={autoBackup}
              onChange={(e) => setAutoBackup(e.target.checked)}
            />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light/30 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-neutral-100 dark:bg-gray-700 rounded-lg">
          <div>
            <p className="font-medium text-neutral-600 dark:text-white">Data Sync</p>
            <p className="text-sm text-neutral-400 dark:text-gray-400">Sync data across multiple devices</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={dataSync}
              onChange={(e) => setDataSync(e.target.checked)}
            />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light/30 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>
    </div>
  );
}