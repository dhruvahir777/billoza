import React, { useState, useEffect } from 'react';
import menuData from '../../constants/menu.json';
import { FiTrash2 } from 'react-icons/fi';
import { FiPlus, FiMinus, FiSearch } from 'react-icons/fi';
import { GiMeal, GiFullPizza, GiWineGlass, GiHotMeal, GiFoodTruck } from 'react-icons/gi';
import FancyDropdown from '../common/ui/Dropdown';
import FoodCard from '../common/cards/FoodCard';

// Helper to parse price string like '₹250' to number 250
const parsePrice = (priceStr) => Number(priceStr.replace(/[^\d.]/g, ''));

function CreateOrder() {
  // Unique categories from menu
  const categories = ['All', ...Array.from(new Set(menuData.map(i => i.type)))];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [orderItems, setOrderItems] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTable, setSelectedTable] = useState('');
  const tableOptions = Array.from({ length: 10 }, (_, i) => ({ value: `Table ${i + 1}`, label: `Table ${i + 1}` }));

  // Cleaned search value
  const searchValue = search.trim().toLowerCase();

  // Filtered menu items with search
  const filteredMenu = (selectedCategory === 'All' ? menuData : menuData.filter(i => i.type === selectedCategory))
    .filter(i => {
      const name = (i.itemName || '').toString().toLowerCase();
      const price = (i.price || '').replace(/[^\d]/g, '');
      const type = (i.type || '').toString().toLowerCase();
      if (!searchValue) return true;
      if (/^\d+$/.test(searchValue)) {
        return price.includes(searchValue);
      }
      return name.includes(searchValue) || type.includes(searchValue);
    });

  // Clear search on category change
  useEffect(() => { setSearch(''); }, [selectedCategory]);

  // Add item to order
  const addItem = (item) => {
    setOrderItems((prev) => {
      const found = prev.find((i) => i.itemName === item.itemName);
      if (found) {
        return prev.map((i) =>
          i.itemName === item.itemName ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  // Remove item from order
  const removeItem = (itemName) => {
    setOrderItems((prev) => prev.filter((i) => i.itemName !== itemName));
  };

  // Update quantity
  const updateQty = (itemName, qty) => {
    setOrderItems((prev) =>
      prev.map((i) => (i.itemName === itemName ? { ...i, qty: Math.max(1, qty) } : i))
    );
  };

  // Bill calculation
  const subtotal = orderItems.reduce((sum, i) => sum + parsePrice(i.price) * i.qty, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  // Category icon mapping
  const categoryIcons = {
    All: <GiMeal className="inline-block mr-1 mb-0.5" size={18} />,
    Main: <GiFullPizza className="inline-block mr-1 mb-0.5" size={18} />,
    Drink: <GiWineGlass className="inline-block mr-1 mb-0.5" size={18} />,
    Starter: <GiHotMeal className="inline-block mr-1 mb-0.5" size={18} />,
    Combo: <GiFoodTruck className="inline-block mr-1 mb-0.5" size={18} />,
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full h-screen bg-gradient-to-br from-background-light to-surface-light dark:from-background-dark dark:to-surface-dark p-6 overflow-hidden" style={{ fontFamily: 'Poppins, Roboto, sans-serif' }}>
      {/* Left: Menu Items */}
      <div className="flex-1 flex flex-col bg-surface-light/70 dark:bg-surface-dark/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-border-light/10 dark:border-border-dark/10 p-6 h-full overflow-hidden">
        {/* Searchbar for menu items (above filters) */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3 items-center justify-between flex-shrink-0">
          <div className="relative w-full">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, price, or type..."
              className="w-full pl-12 pr-12 py-3 rounded-full border border-border-light/20 dark:border-border-dark/20 bg-surface-light/10 dark:bg-surface-dark/10 text-text-light dark:text-text-dark text-base focus:outline-none focus:ring-2 focus:ring-accent/40 placeholder:text-gray-400 shadow-inner backdrop-blur-md"
              style={{ fontFamily: 'Poppins, Roboto, sans-serif' }}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-accent">
              <FiSearch size={20} />
            </span>
            {search && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400"
                onClick={() => setSearch('')}
                title="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mb-6 flex-shrink-0">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-5 py-2 rounded-full border text-sm font-semibold transition-all flex items-center shadow-md backdrop-blur-md
                ${selectedCategory === cat
                  ? 'bg-gradient-to-r from-accent to-primary text-white border-accent/60 shadow-lg'
                  : 'bg-surface-light/10 dark:bg-surface-dark/10 text-text-light dark:text-text-dark border-border-light/20 dark:border-border-dark/20 hover:bg-accent/10 hover:text-accent'}
                `}
              onClick={() => setSelectedCategory(cat)}
              style={{ fontFamily: 'Poppins, Roboto, sans-serif' }}
            >
              {categoryIcons[cat] || null}
              <span>{cat}</span>
            </button>
          ))}
        </div>
        {/* Card grid fills remaining height, scrolls if overflow */}
        <div className="flex-1 overflow-y-auto scrollbar-dot">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-4">
            {filteredMenu.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 py-10 text-lg">No items found.</div>
            ) : (
              filteredMenu.map((item) => (
                <FoodCard
                  key={item.itemName}
                  name={item.itemName}
                  category={item.type}
                  price={parsePrice(item.price)}
                  onAdd={() => addItem(item)}
                  imageUrl="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
                />
              ))
            )}
          </div>
        </div>
      </div>
      
      {/* Right: Order & Bill (glassmorphism card) */}
      <div className="flex flex-col bg-surface-light/70 dark:bg-surface-dark/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-border-light/10 dark:border-border-dark/10 p-6 h-full overflow-hidden w-full md:w-[400px]">
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <h3 className="text-2xl font-bold text-text-light dark:text-text-dark tracking-wide">Order Items</h3>
          <div className="w-48">
            <FancyDropdown
              label=""
              options={tableOptions}
              value={selectedTable}
              onChange={setSelectedTable}
              placeholder="Select Table"
            />
          </div>
        </div>
        
        {/* Order items list - takes remaining height */}
        <div className="flex-1 overflow-y-auto mb-6 scrollbar-dot">
          {orderItems.length === 0 ? (
            <div className="text-gray-400 text-center mt-10">No items added.</div>
          ) : (
            <div className="flex flex-col">
              {/* Table Header */}
              <div className="flex text-sm font-bold text-text-light dark:text-text-dark bg-gradient-to-r from-accent/20 to-primary/20 backdrop-blur-md rounded-xl px-4 py-3 mb-4 border border-accent/30 shadow-lg">
                <div className="flex-1">Item Name</div>
                <div className="w-24 text-center">Quantity</div>
                <div className="w-20 text-right">Total</div>
                <div className="w-8"></div>
              </div>
              
              {/* Order Items */}
              <div className="space-y-0">
                {orderItems.map((item, index) => (
                  <div key={item.itemName} className="flex items-center px-4 py-3 border-b border-dashed border-border-light/50 dark:border-border-dark/50 hover:bg-surface-light/5 dark:hover:bg-surface-dark/5 transition-all duration-200">
                    <div className="flex-1 font-medium text-text-light dark:text-text-dark">{item.itemName}</div>
                    <div className="w-24 flex items-center justify-center gap-1">
                      <button
                        className="p-1 rounded-lg bg-surface-light/10 dark:bg-surface-dark/10 hover:bg-accent/20 text-accent transition-colors"
                        onClick={() => updateQty(item.itemName, item.qty - 1)}
                        disabled={item.qty <= 1}
                      >
                        <FiMinus size={14} />
                      </button>
                      <span className="px-3 py-1 min-w-[32px] text-center text-text-light dark:text-text-dark bg-surface-light/10 dark:bg-surface-dark/10 rounded-lg">{item.qty}</span>
                      <button
                        className="p-1 rounded-lg bg-surface-light/10 dark:bg-surface-dark/10 hover:bg-accent/20 text-accent transition-colors"
                        onClick={() => updateQty(item.itemName, item.qty + 1)}
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>
                    <div className="w-20 text-right text-accent">₹{(parsePrice(item.price) * item.qty).toFixed(2)}</div>
                    <div className="w-8 flex justify-end">
                      <button
                        className="p-2 rounded-lg hover:bg-red-400/20 text-red-400 transition-colors"
                        onClick={() => removeItem(item.itemName)}
                        title="Remove"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Bill summary - fixed at bottom */}
        <div className="bg-surface-light/10 dark:bg-surface-dark/10 backdrop-blur rounded-2xl p-4 mb-4 border border-border-light/10 dark:border-border-dark/10 flex-shrink-0">
          <div className="flex justify-between mb-1 text-text-light/70 dark:text-text-dark/70 text-sm">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-1 text-text-light/70 dark:text-text-dark/70 text-sm">
            <span>GST (5%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-text-light dark:text-text-dark mt-2">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
        <button className="w-full py-3 bg-gradient-to-r from-accent to-primary text-white rounded-2xl font-semibold text-lg shadow-lg hover:from-accent/80 hover:to-primary/80 focus:outline-none focus:ring-2 focus:ring-accent/60 transition-all flex-shrink-0">
          Place Order
        </button>
      </div>
    </div>
  );
}

export default CreateOrder;