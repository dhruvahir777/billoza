import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function SidebarProfile({ isMinimized }) {
  const { user, logout, userType } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div
      className={`mt-auto p-3 font-poppins ${
        isMinimized ? "text-center" : "flex items-center"
      } bg-transparent`}
    >
      {isMinimized ? (
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 bg-cyan-700 text-white rounded-full flex items-center justify-center font-bold mb-1">
            {user?.name?.charAt(0) || "U"}
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-400 transition-colors"
            title="Logout"
          >
            <FiLogOut size={14} />
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-cyan-700 text-white rounded-full flex items-center justify-center font-bold mr-3">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium text-text-light dark:text-text-dark">
                {user?.name || "Guest User"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.email || "guest@billoza.com"}
              </p>
              {userType && (
                <span className={`text-xs px-1 py-0.5 rounded text-white ${
                  userType === 'guest' ? 'bg-orange-500' : 
                  userType === 'google' ? 'bg-blue-500' : 'bg-green-500'
                }`}>
                  {userType === 'guest' ? 'Guest' : 
                   userType === 'google' ? 'Google' : 'Email'}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-400 transition-colors p-2"
            title="Logout"
          >
            <FiLogOut size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
