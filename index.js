var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('http');
var cors = require('cors');
const bodyParser = require('body-parser');

const multipleQuestions = require('./multiple.json');
const singleQuestions = require('./single.json');

console.log('single', singleQuestions);

// node process running port
var port = 4000;

var {
  singleOptions,
  multiplyOptions,
} = require('./random');

var singleOptionIndex = 0;
var multiplyOptionIndex = 0;

// original data
var varAllContestants = [
  {
    id: 0,
    username: 'dhucstmaster',
    name: '主持人',
    logged: false,
    score: 0,
  },
  {
    id: 1,
    username: '140150115',
    name: '黄炜炜',
    logged: false,
    score: 0,
  },
  {
    id: 2,
    username: '140150116',
    name: '张凡凡',
    logged: false,
    score: 0,
  },
  {
    id: 3,
    username: '140150117',
    name: '啊哲哲',
    logged: false,
    score: 0,
  },
];

var allContestants = varAllContestants;

// get all the questions


// the same as redux-undo array
var timeTravel = [];

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
    res.send(JSON.stringify('Successfully responded'));
    // print a user is connect
    console.log('a user connected');
    // listen on `push notification` event and notify client for response
    io.emit('push notification', { option, id });
  });

  // update logged status
  app.get('/next_contest', function (req, res) {

    timeTravel.push(varAllContestants);
    varAllContestants = allContestants;

    // print a user is connect
    console.log('a user connected');
    // listen on `push notification` event and notify client for response
    io.emit('next contest', 'start response for server');
    res.send(JSON.stringify('Successfully responsed'));
  });

  app.get('/users/login', function (req, res) {
    const { username } = req.query;
    console.log('username', username);

    // judge whether user is valid
    let isValidUser = false;

    // update the logged status
    varAllContestants.map(item => {
      if (item.username === username)  {
        isValidUser = true;
      }
    });

    if (isValidUser) {
      io.emit('logged', { username });
      res.json({ username });
    } else {
      res.status(404).send({ error: 'This login is not valid' })
    }
  });

  // update the out status
  app.get('/update_out', function (req, res) {
    const { user, type, remainAudience, playersLength } = req.query;
    console.log('user', user);
    console.log('score', (varAllContestants.length - parseInt(remainAudience) - parseInt(playersLength)));

    varAllContestants = varAllContestants.map(item => (
      (item.user === user) 
      ? Object.assign({}, item, { [type]: true, score: (varAllContestants.length - parseInt(remainAudience) - parseInt(playersLength))  })
      : item
    ));

    io.emit('score', varAllContestants);

    res.send(JSON.stringify('Successfully responsed'));
  });

});

app.get('/users/', function (req, res) {
  res.send(JSON.stringify(varAllContestants));
});

// This server is listening on port
http.listen(port, function () {
  console.log(`listening on *.${4000}`);
});