import React from 'react';
import { MENTORS } from '../constants.ts';
import { Mentor } from '../types.ts';

const MentorCard: React.FC<{ mentor: Mentor }> = ({ mentor }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="p-6">
      <div className="flex items-center gap-4">
        <img src={mentor.avatar} alt={mentor.name} className="w-20 h-20 rounded-full" />
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{mentor.name}</h3>
          <p className="text-brand-orange-600 dark:text-brand-orange-400 font-semibold">{mentor.title} at {mentor.company}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 h-20 overflow-hidden">{mentor.bio}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {mentor.expertise.map(tag => (
          <span key={tag} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
        ))}
      </div>
      <button className="mt-6 w-full bg-gradient-to-r from-brand-orange-500 to-brand-orange-600 text-white font-semibold py-2.5 rounded-lg hover:from-brand-orange-600 hover:to-brand-orange-700 transition-all duration-300 shadow-md">
        Request Mentorship
      </button>
    </div>
  </div>
);

const MentorshipPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 md:p-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {MENTORS.map(mentor => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </div>
    </div>
  );
};

export default MentorshipPage;