import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiArrowRight } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { loginWithGoogle, loginAsGuest } = useAuth();
  const navigate = useNavigate();

  // Initialize Google Sign-In
  useEffect(() => {
    // Handle Google OAuth Response
    const handleGoogleResponse = async (response) => {
      try {
        setIsLoading(true);
        setError('');
        
        // Decode the JWT token to get user information
        const userInfo = JSON.parse(atob(response.credential.split('.')[1]));
        
        const googleUser = {
          sub: userInfo.sub,
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture
        };
        
        await loginWithGoogle(googleUser);
        navigate('/order');
      } catch (err) {
        setError('Google login failed. Please try again.');
        console.error('Google login error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    // Load Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.google) {
        try {
          // Initialize Google Identity Services (no button rendering)
          window.google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse,
            auto_select: false,
            cancel_on_tap_outside: false,
          });
        } catch (error) {
          console.error('Google OAuth initialization error:', error);
          setError('Google authentication setup incomplete.');
        }
      }
    };

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [loginWithGoogle, navigate]);

  // Handle Custom Google Login Button Click
  const handleCustomGoogleLogin = () => {
    if (window.google) {
      // Try to prompt for account selection
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // If prompt fails, try alternative method
          console.log('Prompt not displayed, trying alternative method');
          
          // Create temporary button and click it programmatically
          const tempDiv = document.createElement('div');
          tempDiv.style.position = 'absolute';
          tempDiv.style.top = '-9999px';
          tempDiv.style.left = '-9999px';
          document.body.appendChild(tempDiv);
          
          try {
            window.google.accounts.id.renderButton(tempDiv, {
              theme: 'outline',
              size: 'large',
              text: 'continue_with',
              shape: 'rectangular',
            });
            
            // Simulate click on the hidden button
            setTimeout(() => {
              const hiddenButton = tempDiv.querySelector('div[role="button"]');
              if (hiddenButton) {
                hiddenButton.click();
              }
              // Clean up
              if (document.body.contains(tempDiv)) {
                document.body.removeChild(tempDiv);
              }
            }, 100);
          } catch (error) {
            console.error('Fallback method failed:', error);
            setError('Google Sign-In failed. Please try refreshing the page.');
            // Clean up
            if (document.body.contains(tempDiv)) {
              document.body.removeChild(tempDiv);
            }
          }
        }
      });
    } else {
      setError('Google Sign-In not loaded. Please refresh the page.');
    }
  };

  // Handle Guest Login
  const handleGuestLogin = () => {
    loginAsGuest();
    navigate('/order');
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
                <div className="mx-auto h-16 w-16 bg-white -500 rounded-full flex items-center justify-center mb-4">
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