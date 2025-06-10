// MenuTable.js
import React, { useState } from 'react';
import NewTable from "../common/tables/NewTable";
import FancyDropdown from "../common/ui/Dropdown";

const columns = [
  { key: "itemName", label: "Item Name" },
  { key: "price", label: "Price" },
  { key: "type", label: "Type" },
  { key: "addedDate", label: "Added Date" },
  { key: "action", label: "Action" },
];

export default function MenuTable({ menuData, setMenuData, onEditItem }) {
  const [typeFilter, setTypeFilter] = useState('All');
  const [openDropdown, setOpenDropdown] = useState(null);

  // Get unique types for dropdown
  const types = Array.from(new Set(menuData.map(row => row.type)));
  
  const typeOptions = [
    { value: 'All', label: 'All Types' },
    ...types.map(type => ({ value: type, label: type }))
  ];

  // Handle edit action
  const handleEdit = (item, index) => {
    onEditItem(item, index);
    setOpenDropdown(null);
  };

  // Handle delete action
  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updatedData = menuData.filter((_, i) => i !== index);
      setMenuData(updatedData);
    }
    setOpenDropdown(null);
  };

  // Action dropdown component
  const ActionDropdown = ({ item, index }) => {
    const isOpen = openDropdown === index;
    
    return (
      <div className="relative">
        <button 
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group"
          onClick={() => setOpenDropdown(isOpen ? null : index)}
        >
          <svg 
            width="16" 
            height="16" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" 
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="1.5"/>
            <circle cx="19.5" cy="12" r="1.5"/>
            <circle cx="4.5" cy="12" r="1.5"/>
          </svg>
        </button>
        
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setOpenDropdown(null)}
            />
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 top-8 z-20 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1">
              <button
                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                onClick={() => handleEdit(item, index)}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                </svg>
                <span>Edit</span>
              </button>
              <button
                className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                onClick={() => handleDelete(index)}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="m3 6 3 0"/>
                  <path d="m19 6-3 0"/>
                  <path d="m8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  <path d="m10 11 0 6"/>
                  <path d="m14 11 0 6"/>
                  <path d="M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14"/>
                </svg>
                <span>Delete</span>
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  // Prepare data for the table
  const tableData = menuData
    .filter(row => typeFilter === 'All' || row.type === typeFilter)
    .map((row, index) => ({
      ...row,
      action: <ActionDropdown item={row} index={index} />,
    }));

  // Only the type filter dropdown - no Add button
  const typeDropdown = (
    <div className="relative z-50">
      <FancyDropdown
        options={typeOptions}
        value={typeFilter}
        onChange={setTypeFilter}
        placeholder="Filter by Type"
      />
    </div>
  );

  return (
    <div className="relative">
      <NewTable
        columns={columns}
        data={tableData}
        searchPlaceholder="Search menu items..."
        rightContent={typeDropdown}
      />
    </div>
  );
}
