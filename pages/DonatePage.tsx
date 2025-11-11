import React from 'react';
import { DONATION_CAMPAIGNS } from '../constants.ts';
import { DonationCampaign } from '../types.ts';
import Icon from '../components/Icon.tsx';

const DonationCard: React.FC<{ campaign: DonationCampaign }> = ({ campaign }) => {
  const percentage = Math.round((campaign.raised / campaign.goal) * 100);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-2xl duration-300">
      <img src={campaign.image} alt={campaign.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{campaign.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mt-2 mb-4 h-12">{campaign.description}</p>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
        </div>
        <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
          <span>Raised: ${campaign.raised.toLocaleString()}</span>
          <span>Goal: ${campaign.goal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center text-brand-orange-700 dark:text-brand-orange-300 mb-6">
            <div className="flex items-center gap-2">
                <Icon name="user" className="w-5 h-5" />
                <span className="font-bold text-lg">{campaign.donors} Donors</span>
            </div>
            <span className="font-bold text-lg">{percentage}% Funded</span>
        </div>
        
        <button className="w-full bg-gradient-to-r from-brand-orange-500 to-brand-orange-600 text-white font-bold py-3 rounded-lg hover:from-brand-orange-600 hover:to-brand-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl">
          Donate Now
        </button>
      </div>
    </div>
  );
};

const DonatePage: React.FC = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto p-4 md:p-8 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DONATION_CAMPAIGNS.map(campaign => (
            <DonationCard key={campaign.id} campaign={campaign} />
            ))}
        </div>
        </div>
    </div>
  );
};

export default DonatePage;