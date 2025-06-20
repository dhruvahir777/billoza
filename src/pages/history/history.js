import React from 'react';
import OrderHistoryDisplay from '../../components/history/historydisplay';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function Customer() {
  const { user } = useAuth();
  // Use the global theme context
  const { theme } = useTheme();

  return (
    <div className="relative min-h-screen bg-neutral-100 dark:bg-gray-900">
      {/* Fixed Header with Glass Morphism Effect - Responsive to sidebar state */}
      <div className="fixed top-0 left-52 right-0 p-6 pb-4 bg-neutral-100/80 dark:bg-gray-900/80 backdrop-blur-md border-b-2 border-neutral-200 dark:border-gray-600 z-40 transition-all duration-300 sidebar-responsive-header">
        <h1 className="text-3xl font-semibold text-neutral-600 dark:text-white mb-2">Order Analytics</h1>
        <p className="text-neutral-400 dark:text-gray-400">
          {user?.hasStaticData 
            ? "Explore sample order history and analytics (Guest Mode)" 
            : "Comprehensive insights and analytics from your order history."
          }
        </p>
      </div>

      {/* Content with top padding to account for fixed header */}
      <div className="pt-32 px-6">
        <div className="mt-2">
          {!user?.hasStaticData ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-neutral-200 dark:border-gray-700 p-10 text-center text-neutral-600 dark:text-white mt-6">
              <h3 className="text-xl font-semibold mb-4">No Order History Yet</h3>
              <p className="text-neutral-400 dark:text-gray-400 mb-6">
                Start taking orders to see analytics and history here. Your order data will appear once you begin using the system.
              </p>
            </div>
          ) : (
            <OrderHistoryDisplay />
          )}
        </div>
      </div>
    </div>
  );
}
