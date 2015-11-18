process.env.NODE_ENV = "test"; // Use test database

var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../../doozy/server');
var db = require('../../doozy/config');
var Project = require('../../doozy/models/project');
var mongoose = require('mongoose');
var con;

describe('Projects API', function() {
  before(function(done) {
    var con = mongoose.connect('mongodb://localhost/doozytest');
    mongoose.connection.on('error', function() {});
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

  describe('/create', function () {

    it('should reject a project with whitespace name and description', function (done) {
      request(app)
        .post('/api/projects/create')
        .send({
          'description': '          ',
          'name': '          '
        })
        .expect(400)
        .end(done);
    });

    it('should reject a project with a name less than 3 characters', function (done) {
      request(app)
        .post('/api/projects/create')
        .send({
          'description': 'test project description',
          'name': ' do '
        })
        .expect(400)
        .end(done);
    });

    it('should reject a project with a description less than 3 characters', function (done) {
      request(app)
        .post('/api/projects/create')
        .send({
          'description': ' do ',
          'name': 'test project'
        })
        .expect(400)
        .end(done);
    });

    it('should create a new project', function (done) {
      request(app)
        .post('/api/projects/create')
        .send({
          'description': 'test project description',
          'name': 'test project'
        })
        .expect(201)
        .end(done);
    });

    it('should not create a project with a taken name', function (done) {
      request(app)
        .post('/api/projects/create')
        .send({
          'description': 'different test project description',
          'name': 'test project' // same name
        })
        .expect(400)
        .end(done);
    });

    it('should not create a project with a taken description', function (done) {
      request(app)
        .post('/api/projects/create')
        .send({
          'description': 'test project description', // same description
          'name': 'different test project'
        })
        .expect(400)
        .end(done);
    });
  });

  // READ
  describe('/', function () {
    it('gets listing of tasks', function(done) {
      request(app)
        .get('/api/projects/')
        .expect(200)
        .expect('Content-Type', /json/) // TODO make better by checking for specific project
        .end(done);
    });
  });

  // UPDATE

  // DELETE
});
