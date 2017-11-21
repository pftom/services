var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('http');
var cors = require('cors');

var {
  singleOptions,
  multiplyOptions,
} = require('./random');

var singleOptionIndex = 0;
var multiplyOptionIndex = 0;

// original data
var allContestants = [];
// every contest update data
var varAllContestants = [];

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
    allContestants = JSON.parse(chunk);
    
    varAllContestants = allContestants = allContestants.map(item => (
      Object.assign({}, item, { out: false })
    ));
    console.log('allContestants', allContestants);
  });
});

req.on('error', function (e) {
  console.log('problem with request:' + e.message);
});

req.end();

app.use(cors());

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

  // update logged status
  app.get('/next_contest', function (req, res) {
    varAllContestants = allContestants;
    res.send('Successfully responded');
    // print a user is connect
    console.log('a user connected');
    // listen on `push notification` event and notify client for response
    io.emit('next contest', 'start response for server');
  });

  app.get('/update_logged', function (req, res) {
    const { user } = req.query;
    // update the logged status
    varAllContestants = varAllContestants.map(item => (
      (String(item.user) === user) 
      ? Object.assign({}, item, { logged: true })
      : item
    ));

    console.log('update_logged', varAllContestants);

    io.emit('logged', { user });
    res.send(JSON.stringify('Successfully responsed'));
  });

  // update the out status
  app.get('/update_out', function (req, res) {
    const { user, players } = req.query;
    console.log('user', user);

    if (players) {
      // get the remain audience
      const remainAudience = varAllContestants
                              .filter(item => !players.includes(item.user))
                              .filter(item => !item.out)
                              .length;
      io.emit('score', { user, remainAudience });
    }

    varAllContestants = varAllContestants.map(item => (
      (String(item.user) === user) 
      ? Object.assign({}, item, { out: true })
      : item
    ));

    console.log('update_out', varAllContestants);

    res.send(JSON.stringify('Successfully responsed'));
  });

});

app.get('/users/', function (req, res) {
  console.log('users/', JSON.stringify(varAllContestants))
  res.send(JSON.stringify(varAllContestants));
});

// This server is listening on 3000 port
http.listen(4000, function () {
  console.log('listening on *.3000');
});