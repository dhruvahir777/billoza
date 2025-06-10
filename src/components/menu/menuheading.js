import React, { useState, useEffect } from "react";

export default function MenuHeading({ menuData, setMenuData, isModalOpen, setIsModalOpen, editingItem, setEditingItem }) {
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  // Load data when editing
  useEffect(() => {
    if (editingItem) {
      setItemName(editingItem.item.itemName);
      setItemType(editingItem.item.type);
      setItemPrice(editingItem.item.price.replace('₹', ''));
    } else {
      setItemName("");
      setItemType("");
      setItemPrice("");
    }
  }, [editingItem]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setItemName("");
    setItemType("");
    setItemPrice("");
  };

  return (
    <>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md mx-4 shadow-xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              {editingItem ? "Edit Menu Item" : "Add New Item"}
            </h3>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                
                const updatedItem = {
                  "itemName": itemName,
                  "type": itemType,
                  "price": `₹${itemPrice}`,
                  "addedDate": editingItem ? editingItem.item.addedDate : new Date().toISOString().slice(0, 10),
                };

                if (editingItem) {
                  // Edit existing item
                  const updatedMenuData = [...menuData];
                  updatedMenuData[editingItem.index] = updatedItem;
                  setMenuData(updatedMenuData);
                } else {
                  // Add new item
                  setMenuData([...menuData, updatedItem]);
                }

                handleCloseModal();
              }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Item Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Item Name"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type
                </label>
                <select
                  value={itemType}
                  onChange={(e) => setItemType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Starter">Starter</option>
                  <option value="Main">Main</option>
                  <option value="Drink">Drink</option>
                  <option value="Combo">Combo</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Item Price (in ₹)
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="Enter Item Price"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="flex justify-end gap-3 mt-6 pt-4">
                <button
                  onClick={handleCloseModal}
                  type="button"
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  {editingItem ? "Save Changes" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
