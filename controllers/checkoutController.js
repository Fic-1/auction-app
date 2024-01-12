const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const CheckoutRecords = require('../models/checkoutsModel');
const User = require('../models/usersModel');
const Product = require('../models/productsModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

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
    success_url: `${req.protocol}://${req.get('host')}/?alert=booking`,
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

const createCheckoutRecord = async (session) => {
  const product = session.client_reference_id;
  const user = (await User.findOne({ email: session.customer_email })).id;
  const price = session.display_items[0].amount / 100;
  await CheckoutRecords.create({ product, user, price });
  console.log('Created record with:', product, user, price);
};

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

  if (event.type === 'checkout.session.completed')
    createCheckoutRecord(event.data.object);

  res.status(200).json({ received: true });
};

exports.createCheckout = factory.createOne(CheckoutRecords);
exports.getCheckout = factory.getOne(CheckoutRecords);
exports.getAllCheckouts = factory.getAll(CheckoutRecords);
exports.updateCheckout = factory.updateOne(CheckoutRecords);
exports.deleteCheckout = factory.deleteOne(CheckoutRecords);
