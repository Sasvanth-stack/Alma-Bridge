import React from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';
import Icon from '../components/Icon.tsx';
import { Page, Role } from '../types.ts';

interface ProfilePageProps {
  setCurrentPage: (page: Page) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ setCurrentPage }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setCurrentPage('Home');
  };

  const getRoleIcon = (role: Role) => {
    switch(role) {
      case Role.Student: return 'student';
      case Role.Alumni: return 'alumni';
      case Role.Faculty: return 'faculty';
      default: return 'user';
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-fade-in">
        <Icon name="user" className="w-24 h-24 text-gray-300 dark:text-gray-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">View Your Profile</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Please log in to access your profile and manage your information.</p>
        {/* The main login button is in the top navbar */}
      </div>
    );
  }

  const ProfileStatistic: React.FC<{ value: string | number, label: string }> = ({ value, label }) => (
    <div className="text-center">
      <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  );

  const InfoRow: React.FC<{ icon: React.ComponentProps<typeof Icon>['name'], label: string, value: string }> = ({ icon, label, value }) => (
    <div className="flex items-center gap-4 py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <Icon name={icon} className="w-6 h-6 text-brand-orange-500" />
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="font-semibold text-gray-800 dark:text-gray-200">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in">
      <div className="relative h-40 bg-gradient-to-r from-brand-orange-500 to-brand-orange-700">
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
          <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 shadow-lg" />
        </div>
      </div>
      
      <div className="pt-20 text-center px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
        <div className="mt-2 flex items-center justify-center gap-2 text-brand-orange-600 dark:text-brand-orange-400">
          <Icon name={getRoleIcon(user.role)} className="w-5 h-5" />
          <p className="font-semibold">{user.role}</p>
        </div>
      </div>

      <div className="mt-8 p-4">
        <div className="grid grid-cols-3 gap-4 py-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <ProfileStatistic value={12} label="Connections" />
          <ProfileStatistic value={3} label="Events Attended" />
          <ProfileStatistic value={5} label="Posts" />
        </div>
      </div>

      <div className="p-4 mt-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">My Information</h3>
            <InfoRow icon="alumni" label="Department" value="Computer Science" />
            <InfoRow icon="calendar" label="Batch" value="2024" />
            {/* FIX: Replaced invalid "jobs" icon with "network" icon. */}
            <InfoRow icon="network" label="Current Company" value="AlmaConnect Inc." />
        </div>
      </div>
      
      <div className="p-4 mt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-red-600 bg-red-100 dark:bg-red-900/50 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900 transition-colors"
        >
          <Icon name="logout" className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;