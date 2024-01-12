const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const userRouter = require('./routes/userRoutes');
const bidRouter = require('./routes/bidRoutes');
const productRouter = require('./routes/productRoutes');
const viewRouter = require('./routes/viewRoutes');
const checkoutRouter = require('./routes/checkoutRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const checkoutController = require('./controllers/checkoutController');

const app = express();

app.enable('trust proxy');

//* Postavljanje pug-a
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());

app.options('*', cors()); //? options <-- HTTP method __ Pre flight phase

app.post(
  '/webhook-checkout',
  express.raw({ type: 'application/json' }),
  checkoutController.webhookCheckout,
);

//?Body parse, reading data frm body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(
  express.urlencoded({
    extended: true,
    limit: '10kb',
  }),
);
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use(compression());

const limiter = rateLimit({
  max: 100, //? 100 request from the same IP
  windowMs: 60 * 60 * 1000, //? 1 hour
  message: 'Too many request from this IP, please try again in an hour!',
});
app.use('/api', limiter);

app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/bids', bidRouter);
app.use('/api/v1/checkouts', checkoutRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

//TODO: Update MODEL with adress
//TODO: Add wonAuctionsPage
//TODO: Add webhook after deployment
