import React, { useState } from "react";
import FancyDropdown from "../common/ui/Dropdown";
import { BsBarChartFill, BsCurrencyDollar } from "react-icons/bs";
import { FiDownload, FiTrendingUp, FiTrendingDown, FiPieChart, FiTarget, FiX } from "react-icons/fi";

// Sample menu performance data
const menuPerformanceData = [
  { item: "Veg Biryani", sales: 156, revenue: 23400, percentage: 25 },
  { item: "Chicken Curry", sales: 142, revenue: 21300, percentage: 22 },
  { item: "Dal Tadka", sales: 98, revenue: 14700, percentage: 18 },
  { item: "Paneer Butter", sales: 89, revenue: 13350, percentage: 15 },
  { item: "Naan", sales: 76, revenue: 7600, percentage: 12 },
  { item: "Others", sales: 45, revenue: 6750, percentage: 8 }
];

// Monthly revenue data
const monthlyRevenueData = [
  { month: "Jan", revenue: 125000, orders: 450 },
  { month: "Feb", revenue: 138000, orders: 510 },
  { month: "Mar", revenue: 142000, orders: 520 },
  { month: "Apr", revenue: 155000, orders: 580 },
  { month: "May", revenue: 168000, orders: 620 },
  { month: "Jun", revenue: 145000, orders: 540 }
];

// Daily revenue data by day of week
const dailyRevenueData = [
  { day: "Sunday", revenue: 85000, orders: 320, percentage: 18 },
  { day: "Monday", revenue: 62000, orders: 245, percentage: 13 },
  { day: "Tuesday", revenue: 58000, orders: 230, percentage: 12 },
  { day: "Wednesday", revenue: 71000, orders: 280, percentage: 15 },
  { day: "Thursday", revenue: 78000, orders: 295, percentage: 17 },
  { day: "Friday", revenue: 92000, orders: 350, percentage: 20 },
  { day: "Saturday", revenue: 95000, orders: 365, percentage: 21 }
];

// Analytics cards data with year-based data
const getAnalyticsDataByYear = (year) => {
  const yearMultiplier = {
    2025: 1.0,
    2024: 0.85,
    2023: 0.72,
    2022: 0.65,
    2021: 0.58
  };
  
  const multiplier = yearMultiplier[year] || 0.5;
  
  return {
    totalRevenue: { 
      value: `₹${(568600 * multiplier).toLocaleString("en-IN")}`, 
      change: year === 2025 ? "+12.5%" : `${((multiplier - (yearMultiplier[year + 1] || 0.45)) * 100).toFixed(1)}%`, 
      isPositive: true 
    },
    totalOrders: { 
      value: Math.round(1248 * multiplier).toString(), 
      change: year === 2025 ? "+8.3%" : `${((multiplier - (yearMultiplier[year + 1] || 0.45)) * 100).toFixed(1)}%`, 
      isPositive: true 
    },
    avgOrderValue: { 
      value: `₹${Math.round(456 * multiplier).toLocaleString("en-IN")}`, 
      change: year === 2025 ? "+5.2%" : `${((multiplier - (yearMultiplier[year + 1] || 0.45)) * 100).toFixed(1)}%`, 
      isPositive: true 
    },
    totalCustomers: { 
      value: Math.round(892 * multiplier).toString(), 
      change: year === 2025 ? "+15.8%" : `${((multiplier - (yearMultiplier[year + 1] || 0.45)) * 100).toFixed(1)}%`, 
      isPositive: true 
    }
  };
};

export default function ReportsDisplay() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const currentYear = new Date().getFullYear();
  const analyticsData = getAnalyticsDataByYear(selectedYear);

  // Generate year options (current year and 4 years back)
  const yearOptions = [];
  for (let i = 0; i < 5; i++) {
    const year = currentYear - i;
    yearOptions.push({
      value: year,
      label: year.toString()
    });
  }

  const yearDropdown = (
    <FancyDropdown
      options={yearOptions}
      value={selectedYear}
      onChange={setSelectedYear}
      placeholder="Select Year"
    />
  );

  const handleReportDownload = (reportType) => {
    setIsGenerating(true);
    
    // Simulate PDF generation
    setTimeout(() => {
      setIsGenerating(false);
      setShowDownloadModal(false);
      
      // Create a dummy PDF download
      const link = document.createElement('a');
      link.href = '#';
      link.download = `${reportType.replace(/ /g, '_')}_${selectedYear}.pdf`;
      
      // Show success message
      alert(`${reportType} for ${selectedYear} has been generated successfully!`);
    }, 2000);
  };

  const reportTypes = [
    {
      id: "today",
      title: "Today's Report",
      description: "Current day sales and analytics",
      icon: "📅"
    },
    {
      id: "lastMonth",
      title: "Last Month Report", 
      description: "Previous month comprehensive analysis",
      icon: "📊"
    },
    {
      id: "yearReport",
      title: `${selectedYear} Year Report`,
      description: "Complete yearly analytics and insights",
      icon: "📈"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Filter Dropdown */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">Reports Analytics Dashboard</h2>
        {yearDropdown}
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow border border-border-light dark:border-border-dark">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Revenue ({selectedYear})</p>
              <p className="text-2xl font-bold text-text-light dark:text-text-dark">{analyticsData.totalRevenue.value}</p>
              <div className="flex items-center mt-2">
                <FiTrendingUp className="text-green-500 mr-1" size={16} />
                <span className="text-sm text-green-500">{analyticsData.totalRevenue.change}</span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <BsCurrencyDollar className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow border border-border-light dark:border-border-dark">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Orders ({selectedYear})</p>
              <p className="text-2xl font-bold text-text-light dark:text-text-dark">{analyticsData.totalOrders.value}</p>
              <div className="flex items-center mt-2">
                <FiTrendingUp className="text-green-500 mr-1" size={16} />
                <span className="text-sm text-green-500">{analyticsData.totalOrders.change}</span>
              </div>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <BsBarChartFill className="text-green-600 dark:text-green-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow border border-border-light dark:border-border-dark">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Order Value ({selectedYear})</p>
              <p className="text-2xl font-bold text-text-light dark:text-text-dark">{analyticsData.avgOrderValue.value}</p>
              <div className="flex items-center mt-2">
                {analyticsData.avgOrderValue.isPositive ? (
                  <FiTrendingUp className="text-green-500 mr-1" size={16} />
                ) : (
                  <FiTrendingDown className="text-red-500 mr-1" size={16} />
                )}
                <span className={`text-sm ${analyticsData.avgOrderValue.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {analyticsData.avgOrderValue.change}
                </span>
              </div>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <FiTarget className="text-orange-600 dark:text-orange-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow border border-border-light dark:border-border-dark">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Customers ({selectedYear})</p>
              <p className="text-2xl font-bold text-text-light dark:text-text-dark">{analyticsData.totalCustomers.value}</p>
              <div className="flex items-center mt-2">
                <FiTrendingUp className="text-green-500 mr-1" size={16} />
                <span className="text-sm text-green-500">{analyticsData.totalCustomers.change}</span>
              </div>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <FiPieChart className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow border border-border-light dark:border-border-dark">
          <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">Monthly Revenue Trend ({selectedYear})</h3>
          <div className="space-y-4">
            {monthlyRevenueData.map((month, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400 w-12">{month.month}</span>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${(month.revenue / Math.max(...monthlyRevenueData.map(m => m.revenue))) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-text-light dark:text-text-dark text-right w-20">₹{(month.revenue/1000).toFixed(0)}k</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Reports by Day of Week */}
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow border border-border-light dark:border-border-dark">
          <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">Daily Revenue by Day of Week ({selectedYear})</h3>
          <div className="space-y-4">
            {dailyRevenueData.map((dayData, index) => {
              const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'];
              
              return (
                <div key={dayData.day} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]} mr-3`}></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-20">{dayData.day}</span>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${colors[index % colors.length]} transition-all duration-500`}
                        style={{ width: `${dayData.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-text-light dark:text-text-dark">₹{(dayData.revenue/1000).toFixed(0)}k</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{dayData.orders} orders</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menu Performance Chart */}
      <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow border border-border-light dark:border-border-dark">
        <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">Top Menu Items Performance ({selectedYear})</h3>
        <div className="space-y-4">
          {menuPerformanceData.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center flex-1">
                <span className="text-sm font-medium text-text-light dark:text-text-dark w-32">{item.item}</span>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-text-light dark:text-text-dark">{item.sales} orders</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">₹{item.revenue.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Report Section */}
      <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow border border-border-light dark:border-border-dark">
        <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">Generate Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setShowDownloadModal(true)}
            className="flex items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            <FiDownload className="text-blue-600 dark:text-blue-400 mr-2" size={20} />
            <span className="text-blue-600 dark:text-blue-400 font-medium">Sales Report</span>
          </button>
          <button 
            onClick={() => setShowDownloadModal(true)}
            className="flex items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
          >
            <FiDownload className="text-green-600 dark:text-green-400 mr-2" size={20} />
            <span className="text-green-600 dark:text-green-400 font-medium">Menu Performance</span>
          </button>
          <button 
            onClick={() => setShowDownloadModal(true)}
            className="flex items-center justify-center p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
          >
            <FiDownload className="text-purple-600 dark:text-purple-400 mr-2" size={20} />
            <span className="text-purple-600 dark:text-purple-400 font-medium">Analytics Report</span>
          </button>
        </div>
      </div>

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl border border-border-light dark:border-border-dark">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-text-light dark:text-text-dark">Select Report Period</h3>
              <button 
                onClick={() => setShowDownloadModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              {reportTypes.map((report) => (
                <div
                  key={report.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                  onClick={() => handleReportDownload(report.title)}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{report.icon}</span>
                    <div>
                      <h4 className="font-medium text-text-light dark:text-text-dark">{report.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{report.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {isGenerating && (
              <div className="mt-6 text-center">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  <span className="text-blue-600 dark:text-blue-400">Generating PDF...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}