import React from 'react';
import OrderHistoryDisplay from '../../components/history/historydisplay';

export default function Customer() {
  return (
    <div className="relative min-h-screen px-5 bg-gray-50 dark:bg-gray-900">
      {/* Fixed Header with Glass Morphism Effect - Responsive to sidebar state */}
      <div className="fixed top-0 left-52 right-0 p-6 pb-4 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-md border-b-2 border-gray-300 dark:border-gray-600 z-40 transition-all duration-300 sidebar-responsive-header">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">Order Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400">Comprehensive insights and analytics from your order history.</p>
      </div>

      {/* Content with top padding to account for fixed header */}
      <div className="pt-32">
        <div className="mt-2">
          <OrderHistoryDisplay />
        </div>
      </div>
    </div>
  );
}
