import React, { useState } from 'react';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import ResetPassword from '../components/Auth/ResetPassword';

const Home = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div>
      {isForgotPassword ? (
        <ResetPassword toggleDarkMode={toggleDarkMode} darkMode={darkMode} setIsLogin={setIsLogin} setIsForgotPassword={setIsForgotPassword} />
      ) : isLogin ? (
        <Login toggleDarkMode={toggleDarkMode} darkMode={darkMode} setIsLogin={setIsLogin} setIsForgotPassword={setIsForgotPassword} />
      ) : (
        <Register toggleDarkMode={toggleDarkMode} darkMode={darkMode} setIsLogin={setIsLogin} />
      )}
    </div>
  );
};

export default Home;