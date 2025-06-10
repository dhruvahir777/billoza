import React, { useState } from 'react';
import ReportsHeading from '../../components/reports/reportsheading';
import ReportsDisplay from '../../components/reports/reportsdisplay';

export default function Reports() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);

  return (
    <div className="relative min-h-screen px-5 bg-gray-50 dark:bg-gray-900">
      {/* Fixed Header with Glass Morphism Effect - Responsive to sidebar state */}
      <div className="fixed top-0 left-52 right-0 p-6 pb-4 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-md border-b-2 border-gray-300 dark:border-gray-600 z-40 transition-all duration-300 sidebar-responsive-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">
              Reports Analytics Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">View detailed reports and analytics for your restaurant</p>
          </div>
          <button
            onClick={handleOpenModal}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* Content with top padding to account for fixed header */}
      <div className="pt-32">
        <ReportsHeading 
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <div className="mt-2">
          <ReportsDisplay />
        </div>
      </div>
    </div>
  );
}