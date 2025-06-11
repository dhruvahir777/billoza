import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FiLogOut, FiUser, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function SidebarProfile({ isMinimized }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowProfileModal(false);
  };

  const handleProfileClick = () => {
    setShowProfileModal(true);
  };

  // Profile Modal Component
  const ProfileModal = () => {
    if (!showProfileModal) return null;

    return createPortal(
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-80 mx-4 shadow-2xl border border-gray-200 dark:border-gray-700 transform transition-all duration-200 scale-100">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <FiUser className="mr-2" size={20} />
              Profile
            </h3>
            <button
              onClick={() => setShowProfileModal(false)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <FiX size={20} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-cyan-700 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="flex-1 min-w-0 overflow-hidden">
                <h4 className="font-medium text-gray-900 dark:text-white text-lg overflow-hidden text-ellipsis whitespace-nowrap">
                  {user?.name || "Guest User"}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm overflow-hidden text-ellipsis whitespace-nowrap" title={user?.email || "guest@billoza.com"}>
                  {user?.email || "guest@billoza.com"}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowProfileModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              <FiLogOut className="mr-2" size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <div
        className={`mt-auto p-3 font-poppins ${
          isMinimized ? "text-center" : "flex items-center"
        } bg-transparent`}
      >
        {isMinimized ? (
          <div className="flex flex-col items-center">
            <button
              onClick={handleProfileClick}
              className="w-8 h-8 bg-cyan-700 text-white rounded-full flex items-center justify-center font-bold mb-1 hover:bg-cyan-600 transition-colors"
            >
              {user?.name?.charAt(0) || "U"}
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center w-full">
            <button
              onClick={handleProfileClick}
              className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors flex-1"
            >
              <div className="w-10 h-10 bg-cyan-700 text-white rounded-full flex items-center justify-center font-bold mr-3">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="flex flex-col text-left min-w-0 flex-1">
                <p className="text-sm font-medium text-text-light dark:text-text-dark overflow-hidden text-ellipsis whitespace-nowrap">
                  {user?.name || "Guest User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap" title={user?.email || "guest@billoza.com"}>
                  {user?.email || "guest@billoza.com"}
                </p>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Profile Modal - Rendered outside sidebar using Portal */}
      <ProfileModal />
    </>
  );
}
