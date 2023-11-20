const factory = require('./handlerFactory');
const Product = require('../models/productsModel');

exports.aliasLatestProducts = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-endDate';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product);
exports.createProduct = factory.createOne(Product);
