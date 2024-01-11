const factory = require('./handlerFactory');
const Bid = require('../models/bidsModel');
const Product = require('../models/productsModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllBids = factory.getAll(Bid);
exports.getBid = factory.getOne(Bid);
exports.createBid = factory.createOne(Bid);

exports.addBid = catchAsync(async (req, res, next) => {
  const currentBid = req.body.amount;
  const addedBid = { bidder: req.user.email, amount: currentBid };
  const doc = await Product.findOne({ _id: req.params.id });
  if (doc.startingBid > currentBid)
    return next(
      new AppError('Bid must be a larger amount than the starting bid.', 400),
    );
  if (doc.bids.length > 0 && currentBid <= doc.bids.at(-1).amount) {
    return next(
      new AppError('Bid must be a larger amount than the current bid.', 400),
    );
  }
  doc.currentBid = currentBid;
  doc.bids.push(addedBid);
  await doc.save({ validateBeforeSave: false });
  const newBid = await Bid.create({
    productId: req.params.id,
    product: doc.name,
    bidder: req.user.id,
    amount: currentBid,
  });
  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});
