const WebSocket = require('ws');

const startWebSocketServer = (port) => {
  console.log('ws');
  const wss = new WebSocket.Server(port);
  return wss;
};

module.exports = startWebSocketServer;
