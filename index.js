var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// notification api
// When need to be updated to the next question, GET /push_notification
// create connection
 // After frontend create socket.io instance, this can be bi-direction communication
io.on('connection', function (socket) {
  app.get('/push_notification', function (req, res) {
    // response note
    res.send('Successfully responded');
    // print a user is connect
    console.log('a user connected');
    // listen on `push notification` event and notify client for response
    io.emit('push notification', 'start response for server');
  });
});

// This server is listening on 3000 port
http.listen(3000, function () {
  console.log('listening on *.3000');
});