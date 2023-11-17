const mongoose = require('mongoose');
const validator = require('validator');
const AppError = require('../utils/appError');

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
    default: function () {
      return this.startingBid;
    },
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Product must have a seller'],
  },
  bids: [
    {
      bidder: String,
      amount: Number,
    },
    // Additional bid history
  ],
  endDate: {
    type: Date,
    default: Date.now() + 1000 * 60 * 60 * 24 * 3,
  },
  // Additional product details
});

// productSchema.pre('save', function (next) {
//   const { currentBid } = this;
//   const { bids } = this;
//   console.log(bids.at(-1));
//   // Assuming bids is an array
//   if (bids.length > 0 && currentBid <= bids.at(-1).amount) {
//   }

//   next();
// });

productSchema.pre(/^find/, function (next) {
  //   this.populate({ path: 'user', select: 'name photo' });
  //   this.populate({ path: 'tour', select: 'name' });

  this.populate({ path: 'seller', select: 'name photo' });
  this.populate({ path: 'bids', select: 'amount' });

  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
