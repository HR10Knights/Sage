process.env.NODE_ENV = "test"; // Use test database

var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../../doozy/server');
var db = require('../../doozy/config');
var Project = require('../../doozy/models/project');
var Org = require('../../doozy/models/org');
var mongoose = require('mongoose');



describe('Tasks API (api/tasks)', function() {
  var org, project, con;

  before(function(done) {
    con = mongoose.createConnection('mongodb://localhost/doozytest');

    project = Project.create({
      name: 'project',
      description: 'project'
    }, function(err, foundProject) {
      if (err) console.log(err);
      if (foundProject) {
        project = foundProject;
        done();
      }
    });

  });

  it('should add a task to a project', function(done) {
    request(app)
      .post('/api/tasks/create')
      .send({
        projectId: project._id,
        task: {
          name: 'new task'
        }
      })
      .expect(201)
      .end(done);
  });

  it('should list all tasks for a project', function(done) {
    request(app)
      .get('/api/tasks/' + project._id)
      .expect(function(res){
      	expect(res.body.length).to.equal(1);
      })
      .end(done);
  });

  after(function(done) {
    con.db.dropDatabase(function(err, result) {
      con.close(done);
    });
  });

});
