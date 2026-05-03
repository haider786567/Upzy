import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const monitorService = {
  getAllMonitors: async () => {
    const response = await axios.get(`${API_URL}/monitors`, { withCredentials: true });
    return response.data;
  },

  getMonitorById: async (monitorId) => {
    const response = await axios.get(`${API_URL}/monitors/${monitorId}`, { withCredentials: true });
    return response.data;
  },

  createMonitor: async (monitorData) => {
    const response = await axios.post(`${API_URL}/monitors/create`, monitorData, { withCredentials: true });
    return response.data;
  },

  updateMonitor: async (monitorId, monitorData) => {
    const response = await axios.put(`${API_URL}/monitors/${monitorId}/update`, monitorData, { withCredentials: true });
    return response.data;
  },

  deleteMonitor: async (monitorId) => {
    const response = await axios.delete(`${API_URL}/monitors/${monitorId}/delete`, { withCredentials: true });
    return response.data;
  },

  toggleMonitor: async (monitorId) => {
    const response = await axios.patch(`${API_URL}/monitors/${monitorId}/toggle`, {}, { withCredentials: true });
    return response.data;
  },

  runMonitorNow: async (monitorId) => {
    const response = await axios.post(`${API_URL}/monitors/${monitorId}/run`, {}, { withCredentials: true });
    return response.data;
  }
};

export default monitorService;
