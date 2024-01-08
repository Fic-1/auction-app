const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const multer = require('multer');
const sharp = require('sharp');
const factory = require('./handlerFactory');
const Product = require('../models/productsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProductImages = upload.array('photos', 4);
exports.uploadProductCoverImage = upload.single('coverImage');

exports.resizeProductCoverImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  // 1) Cover image
  req.body.coverImage = `product-${
    req.params.id ? req.params.id : req.user.id
  }-${Date.now()}-cover.jpeg`;
  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/products/${req.body.coverImage}`);
  next();
});

exports.resizeProductImages = catchAsync(async (req, res, next) => {
  if (!req.files) return next();
  req.body.photos = [];
  await Promise.all(
    req.files.map(async (file, i) => {
      const filename = `product-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;
      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/products/${filename}`);

      req.body.photos.push(filename);
    }),
  );
  console.log(req.files);
  next();
});

exports.aliasLatestProducts = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-endDate';
  next();
};

exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product);
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);

exports.addSeller = (req, res, next) => {
  req.body.seller = req.user.id;
  if (req.body.coverImage === 'undefined')
    req.body.coverImage = 'default-no-img.png';
  next();
};

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  //* 1) GEt the currently booked tour
  const product = await Product.findById(req.params.productId);
  //* 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: req.user.email,
    client_reference_id: req.params.productId,
    line_items: [
      {
        price_data: {
          currency: 'eur',
          unit_amount: product.currentBid * 100,
          product_data: {
            name: `${product.name}`,
            description: product.summary,
            images: [
              `${req.protocol}://${req.get('host')}/products/${
                product.coverImage
              }`,
            ],
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/product/${product.id}`,
  });
  console.log(
    `${req.protocol}://${req.get('host')}/products/${product.coverImage}`,
  );
  //* 3) Create session as a response
  res.status(200).json({
    status: 'success',
    session,
  });
});

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    res.status(400).send(`Webhook error: ${error.message}`);
  }
};
