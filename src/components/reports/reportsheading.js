import React, { useState } from "react";
import FancyDropdown from "../common/ui/Dropdown";

export default function ReportsHeading({ isModalOpen, setIsModalOpen }) {
  const [reportType, setReportType] = useState("");
  const [dateRange, setDateRange] = useState("");

  const handleCloseModal = () => setIsModalOpen(false);

  const reportTypeOptions = [
    { value: "sales", label: "Sales Report" },
    { value: "menu", label: "Menu Performance" },
    { value: "daily", label: "Daily Summary" },
    { value: "monthly", label: "Monthly Summary" },
  ];

  const dateRangeOptions = [
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "custom", label: "Custom Range" },
  ];

  return (
    <>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-xl border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
              Generate New Report
            </h3>
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Generating report:", { reportType, dateRange });
                setReportType("");
                setDateRange("");
                setIsModalOpen(false);
              }}
            >
              <div>
                <FancyDropdown
                  label="Report Type"
                  options={reportTypeOptions}
                  value={reportType}
                  onChange={setReportType}
                  placeholder="Select Report Type"
                />
              </div>
              <div>
                <FancyDropdown
                  label="Date Range"
                  options={dateRangeOptions}
                  value={dateRange}
                  onChange={setDateRange}
                  placeholder="Select Date Range"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                <button
                  onClick={handleCloseModal}
                  type="button"
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Generate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}