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
  describe('GET /api/habits', function() {
    it('should return all habits', function(done) {
      chai.request(server)
      .get('/api/habits')
      .end(function(err, res) {
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.length.should.equal(3);
      res.body[0].should.have.property('habitID');
      res.body[0].habitID.should.equal(1);
      res.body[0].should.have.property('userID');
      res.body[0].userID.should.equal(1);
      res.body[0].should.have.property('activity');
      res.body[0].activity.should.equal('coding');
      res.body[0].should.have.property('date_of_entry');
      res.body[0].date_of_entry.should.equal('2020--05--18');
      res.body[0].should.have.property('frequency');
      res.body[0].frequency.should.equal('daily');
      res.body[0].should.have.property('streak');
      res.body[0].streak.should.equal(0);
      done();
      });
    });
  });
  describe('GET /api/habits/:id', function() {
    it('should return a single habit', function(done) {
      chai.request(server)
      .get('/api/habits/1')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('habitID');
        res.body.habitID.should.equal(1);
        res.body.should.have.property('userID');
        res.body.userID.should.equal(1);
        res.body.should.have.property('activity');
        res.body.activity.should.equal('coding');
        res.body.should.have.property('date_of_entry');
        res.body.date_of_entry.should.equal('2020--05--18');
        res.body.should.have.property('frequency');
        res.body.frequency.should.equal('daily');
        res.body.should.have.property('streak');
        res.body.streak.should.equal(0);
        done();
      });
    });
  });
  describe('GET /api/habits/users/:id', function() {
    it('should return a single users habits', function(done) {
      chai.request(server)
      .get('/api/habits/users/1')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body[0].should.be.a('object');
        res.body[0].should.have.property('habitID');
        res.body[0].habitID.should.equal(1);
        res.body[0].should.have.property('activity');
        res.body[0].activity.should.equal('coding');
        res.body[0].should.have.property('date_of_entry');
        res.body[0].date_of_entry.should.equal('2020--05--18');
        res.body[0].should.have.property('frequency');
        res.body[0].frequency.should.equal('daily');
        res.body[0].should.have.property('streak');
        res.body[0].streak.should.equal(0);
        done();
      });
    });
  });
  describe('POST /api/habits', function() {
    it('should add a habit', function(done) {
      chai.request(server)
      .post('/api/habits')
      .send({
        userID: '1',
        activity : 'fishing',
        date_of_entry: '2020--01--01',
        frequency: 'weekly',
        streak: 0
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('userID');
        res.body.userID.should.equal(1);
        res.body.should.have.property('activity');
        res.body.activity.should.equal('fishing');
        res.body.should.have.property('date_of_entry');
        res.body.date_of_entry.should.equal('2020--01--01');
        res.body.should.have.property('frequency');
        res.body.frequency.should.equal('weekly');
        res.body.should.have.property('streak');
        res.body.streak.should.equal(0);
        done();
      });
    });
  });
  describe('PUT /api/habits/:id', function() {
    it('should update an existing habit', function(done) {
      chai.request(server)
      .put('/api/habits/1')
      .send({
        activity: 'jumping',
        streak: 3
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('habitID');
        res.body.habitID.should.equal(1);
        res.body.should.have.property('userID');
        res.body.userID.should.equal(1);
        res.body.should.have.property('activity');
        res.body.activity.should.equal('jumping');
        res.body.should.have.property('date_of_entry');
        res.body.date_of_entry.should.equal('2020--05--18');
        res.body.should.have.property('frequency');
        res.body.frequency.should.equal('daily');
        res.body.should.have.property('streak');
        res.body.streak.should.equal(3);
        done();
      });
    });
    it('should NOT update a habit if the userid field is part of the request', function(done) {
      chai.request(server)
      .put('/api/habits/1')
      .send({
        habitID: 1,
        activity: 'jumping',
        streak: 3
      })
      .end(function(err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.equal('You cannot update the id field');
        done();
      });
    });
  });
  describe('DELETE /api/habits/:id', function() {
    it('should delete a habit', function(done) {
      chai.request(server)
      .delete('/api/habits/1')
      .end(function(error, response) {
        console.log(response.body)
        response.should.have.status(200);
        response.body.should.equal('row deleted');
        chai.request(server)
        .get('/api/habits')
        .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[0].should.have.property('habitID');
            res.body[0].habitID.should.equal(2);
            res.body[0].should.have.property('userID');
            res.body[0].userID.should.equal(1);
            res.body[0].should.have.property('activity');
            res.body[0].activity.should.equal('swimming');
            res.body[0].should.have.property('date_of_entry');
            res.body[0].date_of_entry.should.equal('2020--05--17');
            res.body[0].should.have.property('frequency');
            res.body[0].frequency.should.equal('weekly');
            res.body[0].should.have.property('streak');
            res.body[0].streak.should.equal(0);
          done();
        });
      });
    });
  });
});