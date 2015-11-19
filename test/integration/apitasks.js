process.env.NODE_ENV = "test"; // Use test database

var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../../doozy/server');
var db = require('../../doozy/config');
var mongoose = require('mongoose');
var Task = require('../../doozy/models/task');
var User = require('../../doozy/models/user');
var con = mongoose.createConnection('mongodb://localhost/doozytest');
var util = require('../../doozy/util');

var decodeStub;

describe('Tasks API', function() {
  before(function(done) {
    decodeStub = sinon.stub(util, 'decode');
    request(app)
      .post('/api/signup')
      .send({
        'username': 'testuser',
        'password': 'testpass',
        'teamname': 'testteam'
      })
      .expect(201)
      .end(done);
  });
  after(function(done) {
    con.db.dropDatabase(function(err, result) {
      con.close(done);
    });
  });

  it('creates a task', function(done) {
    request(app)
      .post('/api/tasks')
      .send({
        'name': 'test task',
        'description': 'a test description'
      })
      .expect(201)
      .end(done);
  });

  it('rejects an invalid task', function(done) {
    request(app)
      .post('/api/tasks')
      .send({
        'name': ' ',
        'description': 'a test description'
      })
      .expect(404);
    request(app)
      .post('/api/tasks')
      .send({
        'name': 'test task',
        'description': 'ab'
      })
      .expect(404)
      .end(done);
  });
  
  it('list tasks', function(done) {
    request(app)
      .get('/api/tasks')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(done);
  });

  it('finds the task that was added by id', function(done) {
    request(app)
      .post('/api/tasks')
      .send({
        'name': 'abc123123',
        'description': 'abc123123abc123123'
      })
      .expect(201)
      .then(function() {
        var id;
        Task.find({}, function(err, tasks) {
          id = tasks[0]._id;
          request(app)
            .get('/api/tasks/' + id)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(done);
        });
      });
  });

  xdescribe('stages and assignments', function() {
    var task, user;

    before(function (done) {
      request(app)
        .post('/api/tasks')
        .send({
          'name': 'findme',
          'description': 'a test description'
        })
        .expect(201)
        .then(function() {
          Task.findOne({name: 'findme'}, function(err, foundTask) {
            task = foundTask;

            request(app)
              .post('/api/signup')
              .send({
                'username': 'testuser',
                'password': 'testpass',
                'teamname': 'test team' 
              })
              .expect(201)
              .then(function () {
                User.findOne({username: 'testuser'}, function (err, foundUser) {
                  user = foundUser;
                  done();
                });
              });
          });
        });
    });

    it('should be able to update a task to complete', function (done) {
      expect(task.isCompleted).to.equal(false);
      task.isCompleted = true;

      request(app)
        .put('/api/tasks/' + task._id)
        .send(task)
        .then(function () {
          Task.findOne({name: 'findme'}, function (err, foundTask) {

            expect(foundTask.isCompleted).to.equal(true);
            done();
          });
        });
    });

    it('should be able to update a task to incomplete', function (done) {
      expect(task.isCompleted).to.equal(true);
      task.isCompleted = false;

      request(app)
        .put('/api/tasks/' + task._id)
        .send(task)
        .expect(205)
        .then(function () {
          Task.findOne({name: 'findme'}, function (err, foundTask) {
            if (err) {
              console.log("Err: ", err);
            }

            expect(foundTask.isCompleted).to.equal(false);
            done();
          });
        });
    });

    it('should be able to add an assignee', function (done) {
      expect(task.users).to.have.length(0);
      task.users.push(user._id);

      request(app)
        .put('/api/tasks/' + task._id)
        .send(task)
        .expect(205)
        .then(function () {
          Task.findOne({name: 'findme'}, function (err, foundTask) {
            if (err) {
              console.log("Err: ", err);
            }

            task = foundTask;
            expect(task.users).to.have.length(1);
            done();
          });
        });
    });

    it('should be able to add an assignee after assignees were cleared', function (done) {
      expect(task.users).to.have.length(1); // from last test FIXME make tests modular
      task.users = [];

      request(app)
        .put('/api/tasks/' + task._id)
        .send(task)
        .expect(205)
        .then(function () {
          Task.findOne({name: 'findme'}, function (err, foundTask) {
            if (err) {
              console.log("Err: ", err);
            }

            expect(foundTask.users).to.have.length(0);
            task.users.push(user._id);

              request(app)
                .put('/api/tasks/' + task._id)
                .send(task)
                .expect(205)
                .then(function () {
                  Task.findOne({name: 'findme'}, function (err, foundTask) {
                    if (err) {
                      console.log("Err: ", err);
                    }

                    expect(foundTask.users).to.have.length(1);
                    done();
                  });
                });
          });
        });
      });

    xit('should respond with whether or not changes were made', function (done) {
      // body...
    });
  });
});