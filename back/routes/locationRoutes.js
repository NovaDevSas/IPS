const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Location management endpoints
 */

/**
 * @swagger
 * /locations:
 *   get:
 *     tags: [Locations]
 *     summary: Get all locations
 *     responses:
 *       200:
 *         description: A list of locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 */
router.get('/locations', locationController.getLocations);

/**
 * @swagger
 * /locations:
 *   post:
 *     tags: [Locations]
 *     summary: Add a new location
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       200:
 *         description: Location added successfully
 */
router.post('/locations', locationController.addLocation);

/**
 * @swagger
 * /locations/{id}:
 *   put:
 *     tags: [Locations]
 *     summary: Update a location
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
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       200:
 *         description: Location updated successfully
 */
router.put('/locations/:id', locationController.updateLocation);

/**
 * @swagger
 * /locations/{id}:
 *   delete:
 *     tags: [Locations]
 *     summary: Delete a location
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Location deleted successfully
 */
router.delete('/locations/:id', locationController.deleteLocation);

module.exports = router;