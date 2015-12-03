process.env.NODE_ENV = "test"; // Use test database

var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../../doozy/server');
var db = require('../../doozy/config');
var User = require('../../doozy/models/user');
var mongoose = require('mongoose');
var con;


describe('Authentication', function() {
  before(function(done) {
    con = mongoose.createConnection('mongodb://localhost/doozytest');
    done();
  });

  after(function(done) {
    con.db.dropDatabase(function(err, result) {
      done();
    });
  });


  describe('Users', function() {
    describe('sign up', function() {
      // TODO Refactor this to create testuser before all

      it('should create a user', function(done) {
        var username = 'testuser';

        request(app)
          .post('/api/signup')
          .send({
            'username': username,
            'password': 'testpass',
          })
          .expect(201)
          .then(function () {
            User.findOne({username: username}, function (err, foundUser) {
              expect(foundUser.username).to.equal(username);

              // check if user in team
              done();
            });
          });
      });

      it('should not create a user with a taken user name', function(done) {
        request(app)
          .post('/api/signup')
          .send({
            'username': 'testuser',
            'password': 'testpass',
          })
          .expect(400, 'Username exists')
          .end(done);
      });

      // TODO refactor this into 3 tests
      it('should not create a user with a blank username, password, or teamname', function(done) {
        request(app)
          .post('/api/signup')
          .send({
            'username': 'testusertwo',
            'password': '          ',
          })
          .expect(400, 'Username, Password, and Teamname must be present');
        request(app)
          .post('/api/signup')
          .send({
            'username': '          ',
            'password': 'testpass',
          })
          .expect(400, 'Username, Password, and Teamname must be present')
          .end(done);
      });
      it('should give a list of users', function(done) {
        request(app)
          .get('/api/users')
          .expect(200)
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
          })
          .expect(200)
          .end(done);
      });

      it('should not log in a user with an incorrect password', function(done) {
        request(app)
          .post('/api/login')
          .send({
            'username': 'testuser',
            'password': 'fakepass',
          })
          .expect(401, 'Password does not match')
          .end(done);
      });

      it('should not log in a user with an invalid username', function(done) {
        request(app)
          .post('/api/login')
          .send({
            'username': 'fakeuser',
            'password': 'fakepass',
          })
          .expect(401, 'Username does not exist')
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
          })
          .expect(401)
          .end(done);
      });

      it('should destroy a user with valid credentials', function(done) {
        request(app)
          .post('/api/users/remove')
          .send({
            'username': 'testuser',
            'password': 'testpass',
          })
          .expect(200)
          .end(done);
      });
    });
  });

});