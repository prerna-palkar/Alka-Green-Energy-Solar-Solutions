import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, MapPin, Shield, Info, LogIn } from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('info');

  // Input states for user settings simulation
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    themePreference: 'light'
  });

  const [addressData, setAddressData] = useState({
    street: '',
    city: '',
    zip: '',
    country: ''
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    alert('Settings updated in browser state! (FastAPI save pending)');
  };

  const tabs = [
    { id: 'info', name: 'User Information', icon: User },
    { id: 'address', name: 'Address Details', icon: MapPin },
    { id: 'security', name: 'Security & Access', icon: Shield }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">User Profile</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage your personal settings, shipping details, and account preferences.</p>
      </div>

      {/* Profile Columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar Tabs */}
        <div className="md:col-span-1 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded text-left text-xs font-semibold tracking-wide transition-colors ${activeTab === tab.id ? 'bg-indigo-50 text-indigo-750 dark:bg-indigo-950/50 dark:text-indigo-400 font-extrabold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-900/50'}`}
              >
                <Icon className="h-4 w-4" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Content Panels */}
        <div className="md:col-span-3 border border-slate-200 dark:border-slate-800 rounded-lg p-6 bg-white dark:bg-slate-900 h-fit space-y-6">
          
          {/* Information Tab */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              <h2 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
                1. User Information
              </h2>

              <div className="flex gap-4 items-center bg-indigo-50 text-indigo-850 dark:bg-indigo-950/40 dark:text-indigo-300 p-4 rounded-lg text-xs leading-relaxed border border-indigo-150/40 dark:border-indigo-900/20">
                <Info className="h-5 w-5 shrink-0" />
                <div>
                  <p className="font-bold">Database Authentication Disconnected</p>
                  <p className="text-indigo-900 dark:text-indigo-400/80 mt-0.5">
                    No active login detected. You can edit the inputs below, but they will not write to the MySQL database until the FastAPI auth routes are configured.
                  </p>
                  <Link to="/login" className="inline-flex items-center gap-1 mt-2 text-indigo-650 hover:underline font-bold">
                    <LogIn className="h-3.5 w-3.5" />
                    Visit Login Page
                  </Link>
                </div>
              </div>

              <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Full Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    placeholder="Guest User"
                    className="w-full px-3 py-2 border border-slate-350 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded text-xs dark:text-white outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Email Address</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    placeholder="guest@beautifulsoup.com"
                    className="w-full px-3 py-2 border border-slate-350 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded text-xs dark:text-white outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Phone Number</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 border border-slate-350 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded text-xs dark:text-white outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Theme Preference</label>
                  <select
                    value={profileData.themePreference}
                    onChange={(e) => setProfileData({ ...profileData, themePreference: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-350 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded text-xs text-slate-750 dark:text-slate-350 outline-none focus:border-indigo-500"
                  >
                    <option value="light">Light Mode</option>
                    <option value="dark">Dark Mode</option>
                  </select>
                </div>
                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-xs font-semibold transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Address Tab */}
          {activeTab === 'address' && (
            <div className="space-y-6">
              <h2 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
                2. Shipping Addresses
              </h2>

              <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Street Address</label>
                  <input
                    type="text"
                    value={addressData.street}
                    onChange={(e) => setAddressData({ ...addressData, street: e.target.value })}
                    placeholder="100 E-Commerce Blvd, Apt 4"
                    className="w-full px-3 py-2 border border-slate-350 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded text-xs dark:text-white outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">City</label>
                  <input
                    type="text"
                    value={addressData.city}
                    onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                    placeholder="San Jose"
                    className="w-full px-3 py-2 border border-slate-355 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded text-xs dark:text-white outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">ZIP / Postal Code</label>
                    <input
                      type="text"
                      value={addressData.zip}
                      onChange={(e) => setAddressData({ ...addressData, zip: e.target.value })}
                      placeholder="95101"
                      className="w-full px-3 py-2 border border-slate-355 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded text-xs dark:text-white outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Country</label>
                    <input
                      type="text"
                      value={addressData.country}
                      onChange={(e) => setAddressData({ ...addressData, country: e.target.value })}
                      placeholder="United States"
                      className="w-full px-3 py-2 border border-slate-355 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded text-xs dark:text-white outline-none"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="bg-indigo-650 hover:bg-indigo-750 text-white px-4 py-2 rounded text-xs font-semibold transition-colors"
                  >
                    Save Addresses
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
                3. Security Settings
              </h2>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border border-slate-200 dark:border-slate-850 p-4 rounded-lg gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white">Change Password</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Update passwords hashed via FastAPI Bcrypt module.</p>
                  </div>
                  <button
                    onClick={() => alert('Password resetting requires FastAPI user session.')}
                    className="border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-850 px-3.5 py-1.5 rounded text-xs font-semibold text-slate-700 transition-colors"
                  >
                    Reset Password
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between border border-slate-200 dark:border-slate-855 p-4 rounded-lg gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white">API Token Access</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Generate bearer tokens for FastAPI automation endpoints.</p>
                  </div>
                  <button
                    onClick={() => alert('API credentials require a verified database profile.')}
                    className="border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-850 px-3.5 py-1.5 rounded text-xs font-semibold text-slate-700 transition-colors"
                  >
                    Generate Token
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default Profile;
