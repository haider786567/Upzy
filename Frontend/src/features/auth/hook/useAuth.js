import { useState } from 'react';
import authService from '../service/authService';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const forgotPassword = async (email) => {
    setLoading(true);
    try {
      const data = await authService.forgotPassword(email);
      toast.success(data.message || 'OTP sent to your email');
      return true;
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to send OTP';
      setError(msg);
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (otp) => {
    setLoading(true);
    try {
      const data = await authService.verifyOtp(otp);
      toast.success(data.message || 'OTP verified successfully');
      return true;
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid OTP';
      setError(msg);
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (password) => {
    setLoading(true);
    try {
      const data = await authService.resetPassword(password);
      toast.success(data.message || 'Password reset successful');
      return true;
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to reset password';
      setError(msg);
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    forgotPassword,
    verifyOtp,
    resetPassword,
    loading,
    error
  };
};
