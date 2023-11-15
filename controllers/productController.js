const factory = require('./handlerFactory');
const Product = require('../models/productsModel');

exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product);
exports.createProduct = factory.createOne(Product);
