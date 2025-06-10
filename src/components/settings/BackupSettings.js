import React, { useState } from "react";

export default function BackupSettings() {
  const [backupStatus, setBackupStatus] = useState('idle'); // 'idle', 'loading', 'completed', 'uptodate'
  const [lastBackup, setLastBackup] = useState('Today at 2:30 PM');

  const handleBackupNow = () => {
    if (backupStatus === 'loading') return;
    
    setBackupStatus('loading');
    
    // Simulate backup process
    setTimeout(() => {
      // Randomly show either completed or already up to date
      const isUpToDate = Math.random() > 0.5;
      setBackupStatus(isUpToDate ? 'uptodate' : 'completed');
      
      if (!isUpToDate) {
        setLastBackup(new Date().toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }));
      }
      
      // Reset to idle after 3 seconds
      setTimeout(() => {
        setBackupStatus('idle');
      }, 3000);
    }, 2000);
  };

  const getButtonContent = () => {
    switch (backupStatus) {
      case 'loading':
        return (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Backing up...
          </div>
        );
      case 'completed':
        return (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Backup Completed
          </div>
        );
      case 'uptodate':
        return (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Already Up to Date
          </div>
        );
      default:
        return 'Backup Now';
    }
  };

  const getButtonStyles = () => {
    switch (backupStatus) {
      case 'loading':
        return 'px-4 py-2 bg-blue-500 text-white rounded-lg cursor-not-allowed transition-all duration-300';
      case 'completed':
        return 'px-4 py-2 bg-green-600 text-white rounded-lg transition-all duration-300 transform scale-105';
      case 'uptodate':
        return 'px-4 py-2 bg-gray-600 text-white rounded-lg transition-all duration-300';
      default:
        return 'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Backup & Sync</h2>
      <div className="space-y-6">
        <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Cloud Backup</h3>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Last backup: {lastBackup}
                {backupStatus === 'completed' && (
                  <span className="ml-2 text-green-600 dark:text-green-400 animate-pulse">● Just now</span>
                )}
              </p>
            </div>
            <button 
              className={getButtonStyles()}
              onClick={handleBackupNow}
              disabled={backupStatus === 'loading'}
            >
              {getButtonContent()}
            </button>
          </div>
        </div>
        
        {/* Status message with animation */}
        {(backupStatus === 'completed' || backupStatus === 'uptodate') && (
          <div className={`p-4 rounded-lg border transition-all duration-500 transform ${
            backupStatus === 'completed' 
              ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 animate-fade-in'
              : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 animate-fade-in'
          }`}>
            <div className="flex items-center gap-2">
              {backupStatus === 'completed' ? (
                <>
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-green-800 dark:text-green-300 font-medium">
                    Backup completed successfully!
                  </span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-800 dark:text-gray-300 font-medium">
                    Your data is already up to date!
                  </span>
                </>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Auto-backup</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Automatically backup data daily</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Backup frequency</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">How often to create automatic backups</p>
          </div>
          <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>
      </div>
    </div>
  );
}