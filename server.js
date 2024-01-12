const mongoose = require('mongoose');
const dotenv = require('dotenv');
const WebSocket = require('ws');
const { WebSocketServer } = require('ws');
const websocketController = require('./controllers/websocketController');
const ServerState = require('./utils/serverState');
const Product = require('./models/productsModel');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace('<password>', process.env.DB_PASSWORD);
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
// const setupServerState = async () => {
//   let initialServerState = {};
//   const product = await Product.find();
//   product.forEach((document) => {
//     initialServerState[document._id] = {};
//     initialServerState[document._id].clients = new Set();
//     initialServerState[document._id]._activeBids = [];
//     initialServerState[document._id]._newBids = [];
//     initialServerState[document._id].emailSent = document.emailSent;
//   });
//   return initialServerState;
// };
// let serverState = setupServerState();
mongoose.connect(DB).then(() => console.log('DB connection successful'));

const wss = new WebSocketServer({ server });

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  server.close(() => {
    process.exit(1); //1 - uncaught exception 0 - success
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down 👋');
  server.close(() => {
    console.log('💥 Process terminated');
  });
});

setTimeout(() => {
  wss.on('connection', websocketController.connectionHandler);
  wss.on('close', websocketController.closeConnectionHandler);
  wss.on('error', websocketController.websocketErrorHandler);
}, 3000);

exports.sendNewBids = (newBid) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: 'newBid', bid: newBid }));
    }
  });
};
