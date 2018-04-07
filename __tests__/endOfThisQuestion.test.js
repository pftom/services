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
  describe('GET /endOfThisQuestion', () => {
    it('it should return "Successfully Respond"', (done) => {
      chai.request(server)
          .get('/endOfThisQuestion')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success');
            res.body.success.should.be.equal(true)

            done();
          });
    });

    it('it should get the emitted endOfThisQuestion event', (done) => {
      chai.request(server)
          .get('/endOfThisQuestion')
          .end((err, res) => {
            socket.on('endOfThisQuestion', () => {
              done();
            })
          });
    });
  });
});