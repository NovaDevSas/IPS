// src/components/RoleBasedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, userRoles } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const hasAccess = allowedRoles.some(role => userRoles.includes(role));
  return hasAccess ? children : <Navigate to="/unauthorized" />;
};

export default RoleBasedRoute;