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

const heartbeat = function () {
  this.isAlive = true;
};

wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('error', console.error);
  ws.on('pong', heartbeat);
  ws.on('message', (data) => {
    console.log('received: %s', data);
    console.log(`Time: ${formatDate()}`);
    const response = `Server received: ${data}`;
    ws.send(response);
  });

  // ws.on('message', (data) => {
  //   ws.send(`Time: ${formatDate()}`);
  // });
  ws.send('something');
  // setInterval(() => {
  //   ws.send('3 seconds passed');
  // }, 3000);s
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
