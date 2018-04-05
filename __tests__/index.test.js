//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
const io = require('socket.io-client');

// require GET /questions/single/:id/ API handler
let singleQuestions = require('../utils/single.json');
let multipleQuestions = require('../utils/multiple.json');

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
          res.body.length.should.be.eql(12);
          done();
        });
  });
});

/*
 *  Test   ||| get single question |||   api
 *
 *
 */
describe('GET /questions/single/:id/', () => {
  it('it should return relative id singleQuestions', (done) => {
    chai.request(server)
        .get('/questions/single/6/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('question');
          res.body.should.have.property('answer');
          res.body.question.should.be.eql(singleQuestions[6].question);
          res.body.answer[0].should.be.eql(singleQuestions[6].answer[0]);
          done();
        });
  });

  it('it should return 404 Not Found Error', (done) => {
    chai.request(server)
        .get('/questions/single/86/')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
  });
});

/*
 *  Test   ||| get multiple question |||   api
 *
 *
 */
describe('GET /questions/multiple/:id/', () => {
  it('it should return relative id multipleQuestions', (done) => {
    chai.request(server)
        .get('/questions/multiple/6/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('question');
          res.body.should.have.property('answer');
          res.body.question.should.be.eql(multipleQuestions[6].question);
          res.body.answer.should.have.with.lengthOf(4);
          done();
        });
  });

  it('it should return 404 Not Found Error', (done) => {
    chai.request(server)
        .get('/questions/multiple/46/')
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