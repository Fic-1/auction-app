const WebSocket = require('ws');

const startWebSocketServer = (server) => {
  console.log('ws');
  const wss = new WebSocket.Server({ port: 8080 });
  wss.on('connection', (ws) => {
    ws.on('message', (data) => {
      console.log('received: %s', data);
    });

    ws.send('something');
  });
  wss.on();
  // };
  return wss;
};

module.exports = startWebSocketServer;
