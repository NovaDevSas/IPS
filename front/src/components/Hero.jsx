import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollOffset(window.pageYOffset);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <section
      id="home"
      className="relative text-white text-center py-40 px-6 overflow-hidden min-h-screen flex items-center justify-center"
    >
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>

      {/* Contenido del Hero */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Nova Dev
        </motion.h1>
        <motion.p
          className="text-lg mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Transforming ideas into reality with cutting-edge AI solutions and innovative software.
        </motion.p>

        {/* Botón con animación */}
        <motion.button
          className="bg-[#5e1ddd] hover:bg-purple-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLoginRedirect}
        >
          Get Started
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;