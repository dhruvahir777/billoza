import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FiLogOut, FiUser, FiX, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { MdRestaurant } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function SidebarProfile({ isMinimized }) {
  const { user, logout, getUserProfile } = useAuth();
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

  // Get profile data for Google users
  const profileData = user && !user.hasStaticData ? getUserProfile() : null;

  // Profile Modal Component
  const ProfileModal = () => {
    if (!showProfileModal) return null;

    return createPortal(
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-96 mx-4 shadow-2xl border border-gray-200 dark:border-gray-700 transform transition-all duration-200 scale-100 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <FiUser className="mr-2" size={20} />
              Profile Information
            </h3>
            <button
              onClick={() => setShowProfileModal(false)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <FiX size={20} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="space-y-6 mb-6">
            {/* Profile Picture and Name */}
            <div className="flex items-center space-x-4 pb-4 border-b border-gray-200 dark:border-gray-600">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-cyan-700 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                {profileData?.profilePicture ? (
                  <img 
                    src={profileData.profilePicture} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{user?.name?.charAt(0) || "U"}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                  {user?.name || "Guest User"}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {user?.hasStaticData ? "Guest Account" : "Google Account"}
                </p>
              </div>
            </div>

            {/* Profile Details */}
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start space-x-3">
                <FiMail className="text-gray-500 dark:text-gray-400 mt-1" size={16} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</p>
                  <p className="text-gray-900 dark:text-white text-sm break-all">
                    {user?.email || "guest@billoza.com"}
                  </p>
                </div>
              </div>

              {/* Additional details for Google users with profile data */}
              {profileData && profileData.mobile && (
                <>
                  {/* Mobile */}
                  <div className="flex items-start space-x-3">
                    <FiPhone className="text-gray-500 dark:text-gray-400 mt-1" size={16} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Mobile</p>
                      <p className="text-gray-900 dark:text-white text-sm">
                        {profileData.mobile}
                      </p>
                    </div>
                  </div>

                  {/* Restaurant Name */}
                  {profileData.restaurantName && (
                    <div className="flex items-start space-x-3">
                      <MdRestaurant className="text-gray-500 dark:text-gray-400 mt-1" size={16} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Business</p>
                        <p className="text-gray-900 dark:text-white text-sm">
                          {profileData.restaurantName}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Address */}
                  {profileData.address && (
                    <div className="flex items-start space-x-3">
                      <FiMapPin className="text-gray-500 dark:text-gray-400 mt-1" size={16} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Address</p>
                        <p className="text-gray-900 dark:text-white text-sm">
                          {profileData.address}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Setup Date */}
                  {profileData.setupDate && (
                    <div className="flex items-start space-x-3">
                      <FiUser className="text-gray-500 dark:text-gray-400 mt-1" size={16} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Member Since</p>
                        <p className="text-gray-900 dark:text-white text-sm">
                          {new Date(profileData.setupDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Guest user note */}
              {user?.hasStaticData && (
                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg border border-blue-200 dark:border-blue-700">
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    You're using guest access with sample data. Sign in with Google to save your custom data.
                  </p>
                </div>
              )}

              {/* New Google user note */}
              {user && !user.hasStaticData && (!profileData || !profileData.mobile) && (
                <div className="bg-orange-50 dark:bg-orange-900/30 p-3 rounded-lg border border-orange-200 dark:border-orange-700">
                  <p className="text-orange-800 dark:text-orange-200 text-sm">
                    Complete your profile setup to get the most out of Billoza.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowProfileModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-medium"
            >
              Close
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
              className="w-8 h-8 rounded-full overflow-hidden bg-cyan-700 text-white flex items-center justify-center font-bold mb-1 hover:bg-cyan-600 transition-colors"
            >
              {profileData?.profilePicture ? (
                <img 
                  src={profileData.profilePicture} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{user?.name?.charAt(0) || "U"}</span>
              )}
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center w-full max-w-full">
            <button
              onClick={handleProfileClick}
              className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors flex-1 w-full max-w-full"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden bg-cyan-700 text-white flex items-center justify-center font-bold mr-3 flex-shrink-0">
                {profileData?.profilePicture ? (
                  <img 
                    src={profileData.profilePicture} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{user?.name?.charAt(0) || "U"}</span>
                )}
              </div>
              <div className="flex flex-col text-left min-w-0 overflow-hidden flex-1 w-full max-w-full">
                <p className="text-sm font-medium text-text-light dark:text-text-dark truncate max-w-full" title={user?.name || "Guest User"}>
                  {user?.name || "Guest User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-full" title={user?.email || "guest@billoza.com"}>
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
