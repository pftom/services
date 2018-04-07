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
  })

  /*
   *  Test   ||| next_contest |||   api
   *  // need database help
   *
   */
  describe('GET /initGame', () => {
    it('it should return inited elements', (done) => {
      chai.request(server)
          .get('/initGame')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('varAllContestants');
            res.body.should.have.property('allContestants');
            res.body.should.have.property('nowPlayers');
            res.body.nowPlayers.should.be.a('array');
            res.body.varAllContestants.should.be.a('array');
            res.body.allContestants.should.be.a('array');
            res.body.nowPlayers.length.should.be.equal(0);

            // varAllContestants should be equal to allContestants
            const {
              varAllContestants,
              allContestants,
            } = res.body;

            if (varAllContestants.length !== allContestants.length) {
              return done(new Error('These two array need to be equal length'));
            }

            // judge these two array is equal
            let isEqual = true;
            for (let i = 0; i < allContestants.length; i++) {
              if (!_.isEqual(
                varAllContestants[i],
                allContestants[i]
              )) {
                isEqual = false;
                break;
              }
            }

            if (!isEqual) {
              return done(new Error('These two array need to be equal'));
            }

            done();
          });
    });

    it('it should get the emitted initGame event', (done) => {
      chai.request(server)
          .get('/initGame')
          .end((err, res) => {
            socket.on('initGame', () => {
              done();
            })
          });
    });
  });
});