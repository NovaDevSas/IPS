// src/components/UserGallery.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import config from '../config';
import { ThemeContext } from '../context/ThemeContext';

const UserGallery = () => {
  const [users, setUsers] = useState([]);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${config.backendUrl}/api/users`);
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {users.map(user => (
        <div key={user._id} className={`p-4 rounded-lg futuristic-card ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center text-white font-bold">
                {user.username ? user.username.charAt(0).toUpperCase() : '?'}
              </div>
            </div>
            <div className="truncate">
              <p className="text-lg font-semibold">{user.username || 'Sin nombre de usuario'}</p>
              <p className="text-sm">{user.email}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserGallery;