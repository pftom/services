var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// notification api
// When need update to next question, GET /push_notification
app.get('/push_notification', function (req, res) {
  res.sendFile(__dirname + '/index.html');
  // create connection
  io.on('connection', function (socket) {
    // print a user is connect
    console.log('a user connected');
    // listen on `push notification` event and notify client for response
      // 
    io.emit('push notification', 'start response for server');
  });
});

http.listen(3000, function () {
  console.log('listening on *.3000');
});