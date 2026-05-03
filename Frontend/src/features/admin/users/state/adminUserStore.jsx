import React, { createContext, useContext, useState, useCallback } from 'react';

const AdminUserContext = createContext();

export const AdminUserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const setUsersData = useCallback((data) => {
    setUsers(data);
  }, []);

  const removeUserFromState = useCallback((id) => {
    setUsers((prev) => prev.filter((user) => user._id !== id));
  }, []);

  const value = {
    users,
    loading,
    setLoading,
    error,
    setError,
    setUsersData,
    removeUserFromState
  };

  return (
    <AdminUserContext.Provider value={value}>
      {children}
    </AdminUserContext.Provider>
  );
};

export const useAdminUserStore = () => {
  const context = useContext(AdminUserContext);
  if (!context) {
    throw new Error('useAdminUserStore must be used within an AdminUserProvider');
  }
  return context;
};
