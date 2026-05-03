import { useState } from 'react';

// Simple store for auth UI state
export const useAuthStore = () => {
  const [resetEmail, setResetEmail] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  return {
    resetEmail,
    setResetEmail,
    isOtpVerified,
    setIsOtpVerified
  };
};
