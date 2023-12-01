const WebSocket = require('ws');
const startWebSocketServer = require('../webSocketServer');
const Product = require('../models/productsModel');
const { getAllProducts } = require('./productController');
const AppError = require('../utils/appError');

const formatDate = (date = new Date()) => {
  const year = date.toLocaleString('default', { year: 'numeric' });
  const month = date.toLocaleString('default', {
    month: '2-digit',
  });
  const day = date.toLocaleString('default', { day: '2-digit' });
  const hour = date.toLocaleString('default', { hour: '2-digit' });
  const minute = date.toLocaleString('default', { minute: '2-digit' });
  const time = ` - ${hour}:${minute}`;

  return [day, month, year, time].join('');
};
const wss = startWebSocketServer({ port: 8080 });

exports.liveBidding = async (req, res, next) => {
  console.log('querying db...');
  const product = await Product.findOne({ _id: req.params.id });
  console.log('product found');
  const _activeBids = [];
  product.bids.forEach((bid) => {
    _activeBids.push(bid);
  });

  wss.on('connection', (ws) => {
    const currentUser = req.user;
    // console.log('Current user:', req.headers);
    if (!req.user) next(new AppError('Login to start bidding', 400));
    ws.send(JSON.stringify({ type: 'initialBids', _activeBids }));
    ws.isAlive = true;

    ws.on('message', (data) => {
      // Process the message if needed

      // For example, if you receive a new bid from a client, update the database
      // and broadcast the new bid to all connected clients

      const newBid = JSON.parse(data);
      // console.log(newBid);
      if (
        product.bids.length > 0 &&
        newBid.amount <= _activeBids.at(-1).amount
      ) {
        ws.send('Bid must be a larger amount than the current bid.');
        return;
      }
      newBid.amount *= 1;
      if (!newBid.amount) {
        ws.send('Bid must be a number!');
        return;
      }
      _activeBids.push(newBid);

      console.log(`Received message: ${data} from user ${req.user.email}`);
      // Broadcast the new bid to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'newBid', bid: newBid }));
        }
      });
    });
    // console.log('received: %s', data);
    // console.log(`Time: ${formatDate()}`);

    // console.log(_activeBids);
  });

  // const interval = setInterval(() => {
  //   wss.clients.forEach((ws) => {
  //     if (ws.isAlive === false) return ws.terminate();

  //     ws.isAlive = false;
  //     ws.ping();
  //   });
  // }, 30000);

  wss.on('close', () => {
    console.log('connection closed');
    clearInterval(interval);
  });

  next();
};
// exports.getUserData = (req, res, next) => {};
