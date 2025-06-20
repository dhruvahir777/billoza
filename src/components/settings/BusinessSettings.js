import React, { useState, useEffect } from "react";
import { FiDollarSign } from "react-icons/fi";

export default function BusinessSettings() {
  // Initialize with default values or load from localStorage if available
  const [gstRate, setGstRate] = useState(() => {
    const saved = localStorage.getItem('billoza_gst_rate');
    return saved ? parseFloat(saved) : 18;
  });
  
  const [discountPercent, setDiscountPercent] = useState(() => {
    const saved = localStorage.getItem('billoza_discount_percent');
    return saved ? parseFloat(saved) : 10;
  });
  
  const [currencyFormat, setCurrencyFormat] = useState(() => {
    const saved = localStorage.getItem('billoza_currency_format');
    return saved || '$';
  });

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('billoza_gst_rate', gstRate.toString());
    localStorage.setItem('billoza_discount_percent', discountPercent.toString());
    localStorage.setItem('billoza_currency_format', currencyFormat);
  }, [gstRate, discountPercent, currencyFormat]);

  // Handle input changes
  const handleGstChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setGstRate(value);
    }
  };

  const handleDiscountChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setDiscountPercent(value);
    }
  };

  return (
    <div className="border-b border-neutral-200 dark:border-gray-700 pb-8">
      <div className="flex items-center space-x-3 mb-6">
        <FiDollarSign className="text-primary" size={24} />
        <h2 className="text-2xl font-semibold text-neutral-600 dark:text-white">Business Settings</h2>
      </div>
      
      {/* All settings in a single row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* GST Rate */}
        <div className="p-4 bg-neutral-100 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-medium text-neutral-600 dark:text-white mb-2">GST Rate</h3>
          <div className="flex items-center">
            <input
              type="number"
              min="0"
              max="100"
              value={gstRate}
              onChange={handleGstChange}
              className="w-20 px-3 py-2 border border-neutral-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-neutral-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <span className="ml-2 text-neutral-600 dark:text-white">%</span>
          </div>
        </div>
        
        {/* Default Discount */}
        <div className="p-4 bg-neutral-100 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-medium text-neutral-600 dark:text-white mb-2">Default Discount</h3>
          <div className="flex items-center">
            <input
              type="number"
              min="0"
              max="100"
              value={discountPercent}
              onChange={handleDiscountChange}
              className="w-20 px-3 py-2 border border-neutral-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-neutral-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <span className="ml-2 text-neutral-600 dark:text-white">%</span>
          </div>
        </div>
        
        {/* Currency Format */}
        <div className="p-4 bg-neutral-100 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-medium text-neutral-600 dark:text-white mb-2">Currency Format</h3>
          <div className="flex gap-3">
            <button
              onClick={() => setCurrencyFormat('$')}
              className={`flex items-center justify-center p-2 rounded-lg border-2 transition-all w-16 ${
                currencyFormat === '$'
                  ? "border-primary bg-primary-light/10 dark:bg-primary/30"
                  : "border-neutral-200 dark:border-gray-600 hover:border-neutral-300 dark:hover:border-gray-500"
              }`}
            >
              <span className="text-xl font-bold text-neutral-600 dark:text-white">$</span>
            </button>
            
            <button
              onClick={() => setCurrencyFormat('₹')}
              className={`flex items-center justify-center p-2 rounded-lg border-2 transition-all w-16 ${
                currencyFormat === '₹'
                  ? "border-primary bg-primary-light/10 dark:bg-primary/30"
                  : "border-neutral-200 dark:border-gray-600 hover:border-neutral-300 dark:hover:border-gray-500"
              }`}
            >
              <span className="text-xl font-bold text-neutral-600 dark:text-white">₹</span>
            </button>
          </div>
        </div>
      </div>
      
      <p className="text-xs text-neutral-400 dark:text-gray-400 ml-1">
        These settings will be applied across the entire application.
      </p>
    </div>
  );
}
