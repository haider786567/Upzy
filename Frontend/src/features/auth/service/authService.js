import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const authService = {
  forgotPassword: async (email) => {
    const response = await axios.post(`${API_URL}/auth/forget-password`, { email });
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
