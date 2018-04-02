const fs = require('fs');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const config = require('config');
const morgan = require('morgan');

// reference exist front and back
let singleOptionIndex = 0;
let multiplyOptionIndex = 0;
let varAllContestants = require('./utils/data');

// import personal defined function
const {
  pushNotification,
  nextContest,
  login,
  updateOut,
  question,
} = require('./routes/');

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

// add express middlewares for better development experiences
if (config.util.getEnv('NODE_ENV') !== 'test') {
  // use morgan to log at command line
  app.use(morgan('combined')); // 'combined' outputs the Apache style logs
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(expressValidator());

// notification api
// When need to be updated to the next question, GET /push_notification
// create connection
// After frontend create socket.io instance, this can be bi-direction communication
// use factory function for this api
// only frontend create socket.io, in this function api can be valid
io.on('connection', function (socket) {
  /*
   *  jump ||| next question ||| api
   *
   *
   */
  app.get('/push_notification', pushNotification(
    io,
    singleOptionIndex,
    multiplyOptionIndex,
  ));

  /*
   *  jump ||| next contest ||| api
   *
   *
   */
  app.get('/next_contest', nextContest(
    io,
    varAllContestants,
  ));

  /*
   *  user ||| login ||| api
   *
   *
   */
  app.get('/users/login', login(
    io,
    varAllContestants,
  ));

  /*
   *  judge ||| out of contest ||| api
   *
   *
   */
  app.get('/update_out', updateOut(
    io,
    nowPlayers,
    varAllContestants,
  ));

  /*
   *   ||| endOfThisQuestion ||| api
   *
   *
   */
  app.get('/endOfThisQuestion', function (req, res) {
    io.emit('endOfThisQuestion');
    res.send(JSON.stringify('Successfully Respond'));
  });

  /*
   *   ||| initGame ||| api
   *
   *
   */
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

/*
 *  get   ||| users |||   api
 *
 *
 */

app.get('/users/', function (req, res) {
  res.send(JSON.stringify(varAllContestants));
});


/*
 *  get ||| single question ||| api
 *
 *
 */
app.get('/questions/single/:id/', question(singleQuestions));

/*
 *  get ||| multiple question ||| api
 *
 *
 */
app.get('/questions/multiple/:id/', question(multipleQuestions));


/*
 *  add ||| players ||| 
 *
 *
 */
app.post('/addPlayers/', function (req, res) {
  const { players } = req.body;

  nowPlayers = players;
  console.log('nowPlayers', nowPlayers);

  res.send(JSON.stringify('Successfully responsed'));
});

/*
 *  listen ||| on 4000 server ||| 
 *
 *
 */
http.listen(port, function () {
  console.log(`listening on *.${4000}`);
});

// export app for test usage
module.exports = app;