import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const adminUserService = {
  /**
   * Fetch all users from the system
   * Requires Admin privileges
   */
  getAllUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/users`, { withCredentials: true });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Delete a user by ID
   * @param {string} id - The user ID to delete
   */
  deleteUser: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/admin/users/${id}`, { withCredentials: true });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default adminUserService;
