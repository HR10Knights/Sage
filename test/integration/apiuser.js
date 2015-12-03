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

describe('User API (api/projects) ', function() {
  var user;

  before(function(done) {
    con = mongoose.createConnection('mongodb://localhost/doozytest');
    request(app)
      .post('/api/signup')
      .send({
        'username': 'auser',
        'password': 'apass',
      })
      .expect(201)
      .then(function() {
        User.findOne({
          username: 'auser'
        }, function(err, foundUser) {
          if (err) console.log(err);
          user = foundUser;
          done();
        });
      });
  });

  after(function(done) {
    con.db.dropDatabase(function(err, result) {
      con.close(done);
    });
  });

  it('should find all users', function(done) {
    request(app)
      .get('/api/users')
      .expect(function(res) {
        expect(res.body.length).to.equal(1);
      })
      .end(done);
  });

  it('should find a user by id', function(done) {
    request(app)
      .get('/api/users/' + user._id)
      .expect(function(res) {
        expect(res.body.username).to.equal('auser');
      })
      .end(done);
  });

  it('should update a user by id', function(done) {
    expect(user.username).to.equal('auser');
    user.username = 'newuser';

    request(app)
      .put('/api/users/')
      .send(user)
      .expect(200)
      .then(function() {
        User.findById(user._id, function(err, user) {
          if (err) console.log(err);
          expect(user.username).to.equal('newuser');
          done();
        })
      });
  });

  describe('organization', function() {
    var org;

    before(function(done) {
      Org.create({
        title: 'org'
      }, function(err, foundOrg) {
        if (err) console.log(err);
        org = foundOrg;
        done();
      });
    });

    it('should add an organization to the user', function(done) {
      request(app)
        .post('/api/users/orgs')
        .send({
          userId: user._id,
          organizationId: org._id
        })
        .expect(200)
        .end(done)
    });

    it('should not add an organization that doesn\'t exist', function(done) {
      request(app)
        .post('/api/users/orgs')
        .send({
          userId: user._id,
          organizationId: mongoose.Types.ObjectId()
        })
        .expect(404)
        .end(done)
    });

    it('should find all organizations for the user', function(done) {
      request(app)
        .get('/api/users/' + user._id)
        .expect(function(res) {
          expect(res.body.organization[0].title).to.equal('org');
        })
        .end(done)
    });

    it('should find users for an organization', function(done) {
      request(app)
        .get('/api/orgs/users/' + org._id)
        .expect(function(res) {
          expect(res.body.length).to.equal(1);
          expect(res.body[0].username).to.equal('newuser');
        })
        .end(done)
    });
  });

  describe('projects', function() {
    var project;

    before(function(done) {
      Project.create({
        name: 'project',
        description: 'project'
      }, function(err, foundProject) {
        if (err) console.log(err);
        project = foundProject;
        done();
      });
    });

    it('should add an project to the user', function(done) {
      request(app)
        .post('/api/users/projects')
        .send({
          userId: user._id,
          projectId: project._id
        })
        .expect(200)
        .end(done)
    });

    it('should not add an project that doesn\'t exist', function(done) {
      request(app)
        .post('/api/users/projects')
        .send({
          userId: user._id,
          projectId: mongoose.Types.ObjectId()
        })
        .expect(404)
        .end(done)
    });

    it('should find all projects for the user', function(done) {
      request(app)
        .get('/api/users/' + user._id)
        .expect(function(res) {
          expect(res.body.project_list[0].name).to.equal('project');
        })
        .end(done);
    });

    it('should find all users for the project', function(done) {
      request(app)
        .get('/api/projects/users/' + project._id)
        .expect(function(res) {
          expect(res.body.length).to.equal(1);
          expect(res.body[0].username).to.equal('newuser');
        })
        .end(done);
    });
  });

  describe('tasks', function() {
    var task;

    before(function(done) {
      Task.create({
        name: 'task',
      }, function(err, foundTask) {
        if (err) console.log(err);
        task = foundTask;
        done();
      });
    });

    it('should add an project to the user', function(done) {
      request(app)
        .post('/api/users/tasks')
        .send({
          userId: user._id,
          taskId: task._id
        })
        .expect(200)
        .end(done)
    });

    it('should not add an task that doesn\'t exist', function(done) {
      request(app)
        .post('/api/users/tasks')
        .send({
          userId: user._id,
          taskId: mongoose.Types.ObjectId()
        })
        .expect(404)
        .end(done)
    });

    it('should find all tasks for the user', function(done) {
      request(app)
        .get('/api/users/' + user._id)
        .expect(function(res) {
          expect(res.body.task_list[0].name).to.equal('task');
        })
        .end(done)
    });

    it('should find all users for the task', function(done) {
      request(app)
        .get('/api/tasks/users/' + task._id)
        .expect(function(res) {
          expect(res.body.length).to.equal(1);
          expect(res.body[0].username).to.equal('newuser');
        })
        .end(done);
    });
  });

});
