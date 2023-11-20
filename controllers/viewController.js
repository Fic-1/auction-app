const User = require('../models/usersModel');
const Product = require('../models/productsModel');
const Bid = require('../models/bidsModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getLandingPage = catchAsync(async (req, res, next) => {
  //* 1) Get tour data from the collection
  const products = await Product.find();
  //TODO: Napraviti funkcionalnost da se dobije limitiran broj rezultata za landing page (npr top-5)
  //* 2) Build template

  //* 3) Render template using the tour data from 1)
  res.status(200).render('landing', {
    title: '--',
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
