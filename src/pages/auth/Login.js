import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FiUser, FiArrowRight } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
  const navigate = useNavigate();
  const { loginAsGuest, loginWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle Guest Login
  const handleGuestLogin = () => {
    setIsLoading(true);
    try {
      loginAsGuest();
      navigate('/');
    } catch (err) {
      setError('Failed to login as guest');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Custom Google Login
  const handleCustomGoogleLogin = () => {
    setIsLoading(true);
    try {
      // Simulate Google login for demo purposes
      const mockGoogleResponse = {
        sub: 'google_user_' + Date.now(),
        name: 'Google User',
        email: 'user@gmail.com',
        picture: 'https://via.placeholder.com/40'
      };
      loginWithGoogle(mockGoogleResponse);
      navigate('/');
    } catch (err) {
      setError('Failed to login with Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <img
              src={process.env.PUBLIC_URL + "/foodexlogo.png"}
              alt="Billoza Logo"
              className="h-8 w-8 object-contain filter brightness-0 invert"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome to Billoza
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Choose your preferred way to access the Restaurant Management System
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-6 max-w-md mx-auto">
            <p className="text-red-600 dark:text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Two Cards Layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Guest Login Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-8">
              {/* Guest Card Header */}
              <div className="text-center mb-6">
                <div className="mx-auto h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                  <FiUser size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Guest Access
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Explore with sample data and features
                </p>
              </div>

              {/* Guest Features */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm">Instant access with sample menu</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm">Try all features without signup</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm">Perfect for demo and testing</span>
                </div>
              </div>

              {/* Guest Login Button */}
              <button
                onClick={handleGuestLogin}
                disabled={isLoading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
              >
                <FiUser size={20} />
                <span className="text-lg">Continue as Guest</span>
                <FiArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Google Login Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-8">
              {/* Google Card Header */}
              <div className="text-center mb-6">
                <div className="mx-auto h-16 w-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
                  <FcGoogle size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Google Account
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Save your data and access from anywhere
                </p>
              </div>

              {/* Google Features */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm">Save your custom menu items</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm">Access data from any device</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm">Secure cloud synchronization</span>
                </div>
              </div>

              {/* Google Login Button - Custom Only */}
              <button
                onClick={handleCustomGoogleLogin}
                disabled={isLoading}
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <FcGoogle size={24} />
                    <span className="text-lg">Continue with Google</span>
                    <FiArrowRight size={20} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Choose <strong className="text-orange-500">Guest</strong> for quick demo or <strong className="text-blue-500">Google</strong> to save your data
          </p>
        </div>
      </div>
    </div>
  );
}