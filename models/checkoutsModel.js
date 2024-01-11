const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'Checkout must belong to a Product!'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Checkout must belong to a User!'],
  },
  price: {
    type: Number,
    require: [true, 'Checkout must have a price for a product.'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

checkoutSchema.pre(/^find/, function (next) {
  this.populate('user').populate({
    path: 'product',
    select: 'name',
  });
  next();
});

const CheckoutRecords = mongoose.model('CheckoutRecords', checkoutSchema);

module.exports = CheckoutRecords;
