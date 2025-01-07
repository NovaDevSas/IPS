import React, { useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { FaArrowLeft, FaArrowRight, FaEdit, FaTrash, FaSortUp, FaSortDown } from "react-icons/fa";
import CollaboratorForm from "./CollaboratorForm";

const CollaboratorList = ({ collaborators, onAdd, onUpdate, onDelete }) => {
  const { darkMode } = useContext(ThemeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCollaborator, setSelectedCollaborator] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filters, setFilters] = useState({});
  const itemsPerPage = 8;

  // Ordenamiento
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedCollaborators = [...collaborators].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Filtrado
  const handleFilterChange = (e, key) => {
    setFilters({ ...filters, [key]: e.target.value });
  };

  const filteredCollaborators = sortedCollaborators.filter((collaborator) =>
    Object.keys(filters).every((key) =>
      collaborator[key]?.toLowerCase().includes(filters[key]?.toLowerCase())
    )
  );

  const paginatedCollaborators = filteredCollaborators.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredCollaborators.length / itemsPerPage);

  return (
    <div className={`min-h-screen py-8 px-6 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div
        className={`container mx-auto rounded-lg shadow-lg overflow-hidden ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b bg-gray-200 dark:bg-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Colaboradores</h2>
            <button
              onClick={() => {
                setSelectedCollaborator(null);
                setShowForm(true);
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Agregar Colaborador
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-sm">
                {[
                  { key: "email", label: "Correo Electrónico" },
                  { key: "username", label: "Nombre de Usuario" },
                ].map(({ key, label }) => (
                  <th key={key} className="py-3 px-6">
                    <div className="flex items-center justify-between cursor-pointer">
                      <span onClick={() => handleSort(key)}>{label}</span>
                      {sortConfig.key === key ? (
                        sortConfig.direction === "asc" ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : (
                        <FaSortUp className="opacity-50" />
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Filtrar"
                      onChange={(e) => handleFilterChange(e, key)}
                      className="mt-2 w-full p-1 text-sm border rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 focus:outline-none"
                    />
                  </th>
                ))}
                <th className="py-3 px-6">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-300 text-sm">
              {paginatedCollaborators.map((collaborator) => (
                <tr
                  key={collaborator._id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="py-3 px-6">{collaborator.email}</td>
                  <td className="py-3 px-6">{collaborator.username}</td>
                  <td className="py-3 px-6 space-x-2">
                    <button
                      onClick={() => {
                        setSelectedCollaborator(collaborator);
                        setShowForm(true);
                      }}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => onDelete(collaborator._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-700">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            <FaArrowLeft />
          </button>
          <span className="text-gray-800 dark:text-gray-300">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Formulario */}
      {showForm && (
        <CollaboratorForm
          onClose={() => setShowForm(false)}
          onAdd={onAdd}
          onUpdate={onUpdate}
          collaborator={selectedCollaborator}
        />
      )}
    </div>
  );
};

export default CollaboratorList;