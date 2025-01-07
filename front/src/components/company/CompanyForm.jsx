import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import config from '../../config';
import { ThemeContext } from '../../context/ThemeContext';
import DialogMessage from '../DialogMessage';

const CompanyForm = ({ onClose, onAdd, onUpdate, company }) => {
  const { darkMode } = useContext(ThemeContext);
  const [companyData, setCompanyData] = useState({
    name: '',
    address: '',
    email: '',
    nit: '',
    code: '',
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [dialogMessage, setDialogMessage] = useState({ type: '', title: '', message: '' });

  useEffect(() => {
    if (company) {
      setCompanyData({
        name: company.name,
        address: company.address,
        email: company.email,
        nit: company.nit,
        code: company.code,
        isActive: company.isActive,
      });
    } else {
      setCompanyData((prevData) => ({
        ...prevData,
        code: generateRandomCode(),
      }));
    }
  }, [company]);

  const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({ ...companyData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!companyData.name) newErrors.name = 'El nombre es obligatorio';
    if (!companyData.address) newErrors.address = 'La dirección es obligatoria';
    if (!companyData.email) newErrors.email = 'El correo electrónico es obligatorio';
    if (!companyData.nit) newErrors.nit = 'El NIT es obligatorio';
    return newErrors;
  };

  const handleSaveCompany = async () => {
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
      if (company) {
        await axios.put(`${config.backendUrl}/api/companies/${company._id}`, companyData);
        onUpdate(company._id, companyData);
        setDialogMessage({
          type: 'éxito',
          title: 'Actualización Exitosa',
          message: 'La compañía se ha actualizado correctamente.',
        });
      } else {
        const response = await axios.post(`${config.backendUrl}/api/companies`, companyData);
        onAdd(response.data);
        setDialogMessage({
          type: 'éxito',
          title: 'Creación Exitosa',
          message: 'La compañía se ha creado correctamente.',
        });
      }
    } catch (err) {
      console.error('Error saving company:', err);
      setDialogMessage({
        type: 'error',
        title: 'Error',
        message: 'Error al guardar la compañía. Por favor, inténtelo de nuevo.',
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
        <h2 className="text-2xl font-bold mb-4">{company ? 'Actualizar Empresa' : 'Agregar Empresa'}</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={companyData.name}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          <input
            type="text"
            name="address"
            placeholder="Dirección"
            value={companyData.address}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={companyData.email}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          <input
            type="text"
            name="nit"
            placeholder="NIT"
            value={companyData.nit}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500"
          />
          {errors.nit && <p className="text-red-500 text-sm">{errors.nit}</p>}
          <input
            type="text"
            name="code"
            placeholder="Código"
            value={companyData.code}
            readOnly
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500 bg-gray-200 cursor-not-allowed"
          />
          <div className="flex items-center space-x-2">
            <label htmlFor="isActive" className="block text-sm font-medium">
              Estado
            </label>
            <select
              name="isActive"
              value={companyData.isActive}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-300"
            >
              <option value={true}>Activa</option>
              <option value={false}>Inactiva</option>
            </select>
          </div>
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
            onClick={handleSaveCompany}
            className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            {company ? 'Actualizar' : 'Agregar'}
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

export default CompanyForm;