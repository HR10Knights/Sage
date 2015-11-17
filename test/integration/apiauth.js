process.env.NODE_ENV = "test"; // Use test database

var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../../doozy/server');
var db = require('../../doozy/config');
var Team = require('../../doozy/models/team');
var User = require('../../doozy/models/user');
var mongoose = require('mongoose');

describe('Authentication', function() {
  before(function(done) {
    var con = mongoose.connect('mongodb://localhost/doozytest');
    mongoose.connection.on('open', function(){
      con.connection.db.dropDatabase(function(err, result){
        done();
      });
    });
  });

  after(function(done) {
    mongoose.connection.close();
    done();
  });

  describe('Teams', function () {
    it('should create a team', function(done) {
      request(app)
        .post('/api/teams/create')
        .send({
          'name': 'test team'
        })
        .expect(201)
        .end(done);
    });
    it('should not create a team with a taken name', function(done) {
      request(app)
        .post('/api/teams/create')
        .send({
          'name': 'test team'
        })
        .expect(400)
        .end(done);
    });

    it('should list teams', function(done) {
      request(app)
        .get('/api/teams')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(done);
    });

    it('should check to see if a team exists when it does', function(done) {
      request(app)
        .get('/api/teams/exists?name=test%20team')
        .expect(200)
        .expect(function(res) {
          res.body = 'true';
        })
        .end(done);
    });

    it('should check to see if a team exists when it doesnt', function(done) {
      request(app)
        .get('/api/teams/exists?name=fake%20team')
        .expect(200)
        .expect(function(res) {
          res.body = 'false';
        })
        .end(done);
    });

  });

  describe('Users', function() {
    describe('sign up', function() {
      it('should create a user', function(done) {
        request(app)
          .post('/api/signup')
          .send({
            'username': 'testuser',
            'password': 'testpass',
            'teamname': 'test team' 
          })
          .expect(201)
          .end(done);
      });
      it('should not create a user with a taken user name', function(done) {
        request(app)
          .post('/api/signup')
          .send({
            'username': 'testuser',
            'password': 'testpass',
            'teamname': 'test team' 
          })
          .expect(400)
          .end(done);
      });
      it('should not create a user with an invalid team name', function(done) {
        request(app)
          .post('/api/signup')
          .send({
            'username': 'testusertwo',
            'password': 'testpass',
            'teamname': 'fake team' 
          })
          .expect(400)
          .end(done);
      });
      it('should not create a user with a blank username or password', function(done) {
        request(app)
          .post('/api/signup')
          .send({
            'username': 'testusertwo',
            'password': '',
            'teamname': 'test team' 
          })
          .expect(400);
          request(app)
            .post('/api/signup')
            .send({
              'username': '',
              'password': 'testpass',
              'teamname': 'test team' 
            })
            .expect(400)
            .end(done);
      });
    });

    describe('log in', function() {

      it('should log in a valid user', function(done) {
        request(app)
          .post('/api/login')
          .send({
            'username': 'testuser',
            'password': 'testpass',
            'teamname': 'test team'
          })
          .expect(200)
          .expect(function(res) {
            res.body = 'true';
          })
          .end(done);
      });

      it('should not log in a user with an incorrect password', function(done) {
        request(app)
          .post('/api/login')
          .send({
            'username': 'testuser',
            'password': 'fakepass',
            'teamname': 'test team'
          })
          .expect(401)
          .expect(function(res) {
            res.body = 'false';
          })
          .end(done);
      });

      it('should not log in a user with an invalid username', function(done) {
        request(app)
          .post('/api/login')
          .send({
            'username': 'fakeuser',
            'password': 'fakepass',
            'teamname': 'test team'
          })
          .expect(401)
          .expect(function(res) {
            res.body = 'false';
          })
          .end(done);
      });
      it('should not log in a user with an invalid team name', function(done) {
        request(app)
          .post('/api/login')
          .send({
            'username': 'fakeuser',
            'password': 'fakepass',
            'teamname': 'fake team'
          })
          .expect(401)
          .expect(function(res) {
            res.body = 'false';
          })
          .end(done);
      });
    });
    describe('delete user', function() {
      it('should not destroy a user without valid credentials', function(done) {
        request(app)
          .post('/api/users/destroy')
          .send({
            'username': 'testuser',
            'password': 'fakepass',
            'teamname': 'test team'   
          })
          .expect(401);
        request(app)
          .post('/api/users/destroy')
          .send({
            'username': 'testuser',
            'password': 'testpass',
            'teamname': 'fake team'   
          })
          .expect(401)
          .end(done);
      });
      it('should destroy a user with valid credentials', function(done) {
        request(app)
          .post('/api/users/destroy')
          .send({
            'username': 'testuser',
            'password': 'testpass',
            'teamname': 'test team'   
          })
          .expect(200)
          .end(done);
      });
    });
  });

});