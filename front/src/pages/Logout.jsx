// src/pages/Logout.jsx
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const Logout = () => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout();
  }, [logout]);

  return <div className="text-center text-2xl">Cerrando sesión...</div>;
};

export default Logout;