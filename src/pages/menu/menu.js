import React, { useState, useEffect } from 'react'
import MenuHeading from '../../components/menu/menuheading'
import MenuTable from '../../components/menu/menutable'
import menuDataJson from '../../constants/menu.json'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'

export default function Menu() {
  const { user, getUserData, saveUserData } = useAuth();
  // Use the global theme context
  const { theme } = useTheme();
  const [menuData, setMenuData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Load data based on user type
  useEffect(() => {
    console.log('Menu useEffect triggered, user:', user); // Debug log
    if (user?.hasStaticData) {
      // Guest user gets static data
      console.log('Loading static data for guest user');
      setMenuData(menuDataJson);
    } else if (user) {
      // Google user gets their saved data
      console.log('Loading saved data for Google user, user ID:', user.id);
      const savedMenuData = getUserData('menuData');
      console.log('Retrieved saved menu data:', savedMenuData);
      setMenuData(savedMenuData || []);
    }
  }, [user, getUserData]);

  // Save data whenever menuData changes (for Google users only)
  useEffect(() => {
    if (user && !user.hasStaticData && menuData.length >= 0) {
      saveUserData('menuData', menuData);
    }
  }, [menuData, user, saveUserData]);

  const handleOpenModal = () => {
    console.log('Add Item button clicked'); // Debug log
    setEditingItem(null);
    setIsModalOpen(true);
    console.log('Modal state set to:', true); // Debug log
  };

  const handleEditItem = (item, index) => {
    console.log('Edit item clicked:', item); // Debug log
    setEditingItem({ item, index });
    setIsModalOpen(true);
  };

  // Debug useEffect to monitor modal state
  useEffect(() => {
    console.log('Modal state changed:', isModalOpen);
  }, [isModalOpen]);
  
  return (
    <div className="relative min-h-screen bg-neutral-100 dark:bg-gray-900">
      {/* Fixed Header with Glass Morphism Effect - Responsive to sidebar state */}
      <div className="fixed top-0 left-52 right-0 p-6 pb-4 bg-neutral-100/80 dark:bg-gray-900/80 backdrop-blur-md border-b-2 border-neutral-200 dark:border-gray-600 z-40 transition-all duration-300 sidebar-responsive-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-neutral-600 dark:text-white mb-2">Menu Management</h1>
            <p className="text-neutral-400 dark:text-gray-400">
              {user?.hasStaticData 
                ? "Explore sample menu items (Guest Mode)" 
                : `Manage your restaurant menu items and categories ${user?.name ? `- Welcome ${user.name}!` : ''}`
              }
            </p>
          </div>
          <button
            onClick={handleOpenModal}
            className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2"
          >
            Add Item
          </button>
        </div>
      </div>

      {/* Content with top padding to account for fixed header */}
      <div className="pt-32 px-6">
        {/* Always render MenuHeading so modal is available */}
        <MenuHeading 
          menuData={menuData} 
          setMenuData={setMenuData}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          editingItem={editingItem}
          setEditingItem={setEditingItem}
        />
        
        {menuData.length === 0 && !user?.hasStaticData ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-neutral-200 dark:border-gray-700 p-10 text-center text-neutral-600 dark:text-white mt-6">
            <h3 className="text-xl font-semibold mb-4">Welcome to Your Menu, {user?.name}!</h3>
            <p className="text-neutral-400 dark:text-gray-400 mb-6">
              You don't have any menu items yet. Start by adding your first dish!
            </p>
            <button
              onClick={handleOpenModal}
              className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl"
            >
              Add Your First Item
            </button>
          </div>
        ) : (
          <MenuTable 
            menuData={menuData}
            setMenuData={setMenuData}
            onEditItem={handleEditItem}
          />
        )}
      </div>
    </div>
  )
}
