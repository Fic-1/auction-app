const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product must have a name'],
  },
  description: {
    type: String,
  },
  startingBid: {
    type: Number,
    required: [true, 'Product must have a starting bid'],
  },
  currentBid: {
    type: Number,
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Product must have a seller'],
  },
  bids: [
    {
      bidder: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Bid must have a bidder'],
      },
      type: mongoose.Schema.ObjectId,
      ref: 'Bid',
      required: [true, 'Bid must have an amount'],
    },
    // Additional bid history
  ],
  endDate: {
    type: Date,
    default: Date.now() + 1000 * 60 * 60 * 24 * 3,
  },
  // Additional product details
});

productSchema.pre(/^find/, function (next) {
  //   this.populate({ path: 'user', select: 'name photo' });
  //   this.populate({ path: 'tour', select: 'name' });

  this.populate({ path: 'seller', select: 'name photo' });
  this.populate({ path: 'bids', select: 'amount' });

  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
