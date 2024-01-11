const express = require('express');
const checkoutController = require('./../controllers/checkoutController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get(
  '/checkout-session/:productId',
  checkoutController.getCheckoutSession,
);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(checkoutController.getAllCheckouts)
  .post(checkoutController.createCheckout);

router
  .route('/:id')
  .get(checkoutController.getCheckout)
  .patch(checkoutController.updateCheckout)
  .delete(checkoutController.deleteCheckout);

module.exports = router;
