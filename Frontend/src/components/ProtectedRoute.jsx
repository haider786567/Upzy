import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import authService from '../features/auth/service/authService';

const ProtectedRoute = ({ children }) => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (!user) {
        setIsVerifying(false);
        return;
      }
      try {
        await authService.getMe();
        setIsVerifying(false);
      } catch (error) {
        await logoutUser();
        navigate('/login', { replace: true });
      }
    };
    verifyToken();
  }, [user, navigate, logoutUser]);

  if (!user) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" replace />;
  }

  if (isVerifying) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-cream">
        <div className="w-10 h-10 border-4 border-rose border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
