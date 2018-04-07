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
let varAllContestants = require('./utils/data');
const singleQuestions = JSON.parse(fs.readFileSync('./utils/single.json', 'utf-8'));
const multipleQuestions = JSON.parse(fs.readFileSync('./utils/multiple.json', 'utf-8'));

// store a copy for init this game;
var allContestants = Object.assign([], varAllContestants);

// maintain a players list for count numbers:
let nowPlayers = [];

// maintain a nowOutContestantUsernames for calculate player's score
let nowOutContestantUsernames = [];

// import personal defined function
const {
  pushNotification,
  nextContest,
  login,
  updateOut,
  updatePromote,
  question,
} = require('./routes/');

/*
 *  connect ||| mongdb ||| server
 *
 *
 */
//db options


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
  ));

  /*
   *  jump ||| next contest ||| api
   *
   *
   */
  app.get('/next_contest', (req, res) => {
    const {
      newNowOutContestantUsernames,
      newVarAllContestants,
    } = nextContest(
      io,
      varAllContestants,
      nowOutContestantUsernames,
    )(req, res);

    varAllContestants = newVarAllContestants;
    nowOutContestantUsernames = newNowOutContestantUsernames;
  });

  /*
   *  user ||| login ||| api
   *
   *
   */
  app.get('/users/login', (req, res) => {
    varAllContestants = login(
      io,
      varAllContestants,
    )(req, res);
  });

  /*
   *  judge ||| out of contest ||| api
   *
   *
   */
  app.get('/update_out', (req, res) => {
    const {
      newNowPlayers,
      newVarAllContestants,
      newNowOutContestantUsernames,
    } = updateOut(
      io,
      nowPlayers,
      varAllContestants,
      nowOutContestantUsernames,
    )(req, res);

    varAllContestants = newVarAllContestants;
    nowPlayers = newNowPlayers;
    nowOutContestantUsernames = newNowOutContestantUsernames;
  });

  app.get('/update_promote', (req, res) => {
    varAllContestants = updatePromote(
      io,
      nowPlayers,
      varAllContestants,
      nowOutContestantUsernames,
    )(req, res);
  });

  /*
   *   ||| endOfThisQuestion ||| api
   *
   *
   */
  app.get('/endOfThisQuestion', function (req, res) {
    io.emit('endOfThisQuestion');
    res.send({ success: true });
  });

  /*
   *   ||| initGame ||| api
   *
   *
   */
  app.get('/initGame', function (req, res) {
    // use init copy to replace now data

    nowPlayers = [];
    nowOutContestantUsernames = [];
    varAllContestants = allContestants;

    io.emit('initGame');

    res.send({ 
      nowOutContestantUsernames,
      varAllContestants,
      allContestants,
      nowPlayers,
    });
  })
});

/*
 *  get   ||| users |||   api
 *
 *
 */

app.get('/users/', function (req, res) {
  res.send(varAllContestants);
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

  res.send(nowPlayers);
});

/*
 *  listen ||| on 4000 server ||| 
 *
 *
 */
http.listen(4000, function () {
  console.log(`listening on *.${4000}`);
});

module.exports = app;