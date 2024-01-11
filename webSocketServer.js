const { WebSocketServer } = require('ws');
const server = require('./server');

const startWebSocketServer = (httpserver) => {
  console.log('ws');
  const wss = new WebSocketServer(httpserver);
  return wss;
};
module.exports = startWebSocketServer;
