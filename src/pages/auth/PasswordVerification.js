import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function PasswordVerification() {
  const navigate = useNavigate();
  const { user, getUserProfile, logout, verifyPassword } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const profileData = user && !user.hasStaticData ? getUserProfile() : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const isPasswordCorrect = verifyPassword(password);
      
      if (isPasswordCorrect) {
        navigate('/');
      } else {
        setError('The password is incorrect. Try again.');
        setPassword('');
      }
    } catch (err) {
      console.error('Password verification error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Blurred Background - App Content */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-80 backdrop-blur-md"></div>
      
      {/* Windows Lock Screen */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8">
          
          {/* Profile Picture */}
          <div className="w-32 h-32 mb-6 rounded-full overflow-hidden bg-white shadow-2xl">
            {profileData?.profilePicture ? (
              <img 
                src={profileData.profilePicture} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-700 bg-gray-200">
                {user?.name?.charAt(0) || "U"}
              </div>
            )}
          </div>

          {/* User Name */}
          <h1 className="text-4xl font-light text-white mb-2 text-center">
            {user?.name || "User"}
          </h1>
          
          {/* Restaurant Name (if available) */}
          {profileData?.restaurantName && (
            <p className="text-lg text-gray-300 text-center">
              {profileData.restaurantName}
            </p>
          )}
        </div>

        {/* Password Input Section */}
        <div className="w-full max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Password Input - Fresh Design */}
            <div className="relative">
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Password"
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:bg-white/20 focus:border-white/40 text-center text-xl font-normal transition-all duration-200"
                required
                autoFocus
                style={{
                  fontSize: '18px',
                  letterSpacing: '2px',
                  textSecurity: 'disc',
                  WebkitTextSecurity: 'disc'
                }}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-center">
                <p className="text-red-300 text-sm bg-red-900/30 px-4 py-2 rounded-lg backdrop-blur-sm">
                  {error}
                </p>
              </div>
            )}

            {/* Instructions */}
            {!error && !password && (
              <div className="text-center">
                <p className="text-white/60 text-sm">Enter your password to continue</p>
              </div>
            )}

            {/* Submit Button (Hidden - Enter key submits) */}
            <button type="submit" className="sr-only">Submit</button>
          </form>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-center mt-6">
              <div className="w-6 h-6 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={handleLogout}
            className="text-white text-sm hover:text-gray-300 transition-colors underline"
          >
            Sign in as a different user
          </button>
        </div>
      </div>
    </div>
  );
}