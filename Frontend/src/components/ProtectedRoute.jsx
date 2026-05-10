import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../features/auth/hooks/useAuth';
import authService from '../features/auth/service/authService';
import { setUser } from '../features/auth/state/authSlice';

const ProtectedRoute = ({ children }) => {
  const { user, logoutUser } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Always start verifying — we must check the cookie even if localStorage is empty
  const [isVerifying, setIsVerifying] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Always call the backend — the httpOnly cookie is sent automatically.
        // This works even in incognito / other browsers where localStorage is empty.
        const data = await authService.getMe();
        const userData = data.user || data;

        if (userData && userData.id) {
          // Hydrate Redux + localStorage if they were empty (e.g. incognito, new browser)
          if (!user) {
            localStorage.setItem('user', JSON.stringify(userData));
            dispatch(setUser(userData));
          }
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        // Cookie missing or expired — clear any stale state and redirect
        localStorage.removeItem('user');
        setIsAuthenticated(false);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isVerifying) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-cream">
        <div className="w-10 h-10 border-4 border-rose border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
