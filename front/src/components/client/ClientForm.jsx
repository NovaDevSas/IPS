import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import config from '../../config';
import { ThemeContext } from '../../context/ThemeContext';
import DialogMessage from '../DialogMessage';

const ClientForm = ({ onClose, onAdd, onUpdate, client }) => {
  const { darkMode } = useContext(ThemeContext);
  const [clientData, setClientData] = useState({
    name: '',
    secondName: '',
    lastName: '',
    secondLastName: '',
    documentType: '',
    documentNumber: '',
    birthDate: '',
    birthCity: '',
    company: '',
    activity: '',
    address: '',
    city: '',
    phones: [''],
    department: '',
    residenceCity: '',
    maritalStatus: '',
    gender: '',
    email: '',
    profession: '',
    registrationDate: '',
    educationLevel: '',
    EPS: '',
    ARL: '',
    userType: '',
    affiliateType: '',
    residenceZone: '',
    responsiblePersonData: {},
    companionData: {},
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [dialogMessage, setDialogMessage] = useState({ type: '', title: '', message: '' });

  useEffect(() => {
    if (client) {
      setClientData(client);
    }
  }, [client]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!clientData.name) newErrors.name = 'El nombre es obligatorio';
    if (!clientData.lastName) newErrors.lastName = 'El apellido es obligatorio';
    if (!clientData.documentType) newErrors.documentType = 'El tipo de documento es obligatorio';
    if (!clientData.documentNumber) newErrors.documentNumber = 'El número de documento es obligatorio';
    if (!clientData.birthDate) newErrors.birthDate = 'La fecha de nacimiento es obligatoria';
    if (!clientData.email) newErrors.email = 'El correo electrónico es obligatorio';
    return newErrors;
  };

  const handleSaveClient = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setDialogMessage({
        type: 'error',
        title: 'Error de Validación',
        message: 'Por favor, complete todos los campos obligatorios.',
      });
      return;
    }

    setLoading(true);
    setDialogMessage({ type: '', title: '', message: '' });
    try {
      if (client) {
        await axios.put(`${config.backendUrl}/api/clients/${client._id}`, clientData);
        onUpdate(client._id, clientData);
        setDialogMessage({
          type: 'éxito',
          title: 'Actualización Exitosa',
          message: 'El cliente se ha actualizado correctamente.',
        });
      } else {
        const response = await axios.post(`${config.backendUrl}/api/clients`, clientData);
        onAdd(response.data);
        setDialogMessage({
          type: 'éxito',
          title: 'Creación Exitosa',
          message: 'El cliente se ha creado correctamente.',
        });
      }
    } catch (err) {
      console.error('Error saving client:', err);
      setDialogMessage({
        type: 'error',
        title: 'Error',
        message: 'Error al guardar el cliente. Por favor, inténtelo de nuevo.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setDialogMessage({ type: '', title: '', message: '' });
    if (dialogMessage.type === 'éxito') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className={`p-6 rounded-lg shadow-lg w-full max-w-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        <h2 className="text-2xl font-bold mb-4">{client ? 'Actualizar Cliente' : 'Agregar Cliente'}</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={clientData.name}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          <input
            type="text"
            name="secondName"
            placeholder="Segundo Nombre"
            value={clientData.secondName}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Apellido"
            value={clientData.lastName}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          <input
            type="text"
            name="secondLastName"
            placeholder="Segundo Apellido"
            value={clientData.secondLastName}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          <input
            type="text"
            name="documentType"
            placeholder="Tipo de Documento"
            value={clientData.documentType}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          {errors.documentType && <p className="text-red-500 text-sm">{errors.documentType}</p>}
          <input
            type="text"
            name="documentNumber"
            placeholder="Número de Documento"
            value={clientData.documentNumber}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          {errors.documentNumber && <p className="text-red-500 text-sm">{errors.documentNumber}</p>}
          <input
            type="date"
            name="birthDate"
            placeholder="Fecha de Nacimiento"
            value={clientData.birthDate}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate}</p>}
          <input
            type="text"
            name="birthCity"
            placeholder="Ciudad de Nacimiento"
            value={clientData.birthCity}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          <input
            type="text"
            name="company"
            placeholder="Empresa"
            value={clientData.company}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          <input
            type="text"
            name="activity"
            placeholder="Actividad"
            value={clientData.activity}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          <input
            type="text"
            name="address"
            placeholder="Dirección"
            value={clientData.address}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          <input
            type="text"
            name="city"
            placeholder="Ciudad"
            value={clientData.city}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          <input
            type="text"
            name="phones"
            placeholder="Teléfonos"
            value={clientData.phones}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          <input
            type="text"
            name="department"
            placeholder="Departamento"
            value={clientData.department}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          <input
            type="text"
            name="residenceCity"
            placeholder="Ciudad de Residencia"
            value={clientData.residenceCity}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          <input
            type="text"
            name="maritalStatus"
            placeholder="Estado Civil"
            value={clientData.maritalStatus}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          <input
            type="text"
            name="gender"
            placeholder="Género"
            value={clientData.gender}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={clientData.email}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          <input
            type="text"
            name="profession"
            placeholder="Profesión"
            value={clientData.profession}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          <input
            type="date"
            name="registrationDate"
            placeholder="Fecha de Registro"
            value={clientData.registrationDate}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          <input
            type="text"
            name="educationLevel"
            placeholder="Nivel Educativo"
            value={clientData.educationLevel}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          <input
            type="text"
            name="EPS"
            placeholder="EPS"
            value={clientData.EPS}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          <input
            type="text"
            name="ARL"
            placeholder="ARL"
            value={clientData.ARL}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          <input
            type="text"
            name="userType"
            placeholder="Tipo de Usuario"
            value={clientData.userType}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          <input
            type="text"
            name="affiliateType"
            placeholder="Tipo de Afiliado"
            value={clientData.affiliateType}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          <input
            type="text"
            name="residenceZone"
            placeholder="Zona de Residencia"
            value={clientData.residenceZone}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          <input
            type="text"
            name="responsiblePersonData"
            placeholder="Datos de la Persona Responsable"
            value={clientData.responsiblePersonData}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          <input
            type="text"
            name="companionData"
            placeholder="Datos del Acompañante"
            value={clientData.companionData}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSaveClient}
            className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            {client ? 'Actualizar' : 'Agregar'}
          </button>
        </div>
        {loading && <div className="text-center mt-4">Guardando...</div>}
        {dialogMessage.message && (
          <DialogMessage
            title={dialogMessage.title}
            message={dialogMessage.message}
            type={dialogMessage.type}
            onClose={handleCloseDialog}
          />
        )}
      </div>
    </div>
  );
};

export default ClientForm;