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
  const [userType, setUserType] = useState(null); // 'guest', 'google', 'email'

  // Check if user is already logged in on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('billoza_user');
    const savedUserType = localStorage.getItem('billoza_user_type');
    
    if (savedUser && savedUserType) {
      setUser(JSON.parse(savedUser));
      setUserType(savedUserType);
      setIsLoggedIn(true);
    }
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

  // Google login function
  const loginWithGoogle = (googleResponse) => {
    const googleUser = {
      id: googleResponse.sub || googleResponse.googleId,
      name: googleResponse.name,
      email: googleResponse.email,
      avatar: googleResponse.picture || googleResponse.imageUrl,
      hasStaticData: false // New users won't see static data
    };
    
    setUser(googleUser);
    setUserType('google');
    setIsLoggedIn(true);
    
    localStorage.setItem('billoza_user', JSON.stringify(googleUser));
    localStorage.setItem('billoza_user_type', 'google');
  };

  // Email/Password login function
  const loginWithEmail = (email, password) => {
    // For demo purposes - in real app, this would be API call
    const emailUser = {
      id: `email_${Date.now()}`,
      name: email.split('@')[0], // Use email prefix as name
      email: email,
      avatar: null,
      hasStaticData: false // New users won't see static data
    };
    
    setUser(emailUser);
    setUserType('email');
    setIsLoggedIn(true);
    
    localStorage.setItem('billoza_user', JSON.stringify(emailUser));
    localStorage.setItem('billoza_user_type', 'email');
    
    return Promise.resolve(emailUser);
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
    loginAsGuest,
    loginWithGoogle,
    loginWithEmail,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};