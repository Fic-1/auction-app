const factory = require('./handlerFactory');
const Bid = require('../models/bidsModel');

exports.getAllBids = factory.getAll(Bid);
exports.getBid = factory.getOne(Bid);
exports.createBid = factory.createOne(Bid);
