
import React from 'react';
import { Notification } from '../types.ts';
import Icon from '../components/Icon.tsx';

interface NotificationsPageProps {
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

const timeSince = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return "Just now";
  let interval = seconds / 31536000;
  if (interval > 1) {
    const years = Math.floor(interval);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    const months = Math.floor(interval);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    const days = Math.floor(interval);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    const hours = Math.floor(interval);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    const minutes = Math.floor(interval);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  return "Just now";
};

const NotificationIcon: React.FC<{ type: Notification['type'] }> = ({ type }) => {
  let iconName: React.ComponentProps<typeof Icon>['name'];
  let bgColor = 'bg-gray-100 dark:bg-gray-700';
  let iconColor = 'text-gray-500 dark:text-gray-400';

  switch (type) {
    case 'like':
      iconName = 'like';
      bgColor = 'bg-pink-100 dark:bg-pink-900/50';
      iconColor = 'text-pink-500';
      break;
    case 'comment':
      iconName = 'comment';
      bgColor = 'bg-blue-100 dark:bg-blue-900/50';
      iconColor = 'text-blue-500';
      break;
    case 'connection':
      iconName = 'user-plus';
      bgColor = 'bg-green-100 dark:bg-green-900/50';
      iconColor = 'text-green-500';
      break;
    case 'event':
      iconName = 'calendar';
      bgColor = 'bg-purple-100 dark:bg-purple-900/50';
      iconColor = 'text-purple-500';
      break;
    default:
      iconName = 'notification';
  }

  return (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${bgColor}`}>
      <Icon name={iconName} className={`w-5 h-5 ${iconColor}`} />
    </div>
  );
};

const NotificationsPage: React.FC<NotificationsPageProps> = ({ notifications, onMarkAsRead, onMarkAllAsRead, onClearAll }) => {
  const sortedNotifications = [...notifications].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return (
    <div className="animate-fade-in">
      <div className="p-4 bg-white dark:bg-gray-800 shadow-sm sticky top-16 z-10 flex justify-between items-center">
        <h2 className="text-xl font-bold">Notifications</h2>
        <div className="flex gap-2">
          <button 
            onClick={onMarkAllAsRead} 
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-brand-orange-600 dark:hover:text-brand-orange-400 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Mark all notifications as read"
          >
            <Icon name="check-circle" className="w-5 h-5" />
            <span className="hidden sm:inline">Mark all as read</span>
          </button>
          <button 
            onClick={onClearAll} 
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-red-500 p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
            aria-label="Clear all notifications"
          >
            <Icon name="trash" className="w-5 h-5" />
            <span className="hidden sm:inline">Clear all</span>
          </button>
        </div>
      </div>

      {sortedNotifications.length > 0 ? (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {sortedNotifications.map(notification => (
            <li
              key={notification.id}
              onClick={() => onMarkAsRead(notification.id)}
              className={`p-4 flex items-start gap-4 cursor-pointer transition-colors relative ${notification.read ? 'bg-white dark:bg-gray-900' : 'bg-blue-50 dark:bg-blue-900/20' } hover:bg-gray-50 dark:hover:bg-gray-800/50`}
            >
              {!notification.read && (
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full" aria-label="Unread notification"></div>
              )}
              <NotificationIcon type={notification.type} />
              <div className="flex-1">
                <p className="text-sm text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: notification.message }}></p>
                <p className="text-xs text-brand-orange-600 dark:text-brand-orange-400 mt-1 font-semibold">{timeSince(notification.timestamp)}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-20 px-4">
          <Icon name="notification" className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto" />
          <h3 className="mt-4 text-xl font-bold">All caught up!</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">You don't have any new notifications.</p>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;