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
  console.log('here');
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
