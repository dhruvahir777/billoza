import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null); // 'guest', 'google'
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Check if user is already logged in on app start
  useEffect(() => {
    console.log('AuthProvider: Checking for existing user session...');
    
    try {
      const savedUser = localStorage.getItem('billoza_user');
      const savedUserType = localStorage.getItem('billoza_user_type');
      
      console.log('AuthProvider: Found saved data:', { savedUser: !!savedUser, savedUserType });
      
      if (savedUser && savedUserType) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setUserType(savedUserType);
          setIsLoggedIn(true);
          
          // For Google users, check if their data exists and update hasExistingData flag
          if (savedUserType === 'google') {
            const existingUserData = localStorage.getItem(`billoza_user_data_${parsedUser.id}`);
            parsedUser.hasExistingData = !!existingUserData;
            setUser(parsedUser);
          }
          
          console.log('AuthProvider: User restored from localStorage:', parsedUser);
        } catch (error) {
          console.error('Error parsing saved user data:', error);
          // Clear corrupted data
          localStorage.removeItem('billoza_user');
          localStorage.removeItem('billoza_user_type');
        }
      } else {
        console.log('AuthProvider: No existing session found');
      }
    } catch (error) {
      console.error('AuthProvider: Error accessing localStorage:', error);
    }
    
    // Set loading to false after checking localStorage
    setTimeout(() => {
      setIsLoading(false);
      console.log('AuthProvider: Loading complete');
    }, 100); // Small delay to ensure proper state update
  }, []);

  // Guest login function
  const loginAsGuest = () => {
    const guestUser = {
      id: 'guest_001',
      name: 'Guest User',
      email: 'guest@billoza.com',
      avatar: null,
      hasStaticData: true // Guest can access static data
    };
    
    setUser(guestUser);
    setUserType('guest');
    setIsLoggedIn(true);
    
    localStorage.setItem('billoza_user', JSON.stringify(guestUser));
    localStorage.setItem('billoza_user_type', 'guest');
  };

  // Google login function with data persistence
  const loginWithGoogle = (googleResponse) => {
    const userId = googleResponse.sub || googleResponse.googleId;
    
    // Check if this user has logged in before
    const existingUserData = localStorage.getItem(`billoza_user_data_${userId}`);
    const hasExistingData = !!existingUserData;
    
    const googleUser = {
      id: userId,
      name: googleResponse.name,
      email: googleResponse.email,
      avatar: googleResponse.picture || googleResponse.imageUrl,
      hasStaticData: false, // Google users don't see static data
      hasExistingData: hasExistingData // Flag to check if user has previous data
    };
    
    setUser(googleUser);
    setUserType('google');
    setIsLoggedIn(true);
    
    // Save current session
    localStorage.setItem('billoza_user', JSON.stringify(googleUser));
    localStorage.setItem('billoza_user_type', 'google');
    
    // Create user data storage if it doesn't exist
    if (!hasExistingData) {
      const initialUserData = {
        menuData: [],
        orders: [],
        settings: {},
        createdAt: new Date().toISOString()
      };
      localStorage.setItem(`billoza_user_data_${userId}`, JSON.stringify(initialUserData));
    }
    
    return Promise.resolve(googleUser);
  };

  // Get user's specific data
  const getUserData = (dataType) => {
    console.log('getUserData called with:', { dataType, user: user?.id, hasStaticData: user?.hasStaticData });
    if (!user || user.hasStaticData) return null;
    
    const storageKey = `billoza_user_data_${user.id}`;
    console.log('Looking for data with key:', storageKey);
    const userData = localStorage.getItem(storageKey);
    console.log('Raw userData from localStorage:', userData);
    
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        console.log('Parsed userData:', parsedData);
        const result = parsedData[dataType] || [];
        console.log(`Returning ${dataType}:`, result);
        return result;
      } catch (error) {
        console.error('Error parsing userData:', error);
        return [];
      }
    }
    console.log('No userData found, returning empty array');
    return [];
  };

  // Save user's specific data
  const saveUserData = (dataType, data) => {
    if (!user || user.hasStaticData) return false;
    
    const existingData = localStorage.getItem(`billoza_user_data_${user.id}`);
    const userData = existingData ? JSON.parse(existingData) : {};
    
    userData[dataType] = data;
    userData.lastUpdated = new Date().toISOString();
    
    localStorage.setItem(`billoza_user_data_${user.id}`, JSON.stringify(userData));
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setUserType(null);
    setIsLoggedIn(false);
    
    localStorage.removeItem('billoza_user');
    localStorage.removeItem('billoza_user_type');
  };

  const value = {
    user,
    isLoggedIn,
    userType,
    isLoading, // Expose loading state
    loginAsGuest,
    loginWithGoogle,
    getUserData,
    saveUserData,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};