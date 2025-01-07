import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaClipboardList,
  FaConciergeBell,
  FaSignOutAlt,
  FaSun,
  FaMoon,
  FaChevronDown,
  FaChevronUp,
  FaBriefcase,
} from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

const Layout = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);
  const [isExpanded, setIsExpanded] = useState(true); // Menú expandido por defecto
  const [isBackofficeExpanded, setIsBackofficeExpanded] = useState(false);

  const toggleMenu = () => setIsExpanded(!isExpanded);
  const toggleBackofficeMenu = () => setIsBackofficeExpanded(!isBackofficeExpanded);

  return (
    <div className={`flex h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Menú Lateral */}
      <div
        className={`flex flex-col h-screen ${
          isExpanded ? "w-64" : "w-16"
        } bg-gray-800 text-gray-100 transition-all duration-300 fixed z-50 shadow-lg`}
      >
        {/* Botón para expandir menú */}
        <button
          onClick={toggleMenu}
          className="p-4 text-gray-300 hover:text-white focus:outline-none"
        >
          <FaBars size={24} />
        </button>

        {/* Links del menú */}
        <nav className="mt-4 flex flex-col space-y-1">
          <Link
            to="/app/dashboard"
            className="flex items-center space-x-4 p-3 hover:bg-purple-600 rounded transition"
          >
            <FaHome size={20} />
            {isExpanded && <span>Dashboard</span>}
          </Link>
          <Link
            to="/app/clients"
            className="flex items-center space-x-4 p-3 hover:bg-purple-600 rounded transition"
          >
            <FaClipboardList size={20} />
            {isExpanded && <span>Agenda</span>}
          </Link>
          <Link
            to="/app/services"
            className="flex items-center space-x-4 p-3 hover:bg-purple-600 rounded transition"
          >
            <FaConciergeBell size={20} />
            {isExpanded && <span>Servicios</span>}
          </Link>

          {/* Backoffice con submenú */}
          <div className="flex flex-col">
            <button
              onClick={toggleBackofficeMenu}
              className="flex items-center space-x-4 p-3 hover:bg-purple-600 rounded transition focus:outline-none"
            >
              <FaBriefcase size={20} />
              {isExpanded && <span>Backoffice</span>}
              {isExpanded &&
                (isBackofficeExpanded ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />)}
            </button>
            {isBackofficeExpanded && (
              <div className="flex flex-col ml-8 space-y-1">
                <Link
                  to="/app/backoffice/collaborators"
                  className="p-2 hover:text-purple-400 transition"
                >
                  {isExpanded && <span>Colaboradores</span>}
                </Link>
                <Link
                  to="/app/backoffice/companies"
                  className="p-2 hover:text-purple-400 transition"
                >
                  {isExpanded && <span>Empresas</span>}
                </Link>
              </div>
            )}
          </div>

          {/* Cerrar sesión */}
          <button
            onClick={logout}
            className="flex items-center space-x-4 p-3 hover:bg-red-600 rounded transition"
          >
            <FaSignOutAlt size={20} />
            {isExpanded && <span>Cerrar Sesión</span>}
          </button>
        </nav>

        {/* Botón para cambiar tema */}
        <button
          onClick={toggleDarkMode}
          className="flex items-center space-x-4 p-3 mt-auto text-gray-300 hover:text-purple-400 transition"
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          {isExpanded && <span>{darkMode ? "Modo Claro" : "Modo Oscuro"}</span>}
        </button>
      </div>

      {/* Contenido Principal */}
      <div
        className={`flex-1 p-6 overflow-auto ${
          isExpanded ? "ml-64" : "ml-16"
        } transition-all duration-300`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
