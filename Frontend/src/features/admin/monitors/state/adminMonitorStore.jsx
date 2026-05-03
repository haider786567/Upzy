import React, { createContext, useContext, useState, useCallback } from 'react';

const AdminMonitorContext = createContext();

export const AdminMonitorProvider = ({ children }) => {
  const [monitors, setMonitors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const setMonitorsData = useCallback((data) => {
    setMonitors(data);
  }, []);

  const addMonitorToState = useCallback((monitor) => {
    setMonitors((prev) => [monitor, ...prev]);
  }, []);

  const updateMonitorInState = useCallback((updatedMonitor) => {
    setMonitors((prev) => 
      prev.map((m) => (m._id === updatedMonitor._id ? updatedMonitor : m))
    );
  }, []);

  const removeMonitorFromState = useCallback((id) => {
    setMonitors((prev) => prev.filter((m) => m._id !== id));
  }, []);

  const value = {
    monitors,
    loading,
    setLoading,
    error,
    setError,
    setMonitorsData,
    addMonitorToState,
    updateMonitorInState,
    removeMonitorFromState
  };

  return (
    <AdminMonitorContext.Provider value={value}>
      {children}
    </AdminMonitorContext.Provider>
  );
};

export const useAdminMonitorStore = () => {
  const context = useContext(AdminMonitorContext);
  if (!context) {
    throw new Error('useAdminMonitorStore must be used within an AdminMonitorProvider');
  }
  return context;
};
