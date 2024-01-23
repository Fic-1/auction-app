const mongoose = require('mongoose');
const dotenv = require('dotenv');
const WebSocket = require('ws');
const { WebSocketServer } = require('ws');
const cloudinary = require('cloudinary').v2;
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

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// const image = `public/img/user-0.jpg`;
// cloudinary.uploader.upload(image).then((error, result) => {
//   console.log(result);
//   console.log(error);
// });

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
