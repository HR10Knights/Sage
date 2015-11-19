process.env.NODE_ENV = "test"; // Use test database

var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../../doozy/server');
var db = require('../../doozy/config');
var Project = require('../../doozy/models/project');
var mongoose = require('mongoose');
var con = mongoose.createConnection('mongodb://localhost/doozytest');


describe('Projects API (api/projects)', function() {
  var project;

  beforeEach(function (done) {
    project = {
      'description': 'test project description',
      'name': 'test project'
    };

    con = mongoose.createConnection('mongodb://localhost/doozytest');
    setTimeout(done, 500); // hack to give connection enough time
  });

  afterEach(function(done) {
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
        .send(project)
        .expect(201)
        .end(done);
    });

    it('should not create a project with a taken name', function (done) {
      // create project
      request(app)
        .post('/api/projects/create')
        .send(project)
        .expect(201)
        // try to create a project with the same name 
        .then(function () {
          project.description = 'different description';
          
          request(app)
            .post('/api/projects/create')
            .send(project)
            .expect(400)
            .end(done);
        });
    });
  });

  // READ
  describe('/', function () {
    it('gets listing of tasks', function(done) {
      request(app)
        .post('/api/projects/create')
        .send(project)
        .expect(201)
        .then(function () {
          request(app)
            .get('/api/projects/')
            .expect(200)
            .then(function () {
              Project.findOne({name: project.name}, function (err, foundProject) {
              if (err) return console.log("Err: ", err);

              expect(foundProject.name).to.equal(project.name);
              done();
              });
            });
        });
    });
  });

  // UPDATE

  // DELETE
});
