import React, { useState, useEffect } from 'react'
import MenuHeading from '../../components/menu/menuheading'
import MenuTable from '../../components/menu/menutable'
import menuDataJson from '../../constants/menu.json'
import { useAuth } from '../../contexts/AuthContext'

export default function Menu() {
  const { user } = useAuth();
  const [menuData, setMenuData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Load data based on user type
  useEffect(() => {
    if (user?.hasStaticData) {
      // Guest user gets static data
      setMenuData(menuDataJson);
    } else {
      // New users start with empty menu
      setMenuData([]);
    }
  }, [user]);

  const handleOpenModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (item, index) => {
    setEditingItem({ item, index });
    setIsModalOpen(true);
  };
  
  return (
    <div className="relative min-h-screen px-5 bg-gray-50 dark:bg-gray-900">
      {/* Fixed Header with Glass Morphism Effect - Responsive to sidebar state */}
      <div className="fixed top-0 left-52 right-0 p-6 pb-4 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-md border-b-2 border-gray-300 dark:border-gray-600 z-40 transition-all duration-300 sidebar-responsive-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">Menu Management</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {user?.hasStaticData 
                ? "Explore sample menu items (Guest Mode)" 
                : "Manage your restaurant menu items and categories"
              }
            </p>
          </div>
          <button
            onClick={handleOpenModal}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Item2
          </button>
        </div>
      </div>

      {/* Content with top padding to account for fixed header */}
      <div className="pt-32">
        {menuData.length === 0 && !user?.hasStaticData ? (
          <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-1 p-10 text-center text-text-light dark:text-text-dark mt-6 border border-border-light dark:border-border-dark">
            <h3 className="text-xl font-semibold mb-4">Welcome to Your Menu!</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You don't have any menu items yet. Start by adding your first dish!
            </p>
            <button
              onClick={handleOpenModal}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl"
            >
              Add Your First Item
            </button>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  )
}
