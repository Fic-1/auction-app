const express = require('express');
const websocketController = require('../controllers/websocketController');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const productController = require('../controllers/productController');
const productRouter = require('./productRoutes');

const router = express.Router();

// router.use(viewController.alerts);

router.get(
  '/products/:id',
  authController.protect,
  authController.isLoggedIn,
  websocketController.liveBidding,
  viewController.getProduct,
);

router.get(
  '/',
  productController.aliasLatestProducts,
  authController.isLoggedIn,
  viewController.getLandingPage,
);
router.get(
  '/searchResults',
  authController.isLoggedIn,
  viewController.getSearchResults,
);
router.get('/login', authController.isLoggedIn, viewController.getLoginPage);
router.get('/signup', viewController.getSignupPage);

// router.use(authController.protect);

router.get('/me', authController.protect, viewController.getProfilePage);
router.get(
  '/my-products',
  authController.protect,
  viewController.getMyProducts,
);

router
  .route('/my-products/:id/edit')
  .get(
    authController.protect,
    authController.allowEdit,
    viewController.editProduct,
  )
  .patch(
    authController.protect,
    authController.allowEdit,
    productController.uploadProductImages,
    productController.resizeProductImages,
    productController.updateProduct,
  );

router
  .route('/my-products/:id/edit/uploadCover')
  .patch(
    authController.protect,
    authController.allowEdit,
    productController.uploadProductCoverImage,
    productController.resizeProductCoverImage,
    productController.updateProduct,
  );

// router.get('/product', viewController.getProductPage);
// router.get(
//   '/tour/:tourSlug',
//   authController.isLoggedIn,
//   viewController.getTour,
// );
// router.get('/login', authController.isLoggedIn, viewController.getLoginForm);
// router.get('/me', authController.protect, viewController.getAccount);
// router.get('/my-tours', authController.protect, viewController.getMyTours);

module.exports = router;
