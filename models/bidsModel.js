const mongoose = require('mongoose');
const validator = require('validator');

const bidSchema = new mongoose.Schema({
  productId: {
    type: String,
  },
  product: String,
  bidder: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Bid must have a user'],
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

bidSchema.pre(/^find/, function (next) {
  this.populate({ path: 'bidder', select: 'name photo' });

  next();
});

const Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;
