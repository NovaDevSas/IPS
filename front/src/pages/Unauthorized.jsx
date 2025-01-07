// src/pages/Unauthorized.jsx
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaExclamationTriangle } from "react-icons/fa";

const Unauthorized = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`flex items-center justify-center min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div
        className={`container mx-auto max-w-md p-8 rounded-lg shadow-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Encabezado */}
        <div className="text-center border-b pb-4 mb-4">
          <h2 className="text-2xl font-semibold mb-2 text-purple-600">¡Ups!</h2>
        </div>

        {/* Mensaje */}
        <div className="text-center mb-6">
          <p className={`font-medium ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
            Parece que no tienes acceso a esta página.
          </p>
          <FaExclamationTriangle className="mt-2 text-purple-600 text-3xl mx-auto" />
          <p className={`mt-4 ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
            Si crees que esto es un error, por favor contacta al administrador del sistema.
          </p>
        </div>

        {/* Botón Volver */}
        <div className="text-center">
          <a
            href="/"
            className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Volver al Inicio
          </a>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
