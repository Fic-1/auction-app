const mongoose = require('mongoose');
const validator = require('validator');

const bidSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'Bid must have a product'],
  },
  bidder: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Bid must have a user'],
  },
  amount: {
    type: Number,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;
