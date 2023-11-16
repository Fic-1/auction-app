const express = require('express');
const userController = require('../controllers/userController');
const bidController = require('../controllers/bidController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.get('/', bidController.getAllBids);
router.get('/:id', bidController.getBid);
router.post('/', bidController.createBid);
router.patch('/', bidController.addBid, bidController.createBid);

module.exports = router;
