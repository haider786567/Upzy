import { useEffect, useCallback } from 'react';
import { useAdminMonitorStore } from '../state/adminMonitorStore';
import adminMonitorService from '../service/adminMonitorService';
import { toast } from 'react-hot-toast';

export const useAdminMonitors = () => {
  const { 
    monitors, 
    loading, 
    setLoading, 
    error, 
    setError, 
    setMonitorsData, 
    addMonitorToState,
    removeMonitorFromState 
  } = useAdminMonitorStore();

  const fetchMonitors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminMonitorService.getAllMonitors();
      setMonitorsData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch monitors');
      toast.error(err.message || 'Failed to fetch monitors');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setMonitorsData]);

  const createMonitor = useCallback(async (monitorData) => {
    try {
      const newMonitor = await adminMonitorService.createMonitor(monitorData);
      addMonitorToState(newMonitor);
      toast.success('Monitor created successfully');
      return true;
    } catch (err) {
      toast.error(err.message || 'Failed to create monitor');
      return false;
    }
  }, [addMonitorToState]);

  const deleteMonitor = useCallback(async (id) => {
    try {
      await adminMonitorService.deleteMonitor(id);
      removeMonitorFromState(id);
      toast.success('Monitor deleted successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to delete monitor');
    }
  }, [removeMonitorFromState]);

  useEffect(() => {
    fetchMonitors();
  }, [fetchMonitors]);

  return {
    monitors,
    loading,
    error,
    refreshMonitors: fetchMonitors,
    createMonitor,
    deleteMonitor
  };
};
