import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import config from '../../config';
import { ThemeContext } from '../../context/ThemeContext';
import DialogMessage from '../DialogMessage';
import DropdownCheckbox from '../DropdownCheckbox';

const rolesOptions = ['SuperAdministrador', 'Administrador', 'Operativo', 'Recepción'];

const CollaboratorForm = ({ onClose, onAdd, onUpdate, collaborator }) => {
  const { darkMode } = useContext(ThemeContext);
  const [collaboratorData, setCollaboratorData] = useState({
    email: '',
    username: '',
    password: '',
    roles: [],
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [dialogMessage, setDialogMessage] = useState({ type: '', title: '', message: '' });

  useEffect(() => {
    if (collaborator) {
      setCollaboratorData({
        email: collaborator.email,
        username: collaborator.username,
        password: '',
        roles: Array.isArray(collaborator.roles) ? collaborator.roles : [],
      });
    }
  }, [collaborator]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollaboratorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRolesChange = (roles) => {
    setCollaboratorData((prevData) => ({
      ...prevData,
      roles,
    }));
  };

  const validateForm = () => {
    if (!collaboratorData.email || !collaboratorData.username || (!collaborator && !collaboratorData.password)) {
      setDialogMessage({
        type: 'error',
        title: 'Error de Validación',
        message: 'Por favor, complete todos los campos obligatorios.',
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setDialogMessage({ type: '', title: '', message: '' });
    try {
      if (collaborator) {
        const dataToUpdate = { ...collaboratorData };
        if (!dataToUpdate.password) {
          delete dataToUpdate.password;
        }
        await onUpdate(collaborator._id, dataToUpdate);
        setDialogMessage({
          type: 'success',
          title: 'Éxito',
          message: 'Colaborador actualizado correctamente',
        });
      } else {
        await onAdd(collaboratorData);
        setDialogMessage({
          type: 'success',
          title: 'Éxito',
          message: 'Colaborador creado correctamente',
        });
      }
      onClose();
    } catch (err) {
      setDialogMessage({
        type: 'error',
        title: 'Error',
        message: 'Error al guardar el colaborador',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`w-full max-w-md p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-2xl font-bold mb-4">{collaborator ? 'Editar Colaborador' : 'Agregar Colaborador'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={collaboratorData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="username">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={collaboratorData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={collaboratorData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder={collaborator ? 'En blanco para mantener la contraseña actual' : 'Contraseña'}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="roles">Roles</label>
            <DropdownCheckbox
              options={rolesOptions}
              selectedOptions={collaboratorData.roles}
              onChange={handleRolesChange}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
        {dialogMessage.message && (
          <DialogMessage
            type={dialogMessage.type}
            title={dialogMessage.title}
            message={dialogMessage.message}
            onClose={() => setDialogMessage({ type: '', title: '', message: '' })}
          />
        )}
      </div>
    </div>
  );
};

export default CollaboratorForm;