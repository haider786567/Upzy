import { useEffect, useCallback } from 'react';
import { useAdminUserStore } from '../state/adminUserStore';
import adminUserService from '../service/adminUserService';
import { toast } from 'react-hot-toast';

export const useAdminUsers = () => {
  const { 
    users, 
    loading, 
    setLoading, 
    error, 
    setError, 
    setUsersData, 
    removeUserFromState 
  } = useAdminUserStore();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminUserService.getAllUsers();
      const usersList = Array.isArray(data) ? data : data.users || [];
      setUsersData(usersList);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
      toast.error(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setUsersData]);

  const deleteUser = useCallback(async (id) => {
    try {
      await adminUserService.deleteUser(id);
      removeUserFromState(id);
      toast.success('User deleted successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to delete user');
    }
  }, [removeUserFromState]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    refreshUsers: fetchUsers,
    deleteUser
  };
};
