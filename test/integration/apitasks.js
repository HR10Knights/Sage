process.env.NODE_ENV = "test"; // Use test database

var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../../doozy/server');
var db = require('../../doozy/config');
var Project = require('../../doozy/models/project');
var Task = require('../../doozy/models/task');
var User = require('../../doozy/models/user');
var mongoose = require('mongoose');



describe('Tasks API (api/tasks)', function() {
  var task, project, con;

  before(function(done) {
    con = mongoose.createConnection('mongodb://localhost/doozytest');

    Project.create({
      name: 'project',
      description: 'project'
    }, function(err, foundProject) {
      if (err) console.log(err);
      if (foundProject) {
        project = foundProject;
      }
      Task.create({
        name: 'task',
        description: 'task'
      }, function(err, foundTask) {
        if (err) console.log(err);
        if (foundTask) {
          task = foundTask;
          done();
        }
      });
    });
  });

  after(function(done) {
    con.db.dropDatabase(function(err, result) {
      con.close(done);
    });
  });


  it('should have name, created_at, and isCompleted fields', function(done) {
    expect(task.name).to.not.equal(null);
    expect(task.created_at).to.not.equal(null);
    expect(task.isCompleted).to.not.equal(null);
    done();
  });

  it('should add a task to a project', function(done) {
    request(app)
      .post('/api/tasks/create')
      .send({
        projectId: project._id,
        name: 'new task'
      })
      .expect(201)
      .end(done);
  });

  it('rejects an invalid task', function(done) {
    request(app)
      .post('/api/tasks/create')
      .send({
        projectId: project._id,
        'name': ' ',
        'description': 'a test description'
      })
      .expect(500)
      .end(done);
  });

  it('should not add a task to a project that does not exist', function(done) {
    request(app)
      .post('/api/tasks/create')
      .send({
        projectId: mongoose.Types.ObjectId,
        name: 'new task'
      })
      .expect(404)
      .end(done);
  });


  it('should list all tasks for a project', function(done) {
    request(app)
      .get('/api/projects/' + project._id)
      .expect(function(res) {
        expect(res.body.tasks.length).to.equal(1);
        expect(res.body.tasks[0].name).to.equal('new task');
      })
      .end(done);
  });

  it('should get a task by task id', function(done) {
    request(app)
      .get('/api/tasks/' + task._id)
      .expect(200)
      .end(done);
  });

  it('should be able to update a task to complete', function(done) {
    expect(task.isCompleted).to.equal(false);
    task.isCompleted = true;
    request(app)
      .put('/api/tasks/')
      .send(task)
      .then(function() {
        Task.findOne({
          _id: task._id
        }, function(err, foundTask) {
          expect(foundTask.isCompleted).to.equal(true);
          done();
        });
      });
  });

  it('should be able to update a task to incomplete', function(done) {
    expect(task.isCompleted).to.equal(true);
    task.isCompleted = false;

    request(app)
      .put('/api/tasks/')
      .send(task)
      .expect(205)
      .then(function() {
        Task.findOne({
          _id: task._id
        }, function(err, foundTask) {
          if (err) console.log("Err: ", err);

          expect(foundTask.isCompleted).to.equal(false);
          done();
        });
      });
  });

  it('should delete an task', function(done) {
    request(app)
      .delete('/api/tasks/' + task._id)
      .expect(200)
      .then(function() {
        Task.findById(task._id, function(err, task) {
          expect(task).to.equal(null);
          done();
        });
      });
  });

});
