const WebSocket = require('ws');
const startWebSocketServer = require('../webSocketServer');
const server = require('../server');
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

let product;
let userData;
let serverState = {};
let _activeBids = [];
let rooms = {};

const wss = startWebSocketServer({ port: '8080' });

exports.liveBidding = async (req, res, next) => {
  userData = req.user;
  console.log('querying db...');
  product = await Product.findOne({ _id: req.params.id });
  console.log(`product ${product.name} found`);
  if (!serverState[product._id]) {
    serverState[product._id] = {};
    serverState[product._id].clients = new Set();
    serverState[product._id]._activeBids = [];
  }
  if (wss.clients.size < 1 && _activeBids.length < product.bids.length) {
    product.bids.forEach((bid) => {
      serverState[product._id]._activeBids.push(bid);
      _activeBids.push(bid);
    });
  }
  // if (!rooms[product._id]) rooms[product._id] = new Set();
  next();
};

wss.on('connection', (ws) => {
  // console.log('Current user:', req.headers);
  // if (!user) next(new AppError('Login to start bidding', 400));
  // rooms[product._id].add(userData.email);
  serverState[product._id].clients.add(wss);
  ws.send(
    JSON.stringify({
      type: 'initialBids',
      _activeBids: serverState[product._id]._activeBids,
    }),
  );
  ws.isAlive = true;

  ws.on('message', (data) => {
    console.log(serverState);
    // Process the message if needed

    // For example, if you receive a new bid from a client, update the database
    // and broadcast the new bid to all connected clients

    const newBid = JSON.parse(data);
    // console.log(newBid);
    if (
      product.bids.length > 0 &&
      newBid.amount <= serverState[product._id]._activeBids.at(-1).amount
    ) {
      ws.send('Bid must be a larger amount than the current bid.');
      return;
    }
    newBid.amount *= 1;
    if (!newBid.amount) {
      ws.send('Bid must be a number!');
      return;
    }
    // _activeBids.push(newBid);
    serverState[product._id]._activeBids.push(newBid);
    // console.log(_activeBids);

    // console.log(`Received message: ${data} from user ${userData}`);
    // Broadcast the new bid to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'newBid', bid: newBid }));
      }
    });
  });
});

wss.on('close', () => {
  rooms[product._id].delete(userData.email);
});
