
import React from 'react';
import { FeedItem, AlumniProfile } from '../types.ts';
import Icon from '../components/Icon.tsx';
import { useAuth } from '../contexts/AuthContext.tsx';
import { ALUMNI_PROFILES, FEED_ITEMS } from '../constants.ts';

const timeSince = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m";
  return Math.floor(seconds) + "s";
};

const FeedCard: React.FC<{ item: FeedItem; author: AlumniProfile | undefined }> = ({ item, author }) => {
  if (!author) return null;

  const FeedButton: React.FC<{icon: React.ComponentProps<typeof Icon>['name'], label: string | number}> = ({ icon, label }) => (
    <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-brand-orange-600 dark:hover:text-brand-orange-400 transition-colors rounded-md p-2">
      <Icon name={icon} className="w-5 h-5" />
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <img src={author.avatar} alt={author.name} className="w-12 h-12 rounded-full" />
          <div>
            <p className="font-bold text-gray-800 dark:text-white">{author.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{author.company} &middot; {timeSince(item.timestamp)} ago</p>
          </div>
        </div>
        <p className="mt-4 text-gray-700 dark:text-gray-300">{item.content}</p>
      </div>
      {item.image && (
        <img src={item.image} alt="Feed content" className="w-full h-auto max-h-96 object-cover" />
      )}
      <div className="p-2 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3">
            <FeedButton icon="like" label={item.likes} />
            <FeedButton icon="comment" label={item.comments} />
            <FeedButton icon="share" label="Share" />
        </div>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const alumniMap = new Map(ALUMNI_PROFILES.map(p => [p.id, p]));

  return (
    <div className="animate-fade-in">
      <div className="relative bg-gradient-to-r from-brand-orange-500 to-brand-orange-700 py-20 sm:py-28 text-white text-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            {user ? `Welcome back, ${user.name}!` : "Connecting Futures, Honoring the Past"}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Your official hub for all things alumni. Reconnect, give back, and grow with your community.
          </p>
        </div>
      </div>

      <div className="py-8 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 space-y-6">
          {FEED_ITEMS.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).map(item => (
            <FeedCard key={item.id} item={item} author={alumniMap.get(item.authorId)} />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default HomePage;