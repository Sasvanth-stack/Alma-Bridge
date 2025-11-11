
import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext.tsx';
import Navbar from './components/Navbar.tsx';
import BottomNav from './components/BottomNav.tsx';
import AlmaAIChatbox from './components/AlmaAIChatbox.tsx';
import HomePage from './pages/HomePage.tsx';
import EventsPage from './pages/EventsPage.tsx';
import NetworkPage from './pages/NetworkPage.tsx';
import DonatePage from './pages/DonatePage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import NotificationsPage from './pages/NotificationsPage.tsx';
import { Page, Notification } from './types.ts';
import { NOTIFICATIONS } from './constants.ts';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Home');
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const pageTitles: Record<Page, string> = {
    Home: 'Home',
    Events: 'Event Calendar',
    Network: 'Alumni Directory',
    Donate: 'Support a Cause',
    Profile: 'My Profile',
    Notifications: 'Notifications',
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <HomePage />;
      case 'Events':
        return <EventsPage />;
      case 'Network':
        return <NetworkPage />;
      case 'Donate':
        return <DonatePage />;
      case 'Profile':
        return <ProfilePage setCurrentPage={setCurrentPage} />;
      case 'Notifications':
        return <NotificationsPage 
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
          onMarkAllAsRead={handleMarkAllAsRead}
          onClearAll={handleClearAll}
        />;
      default:
        return <HomePage />;
    }
  };

  return (
    <AuthProvider>
      <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans overflow-hidden">
        <Navbar 
          currentPageTitle={pageTitles[currentPage]} 
          setCurrentPage={setCurrentPage} 
          unreadCount={unreadCount} 
        />
        <main className="flex-grow overflow-y-auto pt-16 pb-20">
          {renderPage()}
        </main>
        <AlmaAIChatbox />
        <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </AuthProvider>
  );
};

export default App;