
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';
import { Role } from '../types.ts';
import Icon from './Icon.tsx';

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>(Role.Student);
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name) {
      login(name, selectedRole);
      onClose();
    }
  };
  
  const RoleSelector: React.FC<{ role: Role, icon: React.ComponentProps<typeof Icon>['name'] }> = ({ role, icon }) => (
    <button
      type="button"
      onClick={() => setSelectedRole(role)}
      className={`flex-1 p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
        selectedRole === role 
        ? 'border-brand-orange-500 bg-brand-orange-100/50 text-brand-orange-700 shadow-md' 
        : 'border-gray-300 dark:border-gray-600 hover:border-brand-orange-300 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      <Icon name={icon} className="w-8 h-8"/>
      <span className="font-semibold">{role}</span>
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md m-4 transform transition-all duration-300 ease-out scale-95 animate-scale-in">
        <div className="p-6 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition">
             <Icon name="close" className="w-6 h-6" />
          </button>
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{isLogin ? 'Welcome Back!' : 'Join AlmaConnect'}</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">{isLogin ? 'Sign in to continue your journey.' : 'Create an account to get started.'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-brand-orange-500 rounded-lg outline-none transition" />
            {!isLogin && <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-brand-orange-500 rounded-lg outline-none transition" />}
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-brand-orange-500 rounded-lg outline-none transition" />

            <div>
                <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">{isLogin ? 'Logging in as:' : 'I am a:'}</p>
                <div className="flex gap-3 justify-between">
                    <RoleSelector role={Role.Student} icon="student" />
                    <RoleSelector role={Role.Alumni} icon="alumni" />
                    <RoleSelector role={Role.Faculty} icon="faculty" />
                </div>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-brand-orange-500 to-brand-orange-600 text-white font-bold py-3 rounded-lg hover:from-brand-orange-600 hover:to-brand-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-brand-orange-300">
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-brand-orange-600 hover:text-brand-orange-500 ml-1">
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
      <style>{`
        @keyframes scale-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in { animation: scale-in 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default AuthModal;