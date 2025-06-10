import React, { useState } from 'react'
import MenuHeading from '../../components/menu/menuheading'
import MenuTable from '../../components/menu/menutable'
import menuDataJson from '../../constants/menu.json'

export default function Menu() {
  const [menuData, setMenuData] = useState(menuDataJson);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // Add editing state

  const handleOpenModal = () => {
    setEditingItem(null); // Clear editing state for new item
    setIsModalOpen(true);
  };

  const handleEditItem = (item, index) => {
    setEditingItem({ item, index }); // Set item to edit
    setIsModalOpen(true);
  };
  
  return (
    <div className="relative min-h-screen px-5 bg-gray-50 dark:bg-gray-900">
      {/* Fixed Header with Glass Morphism Effect - Responsive to sidebar state */}
      <div className="fixed top-0 left-52 right-0 p-6 pb-4 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-md border-b-2 border-gray-300 dark:border-gray-600 z-40 transition-all duration-300 sidebar-responsive-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">Menu Management</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your restaurant menu items and categories</p>
          </div>
          <button
            onClick={handleOpenModal}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Item
          </button>
        </div>
      </div>

      {/* Content with top padding to account for fixed header */}
      <div className="pt-32">
        <MenuHeading 
          menuData={menuData} 
          setMenuData={setMenuData}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          editingItem={editingItem}
          setEditingItem={setEditingItem}
        />
        <MenuTable 
          menuData={menuData}
          setMenuData={setMenuData}
          onEditItem={handleEditItem}
        />
      </div>
    </div>
  )
}
