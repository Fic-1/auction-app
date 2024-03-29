const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);

router.delete('/deleteMe', userController.deleteMe);
router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  // userController.resizeUserPhoto,
  userController.uploadUserPhotoCloud,
  userController.updateMe,
);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);

module.exports = router;
