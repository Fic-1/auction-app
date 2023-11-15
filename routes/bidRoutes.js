const express = require('express');
const userController = require('../controllers/userController');
const bidController = require('../controllers/bidController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', bidController.getAllBids);
router.post('/', bidController.createBid);

module.exports = router;
