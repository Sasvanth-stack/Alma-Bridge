
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, Role } from '../types.ts';

interface AuthContextType {
  user: User | null;
  login: (name: string, role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (name: string, role: Role) => {
    // In a real app, this would involve API calls
    const avatar = `https://api.dicebear.com/8.x/initials/svg?seed=${name.replace(/\s+/g, '')}`;
    setUser({ name, role, avatar });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};