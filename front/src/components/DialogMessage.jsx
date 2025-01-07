import React from "react";
import { FaRegHandPaper, FaExclamationTriangle, FaCheckCircle, FaInfoCircle, FaTimes } from "react-icons/fa";

const DialogMessage = ({ title, message, type, onClose }) => {
  const getIconAndColor = () => {
    switch (type?.toLowerCase()) {
      case "error":
        return { icon: <FaExclamationTriangle className="text-red-500" />, color: "bg-red-500" };
      case "info":
        return { icon: <FaInfoCircle className="text-blue-500" />, color: "bg-blue-500" };
      case "éxito":
        return { icon: <FaCheckCircle className="text-green-500" />, color: "bg-green-500" };
      case "alerta":
        return { icon: <FaRegHandPaper className="text-yellow-500" />, color: "bg-yellow-500" };
      default:
        return { icon: <FaInfoCircle className="text-blue-500" />, color: "bg-blue-500" };
    }
  };

  const { icon, color } = getIconAndColor();

  return (
    <div className="fixed top-4 right-4 max-w-sm bg-gray-800 bg-opacity-90 text-white rounded-lg shadow-lg overflow-hidden animate-slideIn">
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-3 bg-gray-700 ${color}`}>
        <div className="flex items-center">
          <img
            src="/images/Agent.png"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3">
            <p className="text-sm font-medium">{"Nova Dev"}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-white hover:text-gray-300">
          <FaTimes />
        </button>
      </div>

      {/* Body */}
      <div className="px-4 py-3">
        <div className="flex items-center mb-1">
          <h2 className="text-lg font-semibold">{title}</h2>
          <div className="ml-2">{icon}</div>
        </div>
        <p className="text-sm text-gray-300">
          {message}
        </p>
      </div>
    </div>
  );
};

export default DialogMessage;