import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  selectedRole: string | null;
  setSelectedRole: (role: string | null) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  selectedCourse: string | null;
  setSelectedCourse: (course: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      selectedRole,
      setSelectedRole,
      currentPage,
      setCurrentPage,
      selectedCourse,
      setSelectedCourse
    }}>
      {children}
    </AppContext.Provider>
  );
};