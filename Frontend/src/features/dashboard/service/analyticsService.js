import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const analyticsService = {
  getAnalytics: async (monitorId, range = '24h') => {
    const response = await axios.get(`${API_URL}/analytics/${monitorId}`, {
      params: { range },
      withCredentials: true
    });
    return response.data;
  }
};

export default analyticsService;
