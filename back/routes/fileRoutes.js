const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const fileController = require('../controllers/fileController');

/**
 * @swagger
 * tags:
 *   name: Files
 *   description: File management endpoints
 */

/**
 * @swagger
 * /upload:
 *   post:
 *     tags: [Files]
 *     summary: Upload a file
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FileResponse'
 */
router.post('/upload', upload.single('file'), fileController.uploadFile);

module.exports = router;