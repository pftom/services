/*
 *  TODO: Test questions limit num  this file
 *
 *
 */



//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
const io = require('socket.io-client');

// require GET /questions/API handler
let tikuQuestions = require('../utils/testTiku.json');

chai.use(chaiHttp);

/*
 *  Test   ||| users |||   api
 *
 *
 */
describe('GET /users/', () => {
  it('it should GET the varAllContestants', (done) => {
    chai.request(server)
        .get('/users/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(25);
          done();
        });
  });
});

/*
 *  Test   ||| get questions |||   api
 *
 *
 */
describe('GET /questions/', () => {
  it('it should return relative term and id questions', (done) => {
    chai.request(server)
        .get('/questions/?term=2&id=4')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('question');
          res.body.should.have.property('answer');
          res.body.question.should.be.eql(tikuQuestions[2][4].question);
          res.body.answer[0].should.be.eql(tikuQuestions[2][4].answer[0]);
          done();
        });
  });

  it('Term has go beyond the questions length', (done) => {
    chai.request(server)
        .get('/questions/?term=4&id=4')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
  });

  it('Term should be integer.', (done) => {
    chai.request(server)
        .get('/questions/?term=undefined&id=6')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
  });

  it('id should be integer.', (done) => {
    chai.request(server)
        .get('/questions/?term=2&id=undefined')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
  });

  it('This question is not exist.', (done) => {
    chai.request(server)
        .get('/questions/?term=2&id=8')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
  });
});

/*
 *  Test   ||| add Players |||   api
 *
 *
 */
describe('POST /addPlayers/', () => {
  it('it should return sended players', (done) => {
    let players = [
      {
        id: 1,
        username: '2171793',
        name: '马永东',
        logged: false,
        score: 0,
        out: false,
        isPlayer: true,
      },
      {
        id: 2,
        username: '161310405',
        name: '樊静宜',
        logged: false,
        score: 0,
        out: false,
        isPlayer: true,
      },
      {
        id: 3,
        username: '2171784',
        name: '龙勰',
        logged: false,
        score: 0,
        out: false,
        isPlayer: true,
      },
    ];

    chai.request(server)
        .post('/addPlayers/')
        .send({ players: players })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(3);
          done();
        });
  });
});