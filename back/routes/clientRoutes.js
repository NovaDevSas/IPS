const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/clients', authMiddleware, clientController.getClients);
router.post('/clients', authMiddleware, clientController.addClient);
router.put('/clients/:id', authMiddleware,  clientController.updateClient);
router.delete('/clients/:id', authMiddleware, clientController.deleteClient);

module.exports = router;