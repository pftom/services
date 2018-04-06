//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
const io = require('socket.io-client');
const _ = require('underscore');

chai.use(chaiHttp);

/*
 *  Test   ||| Socket.IO |||   api
 *
 *
 */
describe('The api within Socket.io', () => {
  let socket;

  // before every test block, connect socket
  beforeEach((done) => {
    socket = io.connect('http://localhost:4000');

    socket.on('connect', () => {
      console.log('connected');
      done();
    });

    socket.on('disconnect', () => {
      console.log('disconnected ...')
    })
  });

  // after every test block, disconnect socket
  afterEach((done) => {
    if (socket.connected) {
      console.log('disconnecting ...');
      socket.disconnect();
    } else {
      console.log('no connection to break...');
    }
    done();
  });

  /*
   *  Test   ||| next_contest |||   api
   *  // need database help
   *
   */
  describe('GET /users/login', () => {
    it('it should return right storedVarAllContestants and varAllContestants', (done) => {
      chai.request(server)
          .get('/users/login?username=2171793')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('storedVarAllContestants');
            res.body.should.have.property('varAllContestants');
            res.body.storedVarAllContestants.should.be.a('array');
            res.body.varAllContestants.should.be.a('array');

            const {
              storedVarAllContestants,
              varAllContestants,
            } = res.body;

            // compare front and back variation
            const filteredStoredVarAllContestants = storedVarAllContestants.filter(user => (
              user.username !== username
            ))
            const filteredVarAllContestants = varAllContestants.filter(user => (
              user.username !== username
            ));

            // omit the user who's username === username, they should be equal
            if (!_.isEqual(
              filteredStoredVarAllContestants,
              filteredVarAllContestants
            )) {
              return done(new Error('Variation is only need to change the out property'));
            }


            // the user's logged property should be true
            let judgeLogined = true;
            varAllContestants.map(user => {
              if (user.username === username && !user.logged) {
                judgeLogined = false;
              }
            });

            if (!judgeLogined) {
              return done(new Error('This user should be logged'));
            }

            // if all the condition is pass, test pass
            done();
          });
    });

    it('it should get the emitted push notification event', (done) => {
      chai.request(server)
          .get('/next_contest')
          .end((err, res) => {
            socket.on('next contest', (msg) => {
              msg.should.be.equal('start response for server');
              done();
            })
          });
    });
  });
});