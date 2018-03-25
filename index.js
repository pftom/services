var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('http');
var cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const singleQuestions = JSON.parse(fs.readFileSync('./single.json', 'utf-8'));
const multipleQuestions = JSON.parse(fs.readFileSync('./multiple.json', 'utf-8'));

console.log(singleQuestions.length, multipleQuestions.length);

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
    out: false,
  },
  {
    id: 1,
    username: '140150115',
    name: '黄炜炜',
    logged: false,
    score: 0,
    out: false,
  },
  {
    id: 2,
    username: '140150116',
    name: '张凡凡',
    logged: false,
    score: 0,
    out: false,
  },
  {
    id: 3,
    username: '140150117',
    name: '啊哲哲',
    logged: false,
    score: 0,
    out: false,
  },
  {
    id: 4,
    username: '140150118',
    name: '黄炜炜1',
    logged: false,
    score: 0,
    out: false,
  },
  {
    id: 5,
    username: '140150119',
    name: '张凡凡1',
    logged: false,
    score: 0,
    out: false,
  },
  {
    id: 6,
    username: '1401501110',
    name: '啊哲哲1',
    logged: false,
    score: 0,
    out: false,
  },
];

var allContestants = varAllContestants;

// maintain a players list for count numbers:
let nowPlayers = [
  {
    id: 4,
    username: '140150118',
    name: '黄炜炜1',
    logged: false,
    score: 0,
    out: false,
  },
  {
    id: 5,
    username: '140150119',
    name: '张凡凡1',
    logged: false,
    score: 0,
    out: false,
  },
  {
    id: 6,
    username: '1401501110',
    name: '啊哲哲1',
    logged: false,
    score: 0,
    out: false,
  },
];

let nowContestants = [];


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
    varAllContestants = varAllContestants.map(user => ({
      ...user,
      out: false,
    }));

    // initial nowContestants and start a new contest
    nowContestants = [];

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
    varAllContestants = varAllContestants.map(item => {
      if (item.username === username)  {
        isValidUser = true;
        return { ...item, logged: true };
      }

      return item;
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
    try {
      const { username } = req.query;
      let nowUser = null;

      // ====================================================
      // ====================================================
      // ====================================================
      //
      // for better modify, and BUG!
      //
  
      if (nowContestants.length === 0) {
        // collect player array
        const playerUsernames = nowPlayers.map(item => item.username);

        // get rid of master user
        const takeOutMasterContestants = varAllContestants.slice(1);

        // filter out player
        nowContestants = takeOutMasterContestants.filter(item => !playerUsernames.includes(item.username));
      }

      // store a now contestant list for later update score
      const nowContestsCopy = nowContestants;
      nowContestants = nowContestants.filter(item => !item.out)

      // log res
      console.log('nowContestsCopy', nowContestsCopy);
      console.log('nowContestants', nowContestants);
  
      // all remain out = false, score = remain.length - remainNotOut.length
      // calculate the user's score
      const score = nowContestsCopy.length - nowContestants.length;

      // ====================================================
      // ====================================================
      // ====================================================

      // and then update nowContestants
      nowContestants.map(item => {
        // update the user to out of this contest, 
        needReturnItme = item;
        
        if (item.username === username) {
          needReturnItme = Object.assign({}, item, { out: true, score: item.score + score });
        }
  
        return needReturnItme;
      });
  
      // update all local varAllContestants
      varAllContestants = varAllContestants.map(item => {
        // update the user to out of this contest, 
        needReturnItme = item;
  
        if (item.username === username) {
          needReturnItme = Object.assign({}, item, { out: true, score: item.score + score });
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

  // update the out status
  app.get('/update_promote', function (req, res) {
    try {
      const { username } = req.query;
      let nowUser = null;

      // ====================================================
      // ====================================================
      // ====================================================
      //
      // for better modify, and BUG!
      //
  
      if (nowContestants.length === 0) {
        // collect player array
        const playerUsernames = nowPlayers.map(item => item.username);

        // get rid of master user
        const takeOutMasterContestants = varAllContestants.slice(1);

        // filter out player
        nowContestants = takeOutMasterContestants.filter(item => !playerUsernames.includes(item.username));
      }

      // store a now contestant list for later update score
      const nowContestsCopy = nowContestants;
      nowContestants = nowContestants.filter(item => !item.out);

      // log res
      console.log('nowContestsCopy', nowContestsCopy);
      console.log('nowContestants', nowContestants);
  
      // all remain out = false, score = remain.length - remainNotOut.length
      const score = nowContestsCopy.length - nowContestants.length;

      // ====================================================
      // ====================================================
      // ====================================================
  
      // update all local varAllContestants
      varAllContestants = varAllContestants.map(item => {
        // update the user to out of this contest, 
        needReturnItme = item;
  
        if (item.username === username) {
          needReturnItme = Object.assign({}, item, { score: item.score + score });
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

app.get('/addPlayers/', function (req, res) {
  const { players } = req.query;

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