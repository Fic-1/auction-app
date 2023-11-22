const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.use(viewController.alerts);

router.get('/', authController.isLoggedIn, viewController.getLandingPage);
router.get('/login', authController.isLoggedIn, viewController.getLoginPage);
router.get('/signup', viewController.getSignupPage);

router.get('/me', authController.protect, viewController.getProfilePage);
// router.get(
//   '/tour/:tourSlug',
//   authController.isLoggedIn,
//   viewController.getTour,
// );
// router.get('/login', authController.isLoggedIn, viewController.getLoginForm);
// router.get('/me', authController.protect, viewController.getAccount);
// router.get('/my-tours', authController.protect, viewController.getMyTours);

module.exports = router;
