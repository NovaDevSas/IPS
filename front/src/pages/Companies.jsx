import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import config from '../config';
import { ThemeContext } from '../context/ThemeContext';
import CompanyList from '../components/company/CompanyList';
import Loading from '../components/Loading';

const Companies = () => {
  const { darkMode } = useContext(ThemeContext);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.backendUrl}/api/companies`);
      setCompanies(response.data);
    } catch (err) {
      console.error('Error fetching companies:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleAddCompany = async (newCompany) => {
    try {
      const response = await axios.post(`${config.backendUrl}/api/companies`, newCompany);
      setCompanies([...companies, response.data]);
    } catch (err) {
      console.error('Error adding company:', err);
    }
  };

  const handleUpdateCompany = async (id, updatedCompany) => {
    try {
      const response = await axios.put(`${config.backendUrl}/api/companies/${id}`, updatedCompany);
      setCompanies(companies.map((company) => (company._id === id ? response.data : company)));
    } catch (err) {
      console.error('Error updating company:', err);
    }
  };

  const handleDeleteCompany = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta empresa?')) {
      setLoading(true);
      try {
        await axios.delete(`${config.backendUrl}/api/companies/${id}`);
        setCompanies(companies.filter((company) => company._id !== id));
      } catch (err) {
        console.error('Error deleting company:', err);
      }
      setLoading(false);
    }
  };

  return (
    <div className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen`}>
      {loading && <Loading />}
      <CompanyList
        companies={companies}
        onAdd={handleAddCompany}
        onUpdate={handleUpdateCompany}
        onDelete={handleDeleteCompany}
      />
    </div>
  );
};

export default Companies;