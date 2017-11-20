var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('http');

var {
  singleOptions,
  multiplyOptions,
} = require('./random');

var singleOptionIndex = 0;
var multiplyOptionIndex = 0;

var allContestants = null;

// when start node get the result from the Django
var options = {
  hostname: 'powerformer.com',
  port: 8000,
  path: '/users/contestants/',
  method: 'GET',
};

var req = request.request(options, function (res) {
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    allContestants = chunk;
    console.log('allContestants', allContestants);
  });
});

req.on('error', function (e) {
  console.log('problem with request:' + e.message);
});

req.end();

// notification api
// When need to be updated to the next question, GET /push_notification
// create connection
 // After frontend create socket.io instance, this can be bi-direction communication
io.on('connection', function (socket) {
  app.get('/push_notification', function (req, res) {
    const { option } = req.query;
    let id = 0;

    if (option === 'single') {
      id = singleOptions[singleOptionIndex];
      singleOptionIndex++;
    } else {
      id = multiplyOptions[multiplyOptionIndex];
      multiplyOptionIndex++;
    }
    // response note
    res.send('Successfully responded');
    // print a user is connect
    console.log('a user connected');
    // listen on `push notification` event and notify client for response
    io.emit('push notification', { option, id });
  });

  app.get('/next_contest', function (req, res) {
    res.send('Successfully responded');
    // print a user is connect
    console.log('a user connected');
    // listen on `push notification` event and notify client for response
    io.emit('next contest', 'start response for server');
  })
});

// This server is listening on 3000 port
http.listen(4000, function () {
  console.log('listening on *.3000');
});