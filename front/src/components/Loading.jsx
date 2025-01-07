// src/components/Loading.jsx
import React from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Loading = () => {
  const { darkMode } = React.useContext(ThemeContext);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className={`p-6 rounded-lg shadow-lg w-full h-full flex items-center justify-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} futuristic-card`}>
        <div className="flex items-center space-x-4">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-transparent h-12 w-12"></div>
          <span className="text-xl font-semibold">Cargando...</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;