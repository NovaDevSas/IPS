import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import config from '../config';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import ClientList from '../components/client/ClientList';
import Loading from '../components/Loading';
import DialogMessage from '../components/DialogMessage';

const Clients = () => {
  const { darkMode } = useContext(ThemeContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogMessage, setDialogMessage] = useState({ type: '', title: '', message: '' });

  const fetchClients = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${config.backendUrl}/api/clients`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(response.data);
    } catch (err) {
      console.error('Error fetching clients:', err);
      setDialogMessage({ type: 'error', title: 'Error', message: 'Error al cargar clientes' });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClients();
  }, [isAuthenticated]);

  const handleAddClient = async (newClient) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`${config.backendUrl}/api/clients`, newClient, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients([...clients, response.data]);
      setDialogMessage({ type: 'success', title: 'Éxito', message: 'Cliente agregado correctamente' });
    } catch (err) {
      console.error('Error adding client:', err);
      setDialogMessage({ type: 'error', title: 'Error', message: 'Error al agregar cliente' });
      throw err;
    }
  };

  const handleUpdateClient = async (id, updatedClient) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`${config.backendUrl}/api/clients/${id}`, updatedClient, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(clients.map((client) => (client._id === id ? response.data : client)));
      setDialogMessage({ type: 'success', title: 'Éxito', message: 'Cliente actualizado correctamente' });
    } catch (err) {
      console.error('Error updating client:', err);
      setDialogMessage({ type: 'error', title: 'Error', message: 'Error al actualizar cliente' });
      throw err;
    }
  };

  const handleDeleteClient = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) return;
    
    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      await axios.delete(`${config.backendUrl}/api/clients/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(clients.filter((client) => client._id !== id));
      setDialogMessage({ type: 'success', title: 'Éxito', message: 'Cliente eliminado correctamente' });
    } catch (err) {
      console.error('Error deleting client:', err);
      setDialogMessage({ type: 'error', title: 'Error', message: 'Error al eliminar cliente' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen`}>
      {loading && <Loading />}
      <ClientList
        clients={clients}
        onAdd={handleAddClient}
        onUpdate={handleUpdateClient}
        onDelete={handleDeleteClient}
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

export default Clients;