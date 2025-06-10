import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

/**
 * columns: [{ key: 'orderId', label: 'Order ID' }, ...]
 * data: [{ orderId: 'ORD123', ... }, ...]
 * searchPlaceholder: string (optional)
 * rightContent: React node (optional)
 */
export default function NewTable({ columns, data, searchPlaceholder = "Search...", rightContent }) {
  const [search, setSearch] = useState("");
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef(null);

  // Calculate perfect height based on available viewport space
  useEffect(() => {
    const calculateOptimalHeight = () => {
      if (!containerRef.current) return;

      const viewportHeight = window.innerHeight;
      const containerTop = containerRef.current.getBoundingClientRect().top;
      
      // Calculate available space from table position to bottom of screen
      // Leave some padding at bottom (20px)
      const availableHeight = viewportHeight - containerTop - 20;
      
      // Set minimum height for very small screens
      const optimalHeight = Math.max(300, availableHeight);
      
      setContainerHeight(optimalHeight);
    };

    // Initial calculation
    calculateOptimalHeight();
    
    // Recalculate on window resize and scroll
    const handleResize = () => calculateOptimalHeight();
    const handleScroll = () => calculateOptimalHeight();
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    // Also recalculate after a short delay to ensure all elements are rendered
    const timer = setTimeout(calculateOptimalHeight, 100);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Filtered data based on search
  const filteredData = data.filter((row) =>
    columns.some((col) =>
      String(row[col.key] ?? "")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  );

  return (
    <div 
      ref={containerRef}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
      style={{ 
        height: containerHeight > 0 ? `${containerHeight}px` : 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header Section with Search - Fixed height */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 px-6 py-5 border-b border-gray-200 dark:border-gray-600 relative z-30 flex-shrink-0">
        <div className="flex items-center justify-between gap-4">
          {/* Search Input with Icon */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-700 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
            />
          </div>
          
          {/* Right Content */}
          {rightContent && (
            <div className="flex-shrink-0 relative z-40">
              {rightContent}
            </div>
          )}
        </div>
      </div>

      {/* Table Container - Flexible height */}
      <div 
        className="flex-1 overflow-hidden"
        style={{ minHeight: '200px' }}
      >
        <div 
          className="overflow-x-auto overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent h-full"
        >
          <table className="w-full min-w-[600px]">
            {/* Table Header */}
            <thead className="sticky top-0 z-10">
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600">
                {columns.map((col, idx) => (
                  <th
                    key={col.key}
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-center space-x-1">
                      <span>{col.label}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            
            {/* Table Body */}
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-12">
                    <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                        <Search className="w-8 h-8" />
                      </div>
                      <p className="text-lg font-medium">No data found</p>
                      <p className="text-sm mt-1">Try adjusting your search criteria</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData.map((row, idx) => (
                  <tr
                    key={columns.map((col) => row[col.key]).join("-") + idx}
                    className="group hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-all duration-200 ease-in-out"
                  >
                    {columns.map((col, colIdx) => (
                      <td
                        key={col.key}
                        className="px-6 py-4 whitespace-nowrap text-sm"
                      >
                        <div className="text-gray-900 dark:text-gray-100">
                          {typeof row[col.key] === 'string' && row[col.key].startsWith('₹') ? (
                            <span className="inline-flex items-center">
                              {row[col.key]}
                            </span>
                          ) : col.key === 'action' ? (
                            <div className="flex items-center space-x-2">
                              {row[col.key]}
                            </div>
                          ) : (
                            row[col.key]
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer - Fixed height when visible */}
      {filteredData.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 px-6 py-3 border-t border-gray-200 dark:border-gray-600 flex-shrink-0">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>
              Showing {filteredData.length} of {data.length} entries
            </span>
            {search && (
              <span className="text-blue-600 dark:text-blue-400">
                Filtered by: "{search}"
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
