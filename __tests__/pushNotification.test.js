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
   *  Test   ||| push_notification |||   api
   *
   *
   */
  describe('GET /push_notification', () => {
    it('it should return relative option and id', (done) => {
      chai.request(server)
          .get('/push_notification?term=2&id=3')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('term');
            res.body.should.have.property('id');
            res.body.term.should.be.eql('2');
            res.body.id.should.be.eql('3');
            done();
          });
    });

    it('it should get the emitted push notification event', (done) => {
      chai.request(server)
          .get('/push_notification?term=2&id=3')
          .end((err, res) => {
            socket.on('push notification', ({ term, id }) => {
              term.should.be.equal('2');
              id.should.be.equal('3');
              done();
            });
          });
    });
  });
});