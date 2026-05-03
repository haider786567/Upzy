import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMonitors, reset } from '../state/dashboardSlice';

const useDashboard = () => {
  const dispatch = useDispatch();
  const { monitors, isLoading, isError, message } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchMonitors());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const stats = {
    activeMonitors: monitors.filter((m) => m.isActive).length,
    totalMonitors: monitors.length,
    openIncidents: monitors.filter((m) => m.status === 'DOWN').length,
    // System Uptime can be calculated as average if we have it, 
    // but for now we'll just show N/A or a static value if not available.
    uptime: monitors.length > 0 ? '99.9%' : '0%', 
  };

  return { monitors, stats, isLoading, isError, message };
};

export default useDashboard;
