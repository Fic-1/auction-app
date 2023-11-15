const express = require('express');
const userController = require('../controllers/userController');
const bidController = require('../controllers/bidController');
const authController = require('../controllers/authController');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);

module.exports = router;
