import React from 'react';
import { FiX, FiPrinter, FiDownload } from 'react-icons/fi';

const InvoiceModal = ({ isOpen, onClose, orderData, tableNumber }) => {
  if (!isOpen) return null;

  const { orderItems, subtotal, tax, total } = orderData;
  const invoiceNumber = `INV-${Date.now()}`;
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create a simple text version for download
    const content = `
BILLOZA RESTAURANT
Invoice: ${invoiceNumber}
Date: ${currentDate} ${currentTime}
Table: ${tableNumber}

ITEMS:
${orderItems.map(item => `${item.itemName} x${item.qty} - ₹${(parsePrice(item.price) * item.qty).toFixed(2)}`).join('\n')}

Subtotal: ₹${subtotal.toFixed(2)}
GST (5%): ₹${tax.toFixed(2)}
Total: ₹${total.toFixed(2)}

Thank you for dining with us!
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invoiceNumber}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const parsePrice = (priceStr) => Number(priceStr.replace(/[^\d.]/g, ''));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-neutral-600 dark:text-white">Invoice</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-neutral-100 dark:bg-gray-700 hover:bg-primary-light/20 dark:hover:bg-primary/20 text-primary dark:text-primary-light transition-colors"
              title="Print Invoice"
            >
              <FiPrinter size={20} />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 rounded-lg bg-neutral-100 dark:bg-gray-700 hover:bg-primary-light/20 dark:hover:bg-primary/20 text-primary dark:text-primary-light transition-colors"
              title="Download Invoice"
            >
              <FiDownload size={20} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-neutral-100 dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-400/20 text-red-500 dark:text-red-400 transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Invoice Content */}
        <div className="p-6">
          {/* Restaurant Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary dark:text-primary-light mb-2">BILLOZA RESTAURANT</h1>
            <p className="text-neutral-500 dark:text-gray-400">Professional Restaurant Billing System</p>
          </div>

          {/* Invoice Details */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-semibold text-neutral-600 dark:text-white mb-2">Invoice Details</h3>
              <p className="text-sm text-neutral-500 dark:text-gray-400">Invoice No: {invoiceNumber}</p>
              <p className="text-sm text-neutral-500 dark:text-gray-400">Date: {currentDate}</p>
              <p className="text-sm text-neutral-500 dark:text-gray-400">Time: {currentTime}</p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-600 dark:text-white mb-2">Table Information</h3>
              <p className="text-sm text-neutral-500 dark:text-gray-400">Table: {tableNumber || 'Not Selected'}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-8">
            <h3 className="font-semibold text-neutral-600 dark:text-white mb-4">Order Items</h3>
            <div className="bg-neutral-50 dark:bg-gray-700 rounded-2xl p-4">
              <div className="flex text-sm font-bold text-neutral-600 dark:text-white bg-neutral-100 dark:bg-gray-600 rounded-xl px-4 py-3 mb-4">
                <div className="flex-1">Item Name</div>
                <div className="w-20 text-center">Qty</div>
                <div className="w-24 text-right">Price</div>
                <div className="w-24 text-right">Total</div>
              </div>
              
              {orderItems.map((item, index) => (
                <div key={index} className="flex items-center px-4 py-3 border-b border-dashed border-neutral-200 dark:border-gray-600 last:border-b-0">
                  <div className="flex-1 text-neutral-600 dark:text-white">{item.itemName}</div>
                  <div className="w-20 text-center text-neutral-500 dark:text-gray-400">{item.qty}</div>
                  <div className="w-24 text-right text-neutral-500 dark:text-gray-400">₹{parsePrice(item.price).toFixed(2)}</div>
                  <div className="w-24 text-right text-primary dark:text-primary-light font-semibold">₹{(parsePrice(item.price) * item.qty).toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bill Summary */}
          <div className="bg-primary-light/10 dark:bg-primary/20 rounded-2xl p-6">
            <div className="flex justify-between mb-3 text-neutral-600 dark:text-white">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-3 text-neutral-600 dark:text-white">
              <span>GST (5%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-primary/30 dark:border-primary-light/30 pt-3">
              <div className="flex justify-between text-xl font-bold text-primary dark:text-primary-light">
                <span>Total Amount</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-neutral-200 dark:border-gray-700">
            <p className="text-sm text-neutral-500 dark:text-gray-400">Thank you for dining with us!</p>
            <p className="text-xs text-neutral-400 dark:text-gray-500 mt-2">Powered by Billoza - Professional Restaurant Management</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;