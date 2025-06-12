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
      hasExistingData: hasExistingData, // Flag to check if user has previous data
      profileSetupComplete: false, // Initially false, will be updated after checking profile
      passwordVerified: false // New flag for password verification
    };
    
    // Check if user has completed profile setup
    if (hasExistingData) {
      try {
        const userData = JSON.parse(existingUserData);
        if (userData.profile && userData.profile.profileSetupComplete) {
          googleUser.profileSetupComplete = true;
          googleUser.profileData = userData.profile;
        }
      } catch (error) {
        console.error('Error parsing existing user data:', error);
      }
    }
    
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
        profile: {},
        createdAt: new Date().toISOString()
      };
      localStorage.setItem(`billoza_user_data_${userId}`, JSON.stringify(initialUserData));
    }
    
    return Promise.resolve(googleUser);
  };

  // Verify password function
  const verifyPassword = (password) => {
    if (!user || user.hasStaticData) return false;
    
    const profileData = getUserProfile();
    if (profileData && profileData.password === password) {
      // Update user with password verified flag
      const updatedUser = {
        ...user,
        passwordVerified: true
      };
      
      setUser(updatedUser);
      localStorage.setItem('billoza_user', JSON.stringify(updatedUser));
      return true;
    }
    
    return false;
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

  // Save user profile function
  const saveUserProfile = (profileData) => {
    if (!user || user.hasStaticData) return Promise.reject('Cannot save profile for guest users');
    
    const existingData = localStorage.getItem(`billoza_user_data_${user.id}`);
    const userData = existingData ? JSON.parse(existingData) : {};
    
    userData.profile = {
      ...userData.profile,
      ...profileData,
      lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem(`billoza_user_data_${user.id}`, JSON.stringify(userData));
    
    // Update current user object
    const updatedUser = {
      ...user,
      name: profileData.name,
      profileSetupComplete: true,
      profileData: userData.profile
    };
    
    setUser(updatedUser);
    localStorage.setItem('billoza_user', JSON.stringify(updatedUser));
    
    return Promise.resolve(updatedUser);
  };

  // Get user profile data
  const getUserProfile = () => {
    if (!user || user.hasStaticData) return null;
    
    const userData = localStorage.getItem(`billoza_user_data_${user.id}`);
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        return parsedData.profile || {};
      } catch (error) {
        console.error('Error parsing user profile:', error);
        return {};
      }
    }
    return {};
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
    verifyPassword,
    getUserData,
    saveUserData,
    saveUserProfile,
    getUserProfile,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};