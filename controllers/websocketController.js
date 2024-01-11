const WebSocket = require('ws');
const startWebSocketServer = require('../webSocketServer');
const Product = require('../models/productsModel');
const User = require('../models/usersModel');
const catchAsync = require('../utils/catchAsync');
const Email = require('../utils/email');

let protocol;
let host;
let product;
let remainingTime;
let userData;
const serverState = {};
let activeConnections = 0;

const sendEmailToUser = catchAsync(async (user, url, type) => {
  console.log(user);
  const userDataMail = await User.findOne({ email: user });
  if (type === 'outbid') await new Email(userDataMail, url).outBidded();
  if (type === 'won') await new Email(userDataMail, url).auctionWon();
});

/* UPDATING DATABASE WITH NEW BIDS */
const updateProductBidsInDB = catchAsync(async () => {
  if (serverState[product._id]._newBids.length === 0) {
    console.log('No new bids!');
    return;
  }
  console.log('Updating DB ...');
  Object.keys(serverState).forEach(async (productId) => {
    const currentBid = serverState[productId]._activeBids.at(-1).amount;
    const doc = await Product.findOne({ _id: productId });
    if (doc.startingBid > currentBid) return;
    if (doc.bids.length > 0 && currentBid <= doc.bids.at(-1).amount) return;
    doc.currentBid = currentBid;
    doc.bids.push(...serverState[productId]._newBids);
    doc.emailSent = serverState[productId].emailSent;
    await doc.save({ validateBeforeSave: false });
    serverState[productId]._newBids = [];
  });
  console.log('------Completed-------');
});

const wss = startWebSocketServer({ port: '8080' });

exports.liveBidding = async (req, res, next) => {
  protocol = req.protocol;
  host = req.get('host');
  userData = req.user;
  product = await Product.findOne({ _id: req.params.id });
  remainingTime = product.endDate - Date.now();
  if (!serverState[product._id]) {
    serverState[product._id] = {};
    serverState[product._id].clients = new Set();
    serverState[product._id]._activeBids = [];
    serverState[product._id]._newBids = [];
    serverState[product._id].emailSent = product.emailSent;
  }
  if (
    wss.clients.size < 1 &&
    serverState[product._id]._activeBids.length < product.bids.length
  ) {
    product.bids.forEach((bid) => {
      serverState[product._id]._activeBids.push(bid);
    });
  }
  next();
};

wss.on('connection', (ws) => {
  if (serverState[product._id]) serverState[product._id].clients.add(wss);
  activeConnections++;
  ws.send(
    JSON.stringify({
      type: 'initialBids',
      _activeBids: serverState[product._id]._activeBids,
    }),
  );
  if (remainingTime < 0) {
    ws.send(
      JSON.stringify({
        type: 'over',
        message: 'Auction has ended.',
      }),
    );
    ws.close(1000, 'Auction over');
    if (!serverState[product._id].emailSent && product.bids.length > 0) {
      const url = `${protocol}://${host}/products/${product._id}`;
      sendEmailToUser(
        serverState[product._id]._activeBids.at(-1).bidder,
        url,
        'won',
      );
      serverState[product._id].emailSent = true; //Only send email once flag
    }
    updateProductBidsInDB();
  }
  ws.isAlive = true;

  ws.on('message', (data) => {
    const newBid = JSON.parse(data);
    // console.log(newBid);
    if (remainingTime < 0) {
      ws.send(
        JSON.stringify({
          type: 'over',
          message: 'Auction has ended.',
        }),
      );
      return;
    }
    //* COMMENTED - SPAMMING
    // if (
    //   product.bids.length > 0 &&
    //   remainingTime > 0 &&
    //   userData.email === serverState[newBid._id]._activeBids.at(-2).bidder
    // ) {
    //   const url = `${protocol}://${host}/products/${product._id}`;
    //   sendEmailToUser(
    //     serverState[newBid._id]._activeBids?.at(-2)?.bidder,
    //     url,
    //     'outbid',
    //   );
    // }
    if (
      product.bids.length > 0 &&
      newBid.amount <= serverState[product._id]._activeBids.at(-1).amount
    ) {
      ws.send(
        JSON.stringify({
          type: 'error',
          message: 'Bid must be a larger amount than the current bid.',
        }),
      );
      return;
    }
    newBid.amount *= 1;
    if (!newBid.amount) {
      ws.send(
        JSON.stringify({
          type: 'error',
          message: 'Bid must be a number!',
        }),
      );
      return;
    }
    serverState[newBid._id]._activeBids.push(newBid);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'newBid', bid: newBid }));
      }
    });
    serverState[product._id]._newBids.push(newBid);
  });
});

wss.on('close', () => {
  activeConnections--;
  serverState[product._id].clients.delete(wss);

  updateProductBidsInDB();
});
wss.on('error', () => {
  updateProductBidsInDB();
});
process.on('SIGINT', () => {
  console.log('Server is shutting down...');
  updateProductBidsInDB();
  setTimeout(() => process.exit(), 3000);
});

setInterval(
  async () => {
    if (activeConnections > 0) {
      console.log('Running database update every 3 minutes...');
      updateProductBidsInDB();
    }
  },
  3 * 60 * 1000,
);
