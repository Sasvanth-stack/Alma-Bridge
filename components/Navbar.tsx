
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';
import { Page, Role } from '../types.ts';
import AuthModal from './AuthModal.tsx';
import Icon from './Icon.tsx';

interface NavbarProps {
  currentPageTitle: string;
  setCurrentPage: (page: Page) => void;
  unreadCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ currentPageTitle, setCurrentPage, unreadCount }) => {
  const { user, logout } = useAuth();
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRoleIcon = (role: Role) => {
    switch(role) {
      case Role.Student: return 'student';
      case Role.Alumni: return 'alumni';
      case Role.Faculty: return 'faculty';
      default: return 'user';
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setCurrentPage('Notifications')}
                aria-label="View notifications"
                className="relative p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-brand-orange-500"
              >
                <Icon name="notification" className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800" />
                )}
              </button>

              <div className="flex-shrink-0 flex items-center ml-2 sm:ml-4">
                <span className="hidden sm:block text-xl font-bold text-gray-800 dark:text-white">AlmaConnect</span>
              </div>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2">
                <h1 className="text-lg font-bold text-gray-800 dark:text-white">{currentPageTitle}</h1>
            </div>

            <div>
              {user ? (
                <div className="ml-4 flex items-center" ref={profileRef}>
                  <div className="relative">
                    <button
                      onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
                      className="max-w-xs bg-gray-200 dark:bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img className="h-9 w-9 rounded-full" src={user.avatar} alt={user.name} />
                    </button>
                    {isProfileDropdownOpen && (
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                           <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{user.name}</p>
                           <p className="text-xs text-brand-orange-600 dark:text-brand-orange-400 flex items-center gap-1">
                             <Icon name={getRoleIcon(user.role)} className="w-4 h-4"/>
                             {user.role}
                           </p>
                        </div>
                        <button
                          onClick={() => { logout(); setProfileDropdownOpen(false); setCurrentPage('Home');}}
                          className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Icon name="logout" className="w-5 h-5" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="bg-gradient-to-r from-brand-orange-500 to-brand-orange-600 text-white font-semibold px-3 py-1.5 rounded-md hover:from-brand-orange-600 hover:to-brand-orange-700 transition-all duration-300 shadow-sm text-sm"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      {isAuthModalOpen && <AuthModal onClose={() => setAuthModalOpen(false)} />}
    </>
  );
};

export default Navbar;