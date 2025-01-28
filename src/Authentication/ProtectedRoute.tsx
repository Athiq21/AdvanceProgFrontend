
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';


interface ProtectedRouteProps {
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // const { isAuthenticated } = useAuth();
  // const isAuthenticated = !!sessionStorage.getItem('accessToken')
  const isAuthenticated = !!localStorage.getItem('accessToken')

  if (!isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
