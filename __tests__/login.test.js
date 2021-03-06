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
    it('it should return 403 for user not signed', (done) => {
      chai.request(server)
          .get('/users/login?username=2171748')
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.should.have.property('logged');
            res.body.error.should.be.equal('Sorry, 你没有签到，不能参加比赛哦 ~');
            res.body.logged.should.be.equal(true);
            done();
          });
    });

    it('it should return signed error ', (done) => {
      chai.request(server)
          .get('/users/signUser/?username=21717482')
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.equal('此用户不存在，签到失败');
            done();
          });
    });

    it('it should return signed success', (done) => {
      chai.request(server)
          .get('/users/signUser/?username=2171748')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('username');
            res.body.should.have.property('msg');
            res.body.username.should.be.equal('2171748');
            res.body.msg.should.be.equal(`孟盈 签到成功`);
            done();
          });
    });

    

    it('it should return 403 for player not allowed login', (done) => {
      chai.request(server)
          .get('/users/login?username=141340110')
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.should.have.property('logged');
            res.body.error.should.be.equal('Player are not allowed login');
            res.body.logged.should.be.equal(true);
            done();
          });
    });

    it('it should return right storedVarAllContestants and varAllContestants', (done) => {
      chai.request(server)
          .get('/users/login?username=2171748')
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
              username,
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

    it('it should return 403 for already logged', (done) => {
      chai.request(server)
          .get('/users/login?username=2171748')
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.should.have.property('logged');
            res.body.error.should.be.equal('This user is already logged in');
            res.body.logged.should.be.equal(true);
            done();
          });
    });


    it('it should return 404 for user not found', (done) => {
      chai.request(server)
          .get('/users/login?username=2171794')
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.equal('This login is not valid');
            done();
          });
    });

    it('it should return signed success', (done) => {
      chai.request(server)
          .get('/users/signUser/?username=2171740')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('username');
            res.body.should.have.property('msg');
            res.body.username.should.be.equal('2171740');
            res.body.msg.should.be.equal(`李宁 签到成功`);
            done();
          });
    });

    it('it should receive the emitted logged event', (done) => {
      chai.request(server)
          .get('/users/login?username=2171740')
          .end((err, res) => {
            socket.on('logged', ({ username }) => {
              username.should.be.equal('2171740');
              done();
            })
          });
    });
  });
});