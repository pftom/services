const fs = require('fs');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// reference exist front and back
let singleOptionIndex = 0;
let multiplyOptionIndex = 0;
let varAllContestants = require('./utils/data');

// import personal defined function
const pushNotification = require('./routes/pushNotification');
const nextContest = require('./routes/nextContest');
const login = require('./routes/login');
const updateOut = require('./routes/updateOut');




const singleQuestions = JSON.parse(fs.readFileSync('./single.json', 'utf-8'));
const multipleQuestions = JSON.parse(fs.readFileSync('./multiple.json', 'utf-8'));

// node process running port
const port = 4000;

// store a copy for init this game;
var allContestants = Object.assign([], varAllContestants);

// maintain a players list for count numbers:
let nowPlayers = [];

// store a copy for init this game;
var allPlayers = Object.assign([], nowPlayers);


// get all the questions


// the same as redux-undo array
var timeTravel = [];

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

// notification api
// When need to be updated to the next question, GET /push_notification
// create connection
// After frontend create socket.io instance, this can be bi-direction communication
// use factory function for this api
io.on('connection', function (socket) {
  // user send next question request
  app.get('/push_notification', pushNotification(
    io,
    singleOptionIndex,
    multiplyOptionIndex,
  ));

  // update logged status
  app.get('/next_contest', nextContest(
    io,
    varAllContestants,
  ));

  // user login api
  app.get('/users/login', login(
    io,
    varAllContestants,
  ));

  // update the out status
  app.get('/update_out', updateOut(
    io,
    nowPlayers,
    varAllContestants,
  ));


  // judge endOfThisQuestion
  app.get('/endOfThisQuestion', function (req, res) {
    io.emit('endOfThisQuestion');
    res.send(JSON.stringify('Successfully Respond'));
  });

  // init this game
  app.get('/initGame', function (req, res) {
    // use init copy to replace now data

    console.log('allPlayers', allPlayers);
    console.log('allContestants', allContestants);
    nowPlayers = allPlayers;
    varAllContestants = allContestants;
    singleOptionIndex = 0;
    multiplyOptionIndex = 0;

    io.emit('initGame');

    res.send(JSON.stringify('Successfully Respond'));
  })
});

app.get('/users/', function (req, res) {
  res.send(JSON.stringify(varAllContestants));
});

app.get('/questions/single/:id/', function (req, res) {
  const id = req.params.id;

  if (Number(id) > singleQuestions.length) {
    res.status(404).send({ error: 'This question is not exist.' });
  } else {
    const question = singleQuestions[id];
    
    res.json(question);
  }
});

app.post('/addPlayers/', function (req, res) {
  const { players } = req.body;

  nowPlayers = players;
  console.log('nowPlayers', nowPlayers);

  res.send(JSON.stringify('Successfully responsed'));
});

app.get('/questions/multiple/:id/', function (req, res) {
  const id = req.params.id;

  if (Number(id) > multipleQuestions.length) {
    res.status(404).send({ error: 'This question is not exist.' });
  } else {
    const question = multipleQuestions[id];
    
    res.json(question);
  }
});

// This server is listening on port
http.listen(port, function () {
  console.log(`listening on *.${4000}`);
});