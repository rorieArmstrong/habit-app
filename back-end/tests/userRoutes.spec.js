process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var knex = require('../db');
var should = chai.should();
chai.use(chaiHttp);


describe('API Routes', function() {
  beforeEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      knex.migrate.latest()
      .then(function() {
        return knex.seed.run()
        .then(function() {
          done();
        });
      });
    });
  });
  afterEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      done();
    });
  });
  describe('GET /users/all', function() {
    it('should return all users', function(done) {
      chai.request(server)
      .get('/users/all')
      .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json; // jshint ignore:line
      res.body.should.be.a('array');
      res.body.length.should.equal(4);
      res.body[0].should.have.property('userID');
      res.body[0].userID.should.equal(1);
      res.body[0].should.have.property('user_name');
      res.body[0].user_name.should.equal('rorieArmstrong');
      res.body[0].should.have.property('password');
      res.body[0].password.should.equal('test123');
      res.body[0].should.have.property('first_name');
      res.body[0].first_name.should.equal('Rorie');
      res.body[0].should.have.property('surname');
      res.body[0].surname.should.equal('Armstrong');
      done();
      });
    });
  });
  describe('GET /users/:username/:password', function() {
    it('should return the users userID', function(done) {
      chai.request(server)
      .get('/users/liamMontero/test123')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json; // jshint ignore:line
        res.body.should.equal(2);
        done();
      });
    });
  });
  describe('POST /users/register', function() {
    it('should add a new user', function(done) {
      chai.request(server)
      .post('/users/register')
      .send({
        user_name : 'testy',
        password: 'password',
        first_name: 'Testerthan',
        surname: 'Smith'
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json; // jshint ignore:line
        res.body.should.be.a('object');
        res.body.should.have.property('userID');
        res.body.userID.should.equal(5);
        res.body.should.have.property('user_name');
        res.body.user_name.should.equal('testy');
        res.body.should.have.property('first_name');
        res.body.first_name.should.equal('Testerthan');
        res.body.should.have.property('surname');
        res.body.surname.should.equal('Smith');
        done();
      });
    });
  });
});