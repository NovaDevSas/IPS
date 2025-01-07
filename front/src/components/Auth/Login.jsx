import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';
import illustration from '../../assets/homepage-illustration.png';
import axios from 'axios';
import config from '../../config';
import { AuthContext } from '../../context/AuthContext';
import DialogMessage from '../DialogMessage';

const Login = ({ toggleDarkMode, darkMode, setIsLogin, setIsForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dialogMessage, setDialogMessage] = useState({ type: '', title: '', message: '' });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.backendUrl}/api/auth/login`, { email, password });
      login(response.data.token);
      setDialogMessage({
        type: 'éxito',
        title: 'Inicio de Sesión Exitoso',
        message: 'Has iniciado sesión correctamente.',
      });
      setTimeout(() => {
        navigate('/app/services'); // Redirigir a la página de servicios
      }, 1000);
    } catch (err) {
      setDialogMessage({
        type: 'error',
        title: 'Error',
        message: 'Credenciales inválidas. Por favor, inténtelo de nuevo.',
      });
    }
  };

  const handleCloseDialog = () => {
    setDialogMessage({ type: '', title: '', message: '' });
  };

  return (
    <div className={`flex flex-col lg:flex-row h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' : 'bg-gradient-to-br from-gray-100 to-white text-gray-900'}`}>
      <div className="absolute top-4 right-4">
        <label className="flex items-center space-x-3 cursor-pointer">
          <div className="flex items-center">
            {darkMode ? <FaMoon className="text-primary w-6 h-6" /> : <FaSun className="text-yellow-400 w-6 h-6" />}
          </div>
          <div className="relative w-12 h-6 bg-gray-300 rounded-full shadow-inner cursor-pointer transition duration-300" onClick={toggleDarkMode}>
            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${darkMode ? 'translate-x-6 bg-primary' : 'translate-x-0 bg-yellow-400'}`}></div>
          </div>
        </label>
      </div>

      <div className="hidden lg:flex lg:w-1/2 h-full items-center justify-center relative overflow-hidden">
        <img src={illustration} alt="Futuristic Medical Scene" className="h-full w-full object-cover object-top opacity-90 animate-float" />
      </div>

      <div className="lg:w-1/2 h-full flex flex-col items-center justify-center px-6 py-12 lg:px-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-wide">Bienvenido a IPS MedicSalud Sabana</h1>
          <p className="text-lg lg:text-xl mt-4">Innovación y cuidado al alcance de tu mano</p>
        </div>

        <div className={`w-full max-w-sm p-8 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
          <form onSubmit={handleLogin} className="w-full">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-2 mb-4 border rounded ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'}`}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 mb-4 border rounded ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'}`}
            />
            <button type="submit" className="w-full p-2 bg-primary text-white rounded">Iniciar Sesión</button>
          </form>
          {dialogMessage.message && (
            <DialogMessage
              title={dialogMessage.title}
              message={dialogMessage.message}
              type={dialogMessage.type}
              onClose={handleCloseDialog}
            />
          )}
          <button onClick={() => setIsForgotPassword(true)} className="mt-4 text-primary hover:underline transition">¿Olvidaste tu contraseña?</button>
          <p className="mt-4 text-gray-400">
            ¿No tienes cuenta?{" "}
            <button onClick={() => setIsLogin(false)} className="text-primary hover:underline transition">Regístrate</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;