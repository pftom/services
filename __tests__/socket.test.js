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
          .get('/push_notification?option=single&id=0')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('option');
            res.body.should.have.property('id');
            res.body.option.should.be.eql('single');
            res.body.id.should.be.eql('0');
            done();
          });
    });

    it('it should get the emitted push notification event', (done) => {
      chai.request(server)
          .get('/push_notification?option=single&id=0')
          .end((err, res) => {
            socket.on('push notification', ({ option, id }) => {
              option.should.be.equal('single');
              id.should.be.equal('0');
              done();
            });
          });
    });
  });

  /*
   *  Test   ||| next_contest |||   api
   *  // need database help
   *
   */
  describe('GET /next_contest', () => {
    it('it should return relative option and id', (done) => {
      chai.request(server)
          .get('/push_notification?option=single&id=0')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('option');
            res.body.should.have.property('id');
            res.body.option.should.be.eql('single');
            res.body.id.should.be.eql('0');
            done();
          });
    });

    it('it should get the emitted push notification event', (done) => {
      chai.request(server)
          .get('/push_notification?option=single&id=0')
          .end((err, res) => {
            socket.on('push notification', ({ option, id }) => {
              option.should.be.equal('single');
              id.should.be.equal('0');
              done();
            })
          });
    });
  });
});