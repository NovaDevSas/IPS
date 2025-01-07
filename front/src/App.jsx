import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Companies from './pages/Companies';
import Collaborators from './pages/Collaborators';
import Layout from './components/Layout';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Logout from './pages/Logout';
import Hero from './components/Hero';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Services from './pages/Services';
import Login from './pages/Login';
import Unauthorized from './pages/Unauthorized';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/app" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="clients" element={<Clients />} />
              <Route path="services" element={<Services />} />
              <Route path="backoffice/companies" element={<Companies />} />
              <Route path="backoffice/collaborators" element={<Collaborators />} />
              <Route path="logout" element={<Logout />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;