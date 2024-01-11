const mongoose = require('mongoose');
const dotenv = require('dotenv');
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

const setupServerState = async () => {
  let serverState = {};
  const product = await Product.find();
  product.forEach((document) => {
    serverState[document._id] = {};
    serverState[document._id].clients = new Set();
    serverState[document._id]._activeBids = [];
    serverState[document._id]._newBids = [];
    serverState[document._id].emailSent = document.emailSent;
  });
  return serverState;
};
let serverState = setupServerState();
// setTimeout(() => {
//   console.log(serverState, 'this is server state');
// }, 3000);

wss.on('connection', websocketController.connectionHandler);
wss.on('close', websocketController.closeConnectionHandler);
wss.on('error', websocketController.websocketErrorHandler);

module.exports = { server, DB };
