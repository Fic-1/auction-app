const User = require('../models/usersModel');
const Product = require('../models/productsModel');
const Bid = require('../models/bidsModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.getLandingPage = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const products = await features.query;

  res.status(200).render('landing', {
    title: 'Welcome !',
    products,
  });
});

exports.getSearchResults = catchAsync(async (req, res, next) => {
  const results = Product.find({
    name: { $regex: req.query.name, $options: 'i' },
  });
  req.query.sort = '-endDate';
  const features = new APIFeatures(results, req.query)
    .sort()
    .limitFields()
    .paginate();
  const products = await features.query;

  res.status(200).render('searchResults', {
    title: 'Search results',
    count: results.length,
    products,
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  //* 1) Get data for requested tour (including revires and tour guides)
  const product = await Product.findOne({ _id: req.params.id });

  if (!product)
    return next(new AppError('There is no product with that name.', 404));

  // const users = await User.find();
  //* 2) build template
  //* 3) Render the template using the data from 1)
  res.status(200).render('productPage', {
    title: `${product.name}`,
    product,
  });
});

exports.getLoginPage = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Log in',
  });
});

exports.getSignupPage = catchAsync(async (req, res, next) => {
  res.status(200).render('signup', {
    title: 'Sign up',
  });
});

exports.getProfilePage = catchAsync(async (req, res, next) => {
  res.status(200).render('profile', {
    title: 'My profile',
  });
});

exports.getProductPage = catchAsync(async (req, res, next) => {
  res.status(200).render('productPage', {
    title: 'Name of a product',
  });
});
