import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const authService = {
  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password }, { withCredentials: true });
    return response.data;
  },

  register: async (username, email, password) => {
    const response = await axios.post(`${API_URL}/auth/register`, { username, email, password }, { withCredentials: true });
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await axios.post(`${API_URL}/auth/forget-password`, { email }, { withCredentials: true });
    return response.data;
  },

  verifyOtp: async (otp) => {
    const response = await axios.post(`${API_URL}/auth/verify-otp`, { otp }, { withCredentials: true });
    return response.data;
  },

  resetPassword: async (password) => {
    const response = await axios.post(`${API_URL}/auth/reset-password`, { password }, { withCredentials: true });
    return response.data;
  }
};

export default authService;
