module.exports = {
  darkMode: 'class', // Habilitar modo oscuro basado en clases
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6b46c1", // Nuevo color principal (morado)
        "primary-dark": "#553c9a", // Versión oscura del morado
        "primary-light": "#b794f4", // Versión clara del morado
        "primary-contrast": "#ffffff", // Contraste para textos sobre fondo morado
        "primary-bg": "#faf5ff", // Fondo personalizado claro para el tema morado
        "secondary": "#4fd1c5", // Verde secundario
        "secondary-dark": "#38a89d",
        "secondary-light": "#81e6d9",
        "secondary-contrast": "#ffffff",
        "background-dark": "#1a202c", // Fondo oscuro general
        "background-light": "#f7fafc", // Fondo claro general
      },
      boxShadow: {
        "primary": "0 4px 6px rgba(107, 70, 193, 0.4)", // Sombra para componentes principales
        "primary-hover": "0 6px 8px rgba(107, 70, 193, 0.5)",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateY(-50%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        slideIn: "slideIn 0.5s ease-out",
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.5rem",
      },
      fontFamily: {
        body: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
