process.env.NODE_ENV = "test"; // Use test database

var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../../doozy/server');
var db = require('../../doozy/config');
var Project = require('../../doozy/models/project');
var Org = require('../../doozy/models/org');
var Task = require('../../doozy/models/task');
var User = require('../../doozy/models/user');
var mongoose = require('mongoose');



describe('Projects API (api/projects)', function() {
  var project, con;

  before(function(done) {
    con = mongoose.createConnection('mongodb://localhost/doozytest');
    Project.create({
      name: 'project'
    }, function(err, foundProject) {
      project = foundProject;
      done();
    });
  });

  after(function(done) {
    con.db.dropDatabase(function(err, result) {
      con.close(done);
    });
  });

  it('should get a project by id', function(done) {
    request(app)
      .get('/api/projects/' + project._id)
      .expect(200)
      .end(done);
  });

  it('should 404 for a project that does not exist', function(done) {
    request(app)
      .get('/api/projects/' + mongoose.Types.ObjectId())
      .expect(404)
      .end(done);
  });

  it('should update a project', function(done) {
    expect(project.name).to.equal('project');
    project.name = 'new project';

    request(app)
      .put('/api/projects')
      .send(project)
      .expect(205)
      .then(function() {
        Project.findById(project._id, function(err, foundProject) {
          expect(foundProject.name).to.equal('new project');
          done();
        });
      });
  });

  describe('projects', function() {
    var project, task;

    before(function(done) {
      Task.create({
          name: 'task'
        })
        .then(function(foundTask) {
          task = foundTask;
          return Project.create({
            name: 'project2'
          });
        })
        .then(function(foundProject) {
          project = foundProject;
          project.tasks.push(task._id);
          return project.save();
        })
        .then(function(foundTask) {
          return Org.create({
            name: 'org2'
          });
        })
        .then(function(foundOrg) {
          org = foundOrg;
          org.projects.push(project._id);
          return org.save();
        })
        .then(function() {
          done();
        });
    });

    it('should add a project to an organization', function(done) {
      request(app)
        .post('/api/projects/create')
        .send({
          orgId: org._id,
          name: 'project1',
          description: 'project'
        })
        .expect(201)
        .end(done);
    });

    it('should get a project from an organization', function(done) {
      request(app)
        .get('/api/orgs/' + org._id)
        .expect(function(res) {
          expect(res.body.projects.length).to.equal(2);
          expect(res.body.projects[0].name).to.equal('project2');
        })
        .end(done);
    });

    it('should not add a project to an organization that does not exist', function(done) {
      request(app)
        .post('/api/projects/create')
        .send({
          orgId: mongoose.Types.ObjectId(),
          project: {
            'name': 'project',
            'description': 'project'
          }
        })
        .expect(404)
        .end(done);
    });

  });

  it('should delete an project', function(done) {
    request(app)
      .delete('/api/projects/' + project._id)
      .expect(200)
      .then(function() {
        Project.findById(project._id, function(err, project) {
          expect(project).to.equal(null);
          done();
        });
      });
  });

});
