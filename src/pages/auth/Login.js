import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FiUser, FiArrowRight } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { useTheme } from '../../contexts/ThemeContext';

export default function Login() {
  const navigate = useNavigate();
  const { loginAsGuest, loginWithGoogle } = useAuth();
  // Use the global theme context
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle Google OAuth Response
  const handleGoogleResponse = useCallback(async (response) => {
    try {
      setIsLoading(true);
      setError('');
      
      console.log('Google OAuth response received:', response);
      
      // Decode the JWT token to get user information
      const userInfo = JSON.parse(atob(response.credential.split('.')[1]));
      
      console.log('Decoded user info:', userInfo);
      
      const googleUser = {
        sub: userInfo.sub,
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture
      };
      
      const loginResult = await loginWithGoogle(googleUser);
      
      // Check if profile setup is needed
      if (!loginResult.profileSetupComplete) {
        console.log('Profile setup required, redirecting to setup page');
        navigate('/profile-setup');
      } else {
        // Profile is complete, redirect to password verification
        console.log('Profile complete, redirecting to password verification');
        navigate('/password-verification');
      }
    } catch (err) {
      console.error('Google login error:', err);
      setError('Google login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [loginWithGoogle, navigate]);

  // Initialize Google Sign-In
  useEffect(() => {
    const initializeGoogleSignIn = () => {
      // Get Google Client ID from environment or fallback
      const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '1074356963495-76dk8mq4st771d55t68smmpc0p19l8b8.apps.googleusercontent.com';
      
      console.log('Environment check:', {
        NODE_ENV: process.env.NODE_ENV,
        hasClientId: !!process.env.REACT_APP_GOOGLE_CLIENT_ID,
        fallbackUsed: !process.env.REACT_APP_GOOGLE_CLIENT_ID
      });

      // Load Google Identity Services script
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = () => {
        if (window.google && googleClientId) {
          try {
            // Initialize Google Identity Services
            window.google.accounts.id.initialize({
              client_id: googleClientId,
              callback: handleGoogleResponse,
              auto_select: false,
              cancel_on_tap_outside: false,
            });
            console.log('Google OAuth initialized successfully with Client ID:', googleClientId.substring(0, 20) + '...');
          } catch (error) {
            console.error('Google OAuth initialization error:', error);
            setError('Google authentication setup failed');
          }
        } else {
          console.error('Google Client ID not available');
          setError('Google authentication not configured');
        }
      };

      script.onerror = () => {
        console.error('Failed to load Google Identity Services');
        setError('Failed to load Google authentication');
      };

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    };

    const cleanup = initializeGoogleSignIn();
    return cleanup;
  }, [handleGoogleResponse]);

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

  // Handle Google Login Button Click
  const handleGoogleLogin = () => {
    if (window.google) {
      try {
        // Prompt for account selection
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            console.log('Google prompt not displayed, showing alternative');
            // If prompt doesn't work, try rendering a temporary button
            const tempDiv = document.createElement('div');
            tempDiv.style.position = 'absolute';
            tempDiv.style.top = '-9999px';
            tempDiv.style.left = '-9999px';
            tempDiv.style.visibility = 'hidden';
            document.body.appendChild(tempDiv);
            
            window.google.accounts.id.renderButton(tempDiv, {
              theme: 'outline',
              size: 'large',
              text: 'continue_with',
              shape: 'rectangular',
            });
            
            // Simulate click on the rendered button
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
          }
        });
      } catch (error) {
        console.error('Google Sign-In error:', error);
        setError('Google Sign-In failed. Please try again.');
      }
    } else {
      setError('Google Sign-In not loaded. Please refresh the page.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-100 to-primary-lighter/10 dark:from-gray-900 dark:to-primary-darker flex items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-primary rounded-full flex items-center justify-center mb-4">
            <img
              src={process.env.PUBLIC_URL + "/foodexlogo.png"}
              alt="Billoza Logo"
              className="h-8 w-8 object-contain filter brightness-0 invert"
            />
          </div>
          <h2 className="text-3xl font-bold text-neutral-600 dark:text-white">
            Welcome to Billoza
          </h2>
          <p className="mt-2 text-neutral-400 dark:text-gray-300">
            Choose your preferred way to access the Restaurant Management System
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-error-lighter/30 dark:bg-error-dark/30 border border-error-light dark:border-error-dark rounded-lg p-3 mb-6 max-w-md mx-auto">
            <p className="text-error-dark dark:text-error-light text-sm text-center">{error}</p>
          </div>
        )}

        {/* Two Cards Layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Guest Login Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-neutral-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="mx-auto h-16 w-16 bg-primary rounded-full flex items-center justify-center mb-4">
                  <FiUser size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-600 dark:text-white mb-2">
                  Guest Access
                </h3>
                <p className="text-neutral-400 dark:text-gray-400 text-sm">
                  Explore with sample data and features
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center text-neutral-500 dark:text-gray-300">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span className="text-sm">Instant access with sample menu</span>
                </div>
                <div className="flex items-center text-neutral-500 dark:text-gray-300">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span className="text-sm">Try all features without signup</span>
                </div>
                <div className="flex items-center text-neutral-500 dark:text-gray-300">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span className="text-sm">Perfect for demo and testing</span>
                </div>
              </div>

              <button
                onClick={handleGuestLogin}
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <FiUser size={20} />
                    <span className="text-lg">Continue as Guest</span>
                    <FiArrowRight size={20} />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Google Login Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-neutral-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="mx-auto h-16 w-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
                  <FcGoogle size={32} />
                </div>
                <h3 className="text-2xl font-bold text-neutral-600 dark:text-white mb-2">
                  Google Account
                </h3>
                <p className="text-neutral-400 dark:text-gray-400 text-sm">
                  Sign in with your Google account
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center text-neutral-500 dark:text-gray-300">
                  <div className="w-2 h-2 bg-success-dark rounded-full mr-3"></div>
                  <span className="text-sm">Save your custom menu items</span>
                </div>
                <div className="flex items-center text-neutral-500 dark:text-gray-300">
                  <div className="w-2 h-2 bg-success-dark rounded-full mr-3"></div>
                  <span className="text-sm">Access data from any device</span>
                </div>
                <div className="flex items-center text-neutral-500 dark:text-gray-300">
                  <div className="w-2 h-2 bg-success-dark rounded-full mr-3"></div>
                  <span className="text-sm">Secure cloud synchronization</span>
                </div>
              </div>

              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full bg-neutral-100 dark:bg-gray-700 border border-neutral-200 dark:border-gray-600 hover:bg-neutral-200 dark:hover:bg-gray-600 text-neutral-600 dark:text-gray-300 font-medium py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
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
          <p className="text-neutral-400 dark:text-gray-400 text-sm">
            Choose <strong className="text-primary">Guest</strong> for quick demo or <strong className="text-success-dark">Google</strong> to save your data
          </p>
        </div>
      </div>
    </div>
  );
}