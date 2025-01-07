import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import config from '../config';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import CollaboratorList from '../components/collaborator/CollaboratorList';
import Loading from '../components/Loading';
import DialogMessage from '../components/DialogMessage';

const Collaborators = () => {
  const { darkMode } = useContext(ThemeContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [collaborators, setCollaborators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogMessage, setDialogMessage] = useState({ type: '', title: '', message: '' });

  const fetchCollaborators = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${config.backendUrl}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCollaborators(response.data);
    } catch (err) {
      console.error('Error fetching collaborators:', err);
      setDialogMessage({ type: 'error', title: 'Error', message: 'Error al cargar colaboradores' });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCollaborators();
  }, [isAuthenticated]);

  const handleAddCollaborator = async (newCollaborator) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`${config.backendUrl}/api/users`, newCollaborator, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCollaborators([...collaborators, response.data]);
      setDialogMessage({ type: 'success', title: 'Éxito', message: 'Colaborador agregado correctamente' });
    } catch (err) {
      console.error('Error adding collaborator:', err);
      setDialogMessage({ type: 'error', title: 'Error', message: 'Error al agregar colaborador' });
      throw err;
    }
  };

  const handleUpdateCollaborator = async (id, updatedCollaborator) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`${config.backendUrl}/api/users/${id}`, updatedCollaborator, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCollaborators(collaborators.map((collab) => (collab._id === id ? response.data : collab)));
      setDialogMessage({ type: 'success', title: 'Éxito', message: 'Colaborador actualizado correctamente' });
    } catch (err) {
      console.error('Error updating collaborator:', err);
      setDialogMessage({ type: 'error', title: 'Error', message: 'Error al actualizar colaborador' });
      throw err;
    }
  };

  const handleDeleteCollaborator = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este colaborador?')) return;
    
    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      await axios.delete(`${config.backendUrl}/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCollaborators(collaborators.filter((collab) => collab._id !== id));
      setDialogMessage({ type: 'success', title: 'Éxito', message: 'Colaborador eliminado correctamente' });
    } catch (err) {
      console.error('Error deleting collaborator:', err);
      setDialogMessage({ type: 'error', title: 'Error', message: 'Error al eliminar colaborador' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen`}>
      {loading && <Loading />}
      <CollaboratorList
        collaborators={collaborators}
        onAdd={handleAddCollaborator}
        onUpdate={handleUpdateCollaborator}
        onDelete={handleDeleteCollaborator}
      />
      {dialogMessage.message && (
        <DialogMessage
          type={dialogMessage.type}
          title={dialogMessage.title}
          message={dialogMessage.message}
          onClose={() => setDialogMessage({ type: '', title: '', message: '' })}
        />
      )}
    </div>
  );
};

export default Collaborators;