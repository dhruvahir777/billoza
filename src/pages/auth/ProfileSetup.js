import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FiUser, FiMail, FiPhone, FiMapPin, FiLock, FiSave, FiCamera, FiUpload } from 'react-icons/fi';
import { MdRestaurant } from 'react-icons/md';

export default function ProfileSetup() {
  const navigate = useNavigate();
  const { user, saveUserProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: '',
    restaurantName: '',
    address: '',
    password: '',
    confirmPassword: '',
    profilePicture: null
  });

  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, profilePicture: 'Please select a valid image file' }));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, profilePicture: 'Image size should be less than 5MB' }));
        return;
      }

      setFormData(prev => ({ ...prev, profilePicture: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicPreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      // Clear any previous error
      if (errors.profilePicture) {
        setErrors(prev => ({ ...prev, profilePicture: '' }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    
    if (!formData.restaurantName.trim()) {
      newErrors.restaurantName = 'Restaurant/Hotel name is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Convert profile picture to base64 if uploaded
      let profilePictureData = null;
      if (formData.profilePicture) {
        const reader = new FileReader();
        profilePictureData = await new Promise((resolve) => {
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(formData.profilePicture);
        });
      }

      // Save profile data
      const profileData = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        restaurantName: formData.restaurantName,
        address: formData.address,
        password: formData.password, // In real app, this should be hashed
        profilePicture: profilePictureData, // Base64 string or null
        profileSetupComplete: true,
        setupDate: new Date().toISOString()
      };
      
      await saveUserProfile(profileData);
      
      // Redirect to main app
      navigate('/');
    } catch (err) {
      console.error('Profile setup error:', err);
      setError('Failed to save profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <FiUser className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white text-left">
                Complete Your Profile
              </h2>
              <p className="text-gray-300 text-left text-sm">
                Step 1 of 2 - Personal Information
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-800 rounded-lg p-3 mb-4 max-w-md mx-auto">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Profile Setup Form */}
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column - Profile Picture */}
              <div className="lg:col-span-1 flex flex-col items-center space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-300 mb-4">Profile Picture</h3>
                  
                  {/* Profile Picture Preview */}
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-700 border-4 border-gray-600 mx-auto mb-4">
                      {profilePicPreview ? (
                        <img 
                          src={profilePicPreview} 
                          alt="Profile Preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-white bg-cyan-700">
                          {formData.name?.charAt(0) || user?.name?.charAt(0) || "U"}
                        </div>
                      )}
                    </div>
                    
                    {/* Camera Icon Overlay */}
                    <label className="absolute bottom-2 right-2 w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                      <FiCamera className="text-white" size={16} />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePicChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  
                  {/* Upload Button */}
                  <label className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg cursor-pointer transition-colors text-sm">
                    <FiUpload className="mr-2" size={14} />
                    Choose Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePicChange}
                      className="hidden"
                    />
                  </label>
                  
                  {errors.profilePicture && (
                    <p className="text-red-400 text-xs mt-2">{errors.profilePicture}</p>
                  )}
                  
                  <p className="text-gray-400 text-xs mt-2">
                    Optional - JPG, PNG max 5MB
                  </p>
                </div>
              </div>

              {/* Middle Column - Personal Info */}
              <div className="lg:col-span-1 space-y-4">
                <h3 className="text-lg font-medium text-gray-300 mb-4">Personal Information</h3>
                
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    <FiUser className="inline mr-1" size={14} />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email Field (readonly) */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    <FiMail className="inline mr-1" size={14} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-600 rounded-lg text-gray-300 cursor-not-allowed text-sm"
                    placeholder="Email from Google account"
                  />
                  <p className="text-gray-400 text-xs mt-1">From your Google account</p>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    <FiPhone className="inline mr-1" size={14} />
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Enter mobile number"
                  />
                  {errors.mobile && <p className="text-red-400 text-xs mt-1">{errors.mobile}</p>}
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      <FiLock className="inline mr-1" size={14} />
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Min 4 chars"
                    />
                    {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      <FiLock className="inline mr-1" size={14} />
                      Confirm
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Re-enter"
                    />
                    {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>

              {/* Right Column - Business Info */}
              <div className="lg:col-span-1 space-y-4">
                <h3 className="text-lg font-medium text-gray-300 mb-4">Business Information</h3>
                
                {/* Restaurant/Hotel Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    <MdRestaurant className="inline mr-1" size={14} />
                    Restaurant/Hotel Name
                  </label>
                  <input
                    type="text"
                    name="restaurantName"
                    value={formData.restaurantName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Enter business name"
                  />
                  {errors.restaurantName && <p className="text-red-400 text-xs mt-1">{errors.restaurantName}</p>}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    <FiMapPin className="inline mr-1" size={14} />
                    Business Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
                    placeholder="Enter your business address"
                  />
                  {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <FiSave size={16} />
                        <span>Complete Setup</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer Info */}
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">
            Your information is securely stored and will help us personalize your experience
          </p>
        </div>
      </div>
    </div>
  );
}