import React, { useState } from 'react';
import { JOBS_LISTINGS } from '../constants.ts';
import { Job, JobType } from '../types.ts';

const JobCard: React.FC<{ job: Job }> = ({ job }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row items-start gap-6">
    <div className="flex-shrink-0 w-16 h-16 bg-white rounded-md flex items-center justify-center p-2 shadow-sm">
      <img src={job.logo} alt={`${job.company} logo`} className="max-w-full max-h-full object-contain" />
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-start">
        <div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${job.type === JobType.FullTime ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
            {job.type}
          </span>
          <h3 className="text-xl font-bold mt-2 text-gray-900 dark:text-white">{job.title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
        </div>
        <button className="hidden sm:block bg-brand-orange-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-brand-orange-600 transition-colors">
          Apply Now
        </button>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300 mt-4">{job.description}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 italic">Posted by {job.postedBy}</p>
      <button className="sm:hidden mt-4 w-full bg-brand-orange-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-brand-orange-600 transition-colors">
          Apply Now
      </button>
    </div>
  </div>
);

const JobsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<JobType>(JobType.FullTime);

  const filteredJobs = JOBS_LISTINGS.filter(job => job.type === activeTab);

  return (
    <div className="container mx-auto p-4 md:p-8 animate-fade-in">
      <div className="flex justify-center mb-8">
        <div className="p-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg flex gap-2">
          <button 
            onClick={() => setActiveTab(JobType.FullTime)}
            className={`w-32 px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === JobType.FullTime ? 'bg-white dark:bg-gray-800 shadow' : 'text-gray-600 dark:text-gray-300'}`}
          >
            Full-time
          </button>
          <button 
            onClick={() => setActiveTab(JobType.Internship)}
            className={`w-32 px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === JobType.Internship ? 'bg-white dark:bg-gray-800 shadow' : 'text-gray-600 dark:text-gray-300'}`}
          >
            Internship
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => <JobCard key={job.id} job={job} />)
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">No {activeTab.toLowerCase()} positions currently available.</p>
        )}
      </div>
    </div>
  );
};

export default JobsPage;