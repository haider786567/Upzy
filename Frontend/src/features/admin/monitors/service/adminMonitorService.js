import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const adminMonitorService = {
  /**
   * Fetch all monitors for the current user
   */
  getAllMonitors: async () => {
    try {
      const response = await axios.get(`${API_URL}/monitor`, { withCredentials: true });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get a specific monitor by ID
   */
  getMonitorById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/monitor/${id}`, { withCredentials: true });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Create a new monitor
   */
  createMonitor: async (monitorData) => {
    try {
      const response = await axios.post(`${API_URL}/monitor/create`, monitorData, { withCredentials: true });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Update an existing monitor
   */
  updateMonitor: async (id, monitorData) => {
    try {
      const response = await axios.put(`${API_URL}/monitor/${id}/update`, monitorData, { withCredentials: true });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Delete a monitor
   */
  deleteMonitor: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/monitor/${id}/delete`, { withCredentials: true });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Manually run a monitor check now
   */
  runMonitorNow: async (id) => {
    try {
      const response = await axios.post(`${API_URL}/monitor/${id}/run`, {}, { withCredentials: true });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Toggle monitor active/inactive (Pause/Resume)
   */
  toggleMonitor: async (id) => {
    try {
      const response = await axios.patch(`${API_URL}/monitor/${id}/toggle`, {}, { withCredentials: true });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default adminMonitorService;
