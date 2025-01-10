require('dotenv').config();
const fs = require('fs'); // Importar fs para leer los certificados
const https = require('https'); // Importar https para habilitar HTTPS
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const companyRoutes = require('./routes/companyRoutes');
const clientRoutes = require('./routes/clientRoutes');
const locationRoutes = require('./routes/locationRoutes');
const fileRoutes = require('./routes/fileRoutes'); // Importar las rutas de archivos
const errorHandler = require('./middleware/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

const app = express();
const port = process.env.PORT || 3001;

// Connect to database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', companyRoutes);
app.use('/api', clientRoutes);
app.use('/api', locationRoutes);
app.use('/api/files', fileRoutes); // Usar las rutas de archivos

// Error handling middleware
app.use(errorHandler);

// Configurar HTTPS
const sslOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/backendips.novadevsas.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/backendips.novadevsas.com/fullchain.pem'),
};

// Iniciar el servidor HTTPS
https.createServer(sslOptions, app).listen(443, () => {
  console.log(`HTTPS Server is running on https://backendips.novadevsas.com`);
});

// Opcional: Redirigir HTTP a HTTPS
const http = require('http');
http.createServer((req, res) => {
  res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
  res.end();
}).listen(80);
