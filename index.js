const fs = require('fs');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// export io for other route usage
// reference exist front and back
exports.io = io;
exports.singleOptionIndex = 0;
exports.multiplyOptionIndex = 0;

// import personal defined function
const push_notification = require('./routes/push_notification');
let varAllContestants = require('./utils/data');

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
io.on('connection', function (socket) {
  app.get('/push_notification', push_notification);

  // update logged status
  app.get('/next_contest', function (req, res) {
    varAllContestants = varAllContestants.map(user => ({
      ...user,
      out: false,
    }));

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

    // is already logged
    let isAlreadyLogged = false;

    // update the logged status
    varAllContestants = varAllContestants.map(item => {
      // this user exist
      if (item.username === username)  {
        // but is already logged
        if (item.logged) {
          isAlreadyLogged = true;
        } else {
          isValidUser = true;
          return { ...item, logged: true };
        }
      }

      return item;
    });

    // if this user is already logged in
    if (isAlreadyLogged) {
      res.status(403).send({ error: 'This user is already logged in' });
    } else if (isValidUser) {
      io.emit('logged', { username });
      res.json({ username });
    } else {
      res.status(404).send({ error: 'This login is not valid' })
    }
  });

  // update the out status
  app.get('/update_out', function (req, res) {
    try {
      const { username } = req.query;
      let nowUser = null;
      let needReturnItme = null;
      
      const playerUsernames = nowPlayers.map(item => item.username);

      // valid user which is logged
      const validUsers = varAllContestants.slice(1).filter(user => user.logged);

      // get rid of players
      const validGetRidOfPlayersUser = validUsers.filter(
        user => !playerUsernames.includes(user.username)
      );

      console.log('validGetRidOfPlayersUser', validGetRidOfPlayersUser);
      console.log('playerUsernames', playerUsernames);
      console.log('username', username);

      // calculate score
      // or const score = validGetRidOfPlayersUser.filter(user => user.out).length;
      const score = validGetRidOfPlayersUser.length - 
        validGetRidOfPlayersUser.filter(user => !user.out).length;

      console.log('score', score);
  
      // update all local varAllContestants
      varAllContestants = varAllContestants.map(item => {
        // update the user to out of this contest, 
        needReturnItme = item;
  
        if (item.username === username) {
          if (playerUsernames.includes(username)) {
            needReturnItme = Object.assign({}, needReturnItme, { out: true, score: item.score + score });
          } else {
            needReturnItme = Object.assign({}, needReturnItme, { out: true });
          }
          nowUser = needReturnItme;
        }
  
        return needReturnItme;
      });
  
      // notify master side for update rank list
      io.emit('score', nowUser);

      // return response
      res.send(JSON.stringify('Successfully responsed'));
    } catch (e) {
      res.status(500).send({ error: 'Sorry, meet some error'});
    }
  });


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