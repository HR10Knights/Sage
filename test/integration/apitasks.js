process.env.NODE_ENV = "test"; // Use test database

var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../../doozy/server');
var db = require('../../doozy/config');
var mongoose = require('mongoose');
var Task = require('../../doozy/models/task');
var con = mongoose.createConnection('mongodb://localhost/doozytest');
describe('Tasks API', function() {


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

  describe('stages and assignments', function() {
    var id;

    before(function (done) {
      request(app)
        .post('/api/tasks')
        .send({
          'name': 'findme',
          'description': 'a test description'
        })
        .expect(201)
        .then(function() {
          Task.find({name: 'findme'}, function(err, tasks) {
            
            id = tasks[0]._id;
            done();
          });
        });

    });


  });

});