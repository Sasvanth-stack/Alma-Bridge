
import React from 'react';
import { Page } from '../types.ts';
import Icon from './Icon.tsx';

interface BottomNavProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavItem: React.FC<{
  page: Page;
  label: string;
  icon: React.ComponentProps<typeof Icon>['name'];
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}> = ({ page, label, icon, currentPage, setCurrentPage }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => setCurrentPage(page)}
      className="flex flex-col items-center justify-center gap-1 w-full h-full transition-colors duration-200"
    >
      <Icon name={icon} className={`w-6 h-6 ${isActive ? 'text-brand-orange-500' : 'text-gray-500 dark:text-gray-400'}`} />
      <span className={`text-xs font-medium ${isActive ? 'text-brand-orange-600 dark:text-brand-orange-400' : 'text-gray-600 dark:text-gray-400'}`}>{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, setCurrentPage }) => {
  const navItems: { page: Page; label: string; icon: React.ComponentProps<typeof Icon>['name'] }[] = [
    { page: 'Home', label: 'Home', icon: 'home' },
    { page: 'Events', label: 'Calendar', icon: 'calendar' },
    { page: 'Network', label: 'Directory', icon: 'network' },
    { page: 'Donate', label: 'Donate', icon: 'donate' },
    { page: 'Profile', label: 'Profile', icon: 'user' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-40">
      <div className="max-w-7xl mx-auto h-full grid grid-cols-5">
        {navItems.map(item => (
          <NavItem
            key={item.page}
            page={item.page}
            label={item.label}
            icon={item.icon}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ))}
      </div>
    </div>
  );
};

export default BottomNav;