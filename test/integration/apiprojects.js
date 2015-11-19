process.env.NODE_ENV = "test"; // Use test database

var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../../doozy/server');
var db = require('../../doozy/config');
var Project = require('../../doozy/models/project');
var mongoose = require('mongoose');
var con = mongoose.createConnection('mongodb://localhost/doozytest');

describe('Projects API', function() {

  after(function(done) {
    con.db.dropDatabase(function(err, result) {
      con.close(done);
    });
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

  });

  // READ
  describe('/', function () {
    xit('gets listing of tasks', function(done) {
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
