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
