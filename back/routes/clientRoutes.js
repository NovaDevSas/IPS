const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Client management endpoints
 */

/**
 * @swagger
 * /clients:
 *   get:
 *     tags: [Clients]
 *     summary: Get all clients
 *     responses:
 *       200:
 *         description: A list of clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 */
router.get('/clients', authMiddleware, clientController.getClients);

/**
 * @swagger
 * /clients:
 *   post:
 *     tags: [Clients]
 *     summary: Add a new client
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       200:
 *         description: Client added successfully
 */
router.post('/clients', authMiddleware, clientController.addClient);

/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     tags: [Clients]
 *     summary: Update a client
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       200:
 *         description: Client updated successfully
 */
router.put('/clients/:id', authMiddleware, clientController.updateClient);

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     tags: [Clients]
 *     summary: Delete a client
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client deleted successfully
 */
router.delete('/clients/:id', authMiddleware, clientController.deleteClient);

module.exports = router;