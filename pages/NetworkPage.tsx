import React, { useState } from 'react';
import { ALUMNI_PROFILES } from '../constants.ts';
import { AlumniProfile } from '../types.ts';

const AlumniCard: React.FC<{ profile: AlumniProfile, onConnectToggle: (id: number) => void }> = ({ profile, onConnectToggle }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden text-center transform hover:-translate-y-1">
    <div className="h-24 bg-gradient-to-r from-brand-orange-400 to-brand-orange-600"></div>
    <div className="p-6 pt-0">
        <img src={profile.avatar} alt={profile.name} className="w-24 h-24 rounded-full mx-auto -mt-12 border-4 border-white dark:border-gray-800" />
        <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{profile.name}</h3>
        <p className="text-brand-orange-600 dark:text-brand-orange-400 font-semibold">{profile.company}</p>
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <p>Batch of {profile.batch} | {profile.department}</p>
            <p>{profile.location}</p>
        </div>
        <button 
            onClick={() => onConnectToggle(profile.id)}
            className={`mt-6 w-full py-2 rounded-lg font-semibold transition-colors duration-300 ${
                profile.connected 
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600' 
                : 'bg-brand-orange-500 text-white hover:bg-brand-orange-600'
            }`}
        >
            {profile.connected ? 'Disconnect' : 'Connect'}
        </button>
    </div>
  </div>
);

const NetworkPage: React.FC = () => {
  const [profiles, setProfiles] = useState<AlumniProfile[]>(ALUMNI_PROFILES);
  
  const handleConnectToggle = (id: number) => {
    setProfiles(prevProfiles => 
      prevProfiles.map(p => p.id === id ? { ...p, connected: !p.connected } : p)
    );
  };

  return (
    <div className="container mx-auto p-4 md:p-8 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {profiles.map(profile => (
          <AlumniCard key={profile.id} profile={profile} onConnectToggle={handleConnectToggle} />
        ))}
      </div>
    </div>
  );
};

export default NetworkPage;