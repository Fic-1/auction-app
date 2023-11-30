// const WebSocket = require('ws');
const server = require('../server');
const User = require('../models/usersModel');
const Product = require('../models/productsModel');
const Bid = require('../models/bidsModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

// exports.startWebsocket = (req, res, next) => {
//   console.log(wss);
//   wss.on('connection', (ws) => {
//     ws.on('message', (data) => {
//       console.log('received: %s', data);
//     });

//     ws.send('something');
//   });
//   next();
// };

// exports.shutdown(exitCode = 0) {
// Close WebSocket connections
//   wss.clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.close();
//     }
//   });

// Close the WebSocket server
//   wss.close(() => {
//     console.log('WebSocket server closed.');

// Close the HTTP server
//     server.close(() => {
//       console.log('HTTP server closed. Exiting process.');
//       process.exit(exitCode);
//     });
//   });
// }

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
    query: req.query,
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  //* 1) Get data for requested tour (including revires and tour guides)
  const product = await Product.findOne({ _id: req.params.id });
  res.cookie('user', req.user.email, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    SameSite: 'Lax',
  });
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
