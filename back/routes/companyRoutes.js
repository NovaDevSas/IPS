const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Company management endpoints
 */

/**
 * @swagger
 * /companies:
 *   get:
 *     tags: [Companies]
 *     summary: Get all companies
 *     responses:
 *       200:
 *         description: A list of companies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 */
router.get('/companies', companyController.getCompanies);

/**
 * @swagger
 * /companies:
 *   post:
 *     tags: [Companies]
 *     summary: Add a new company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       200:
 *         description: Company added successfully
 */
router.post('/companies', companyController.addCompany);

/**
 * @swagger
 * /companies/{id}:
 *   put:
 *     tags: [Companies]
 *     summary: Update a company
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
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       200:
 *         description: Company updated successfully
 */
router.put('/companies/:id', companyController.updateCompany);

/**
 * @swagger
 * /companies/{id}:
 *   delete:
 *     tags: [Companies]
 *     summary: Delete a company
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Company deleted successfully
 */
router.delete('/companies/:id', companyController.deleteCompany);

module.exports = router;