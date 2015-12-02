process.env.NODE_ENV = "test"; // Use test database

var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../../doozy/server');
var db = require('../../doozy/config');
var Project = require('../../doozy/models/project');
var Org = require('../../doozy/models/org');
var mongoose = require('mongoose');



describe('Projects API (api/projects)', function() {
  var org, project, con;

  before(function(done) {
    con = mongoose.createConnection('mongodb://localhost/doozytest');
    request(app)
      .post('/api/orgs/create')
      .send({
        'title': 'org1',
      })
      .expect(201)
      .then(function() {
        Org.findOne({
          title: 'org1'
        }, function(err, foundOrg) {
          org = foundOrg;
          request(app)
            .post('/api/projects/create')
            .send({
              orgId: org._id,
              project: {
                'name': 'project1',
                'description': 'project1'
              }
            })
            .expect(201)
            .then(function() {
              Project.findOne({
                name: 'project1'
              }, function(err, foundProject) {
                project = foundProject;
                done();
              });
            });
        });
      });
  });

  after(function(done) {
    con.db.dropDatabase(function(err, result) {
      con.close(done);
    });
  });

  it('should have one organization', function(done) {
    request(app)
      .get('/api/orgs/')
      .expect(function(res) {
        expect(res.body[0].title).to.equal('org1');
      })
      .end(done);
  });

  it('should add a project to an organization', function(done) {
    request(app)
      .post('/api/projects/create')
      .send({
        orgId: org._id,
        project: {
          'name': 'project2',
          'description': 'project1'
        }
      })
      .expect(201)
      .end(done);
  });

  it('should not add a project to an organization that does not exist', function(done) {
    request(app)
      .post('/api/projects/create')
      .send({
        orgId: mongoose.Types.ObjectId(),
        project: {
          'name': 'project2',
          'description': 'project1'
        }
      })
      .expect(404)
      .end(done);
  });

  it('should get projects from an organization', function(done) {
    request(app)
      .get('/api/projects/' + org._id)
      .expect(function(res) {
        expect(res.body[0].name).to.equal('project1');
        expect(res.body.length).to.equal(2);
      })
      .end(done);
  });
});
