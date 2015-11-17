process.env.NODE_ENV = "test"; // Use test database

var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../../doozy/server');
var db = require('../../doozy/config');
var mongoose = require('mongoose');
var Task = require('../../doozy/models/task');
var con;
describe('Tasks API', function() {
  before(function(done) {
    con = mongoose.createConnection('mongodb://localhost/doozytest');
    // mongoose.connection.on('error', function() {});
    done();
    // mongoose.connection.on('open', function(){
    //   con.connection.db.dropDatabase(function(err, result){
    //     if (err) {
    //       throw err;
    //     }
    //     done();
    //   });
    // });
  });
  after(function(done) {
    
    done();
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
        'name': 'findme',
        'description': 'find me'
      })
      .expect(201);
    
    var id;

    Task.find({name: 'findme'}, function(err, tasks) {
      id = tasks[0]._id;
      request(app)
        .get('/api/tasks/' + id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(done);
    });
  });

  describe('stages and assignments', function() {
    var id;

    beforeEach(function (done) {
      request(app)
        .post('/api/tasks')
        .send({
          'name': 'findme',
          'description': 'find me'
        })
        .expect(201);

      Task.find({name: 'findme'}, function(err, tasks) {
        id = tasks[0]._id;
        done();
      });
    });

    it('completes a task', function(done) {
      request(app)
        .post('/api/tasks/complete')
        .send({
          '_id': id
        })
        .expect(200)
        .end(done);
    });
  });

});