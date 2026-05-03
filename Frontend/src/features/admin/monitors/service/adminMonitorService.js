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
   * Create a new monitor
   * @param {Object} monitorData - The monitor details
   */
  createMonitor: async (monitorData) => {
    try {
      // Backend expects: { name, url, method, headers, body, expectedStatus, timeout, interval }
      // We map the UI names to backend fields
      const payload = {
        name: monitorData.name,
        url: monitorData.url || 'https://example.com', // Default if missing
        method: monitorData.method || 'GET',
        interval: parseInt(monitorData.interval) || 5,
        expectedStatus: 200,
        timeout: 5000
      };
      const response = await axios.post(`${API_URL}/monitor/create`, payload, { withCredentials: true });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Delete a monitor by ID
   * @param {string} id - The monitor ID
   */
  deleteMonitor: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/monitor/delete/${id}`, { withCredentials: true });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default adminMonitorService;
