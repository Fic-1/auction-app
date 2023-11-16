const express = require('express');
const userController = require('../controllers/userController');
const bidController = require('../controllers/bidController');
const authController = require('../controllers/authController');
const productController = require('../controllers/productController');
const bidRouter = require('./bidRoutes');

const router = express.Router();

router.use('/:id/bids', bidRouter);

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);
router.post('/', authController.protect, productController.createProduct);

module.exports = router;
