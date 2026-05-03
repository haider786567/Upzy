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
    updateMonitorInState,
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

  const updateMonitor = useCallback(async (id, monitorData) => {
    try {
      const updated = await adminMonitorService.updateMonitor(id, monitorData);
      updateMonitorInState(updated);
      toast.success('Monitor updated successfully');
      return true;
    } catch (err) {
      toast.error(err.message || 'Failed to update monitor');
      return false;
    }
  }, [updateMonitorInState]);

  const deleteMonitor = useCallback(async (id) => {
    try {
      await adminMonitorService.deleteMonitor(id);
      removeMonitorFromState(id);
      toast.success('Monitor deleted successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to delete monitor');
    }
  }, [removeMonitorFromState]);

  const runMonitorNow = useCallback(async (id) => {
    try {
      const result = await adminMonitorService.runMonitorNow(id);
      toast.success(result.message || 'Check triggered successfully');
      // Optionally refresh monitors to show new status
      fetchMonitors();
    } catch (err) {
      toast.error(err.message || 'Failed to trigger check');
    }
  }, [fetchMonitors]);

  const toggleMonitor = useCallback(async (id) => {
    try {
      const updated = await adminMonitorService.toggleMonitor(id);
      updateMonitorInState(updated);
      toast.success(`Monitor ${updated.isActive ? 'resumed' : 'paused'}`);
    } catch (err) {
      toast.error(err.message || 'Failed to toggle monitor');
    }
  }, [updateMonitorInState]);

  useEffect(() => {
    fetchMonitors();
  }, [fetchMonitors]);

  return {
    monitors,
    loading,
    error,
    refreshMonitors: fetchMonitors,
    createMonitor,
    updateMonitor,
    deleteMonitor,
    runMonitorNow,
    toggleMonitor
  };
};
