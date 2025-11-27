import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedCourse, setSelectedCourse] = useState(null);

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
