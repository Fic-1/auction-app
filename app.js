const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRoutes');
const bidRouter = require('./routes/bidRoutes');
const productRouter = require('./routes/productRoutes');
const AppError = require('./utils/appError');

const app = express();

//* Postavljanje pug-a
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

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

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/bids', bidRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(morgan('dev'));

module.exports = app;

//TODO: Create routes
//TODO: Create controllers
//TODO: Add more data to DB
//TODO: Create templates
