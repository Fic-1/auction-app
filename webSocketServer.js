const WebSocket = require('ws');

const startWebSocketServer = (server) => {
  console.log('ws');
  const wss = new WebSocket.Server(server);
  return wss;
};

module.exports = startWebSocketServer;
