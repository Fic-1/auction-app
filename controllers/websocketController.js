const WebSocket = require('ws');
const startWebSocketServer = require('../webSocketServer');

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
const wss = startWebSocketServer({ port: 8080 });

let activeBids = [];

wss.on('connection', (ws, req, client) => {
  ws.send(JSON.stringify({ type: 'initialBids', data: activeBids }));
  ws.isAlive = true;

  ws.on('message', (data) => {
    // Process the message if needed

    // For example, if you receive a new bid from a client, update the database
    // and broadcast the new bid to all connected clients

    const newBid = JSON.parse(data);

    activeBids.push(newBid);

    console.log(`Received message: ${data} from user ${client}`);
    // Broadcast the new bid to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'newBid', data: newBid }));
      }
    });
    console.log('received: %s', data);
    console.log(`Time: ${formatDate()}`);

    console.log(activeBids);
  });
});
wss.on('message', () => {
  console.log(wss.clients);
});
const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on('close', () => {
  console.log('connection closed');
  clearInterval(interval);
});

// exports.shutdown(exitCode = 0) {
// Close WebSocket connections
//   wss.clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.close();
//     }
//   });
