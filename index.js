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
const tiQuestions = require('./utils/testTiku.json');

// store a copy for init this game;
var allContestants = Object.assign([], varAllContestants);

// maintain a players list for count numbers:
let nowPlayers = [];

// maintain a nowOutContestantUsernames for calculate player's score
let nowOutContestantUsernames = [];

// maintain a totalOutContestantUsernames for time travel
// 先考虑让系统可运行，再变得更好

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
app.get('/questions/', (req, res) => {
  const { newNowOutContestantUsernames } = question(
    tiQuestions,
    nowOutContestantUsernames,
  )(req, res);

  nowOutContestantUsernames = newNowOutContestantUsernames
});

/*
 *  get ||| multiple question ||| api
 *
 *
 */


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
 *  add ||| isSigned ||| 
 *
 *
 */
app.get('/users/signUser/', function (req, res) {
  const { username } = req.query;

  console.log('name', username);

  // isSignedSuccess
  let isSignedSuccess = false;
  let nowUser = null;

  varAllContestants = varAllContestants.map(user => {
    if (user.username === username) {
      isSignedSuccess = true;
      nowUser = user;
      return { ...user, isSigned: true };
    }

    return user;
  });

  if (isSignedSuccess) {
    return res.send({ username, msg: `${nowUser.name} 签到成功` });
  } else {
    return res.status(404).send({ error: '此用户不存在，签到失败' });
  }
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