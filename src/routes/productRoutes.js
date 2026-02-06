const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The products managing API
 */

/**
 * @swagger
 * /product/search:
 *   get:
 *     summary: Returns the list of all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items to return
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Fields to include
 *       - in: query
 *         name: match
 *         schema:
 *           type: string
 *         description: Match filter
 *       - in: query
 *         name: category_ids
 *         schema:
 *           type: string
 *         description: Category IDs
 *       - in: query
 *         name: price_range
 *         schema:
 *           type: string
 *         description: Price range
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 total:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 page:
 *                   type: integer
 */
router.get('/search', ProductController.search);

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: The product was not found
 */
router.get('/:id', ProductController.getById);

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/', authMiddleware, ProductController.create);

/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: Update the product by the id
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       204:
 *         description: The product was updated
 *       404:
 *         description: The product was not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authMiddleware, ProductController.update);

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Remove the product by id
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product id
 *     responses:
 *       204:
 *         description: The product was deleted
 *       404:
 *         description: The product was not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authMiddleware, ProductController.delete);

module.exports = router;
