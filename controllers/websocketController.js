const startWebSocketServer = require('../webSocketServer');

const wss = startWebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    console.log('received: %s', data);
    console.log('Test message');
  });

  ws.send('something');
  setInterval(() => {
    ws.send('3 seconds passed');
  }, 3000);
});
// exports.shutdown(exitCode = 0) {
// Close WebSocket connections
//   wss.clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.close();
//     }
//   });
