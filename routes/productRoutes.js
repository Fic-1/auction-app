const express = require('express');
const userController = require('../controllers/userController');
const bidController = require('../controllers/bidController');
const authController = require('../controllers/authController');
const productController = require('../controllers/productController');
const bidRouter = require('./bidRoutes');

const router = express.Router();

router.use('/:id/bids', bidRouter);

router
  .route('/5-latest')
  .get(productController.aliasLatestProducts, productController.getAllProducts);

router.get('/', productController.getAllProducts);
router.route('/:id').get(productController.getProduct);
router.post('/', authController.protect, productController.createProduct);
router.post(
  '/create-my-product',
  authController.protect,
  productController.uploadProductCoverImage,
  productController.resizeProductCoverImage,
  productController.addSeller,
  productController.createProduct,
);

module.exports = router;
