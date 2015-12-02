process.env.NODE_ENV = "test"; // Use test database

var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../../doozy/server');
var db = require('../../doozy/config');
var Project = require('../../doozy/models/project');
var Org = require('../../doozy/models/org');
var User = require('../../doozy/models/user');
var mongoose = require('mongoose');



describe('Projects API (api/projects)', function() {
  var org, project, con;

  before(function(done) {
    con = mongoose.createConnection('mongodb://localhost/doozytest');
    done();
  });

  after(function(done) {
    con.db.dropDatabase(function(err, result) {
      con.close(done);
    });
  });

  it('should create a new organization', function(done) {
    request(app)
      .post('/api/orgs/')
      .send({
        title: 'org1'
      })
      .expect(201)
      .end(done);
  });

  it('should not create an organization that already exists', function(done) {
    request(app)
      .post('/api/orgs/')
      .send({
        title: 'org1'
      })
      .expect(400)
      .end(done);
  });


  it('should get all organizations', function(done) {
    request(app)
      .get('/api/orgs/')
      .expect(function(res) {
        org = res.body[0];
        expect(res.body[0].title).to.equal('org1');
      })
      .end(done);
  });

  it('should update an organization', function(done) {
    expect(org.title).to.equal('org1');
    org.title = 'new organization';
    request(app)
      .put('/api/orgs')
      .send(org)
      .expect(205)
      .then(function() {
        Org.findById(org._id, function(err, org) {
          if (err) console.log(err);
          expect(org.title).to.equal('new organization');
          done();
        });
      });
  });

  it('should add a project to an organization', function(done) {
    request(app)
      .post('/api/projects/create')
      .send({
        orgId: org._id,
        project: {
          'name': 'project',
          'description': 'project'
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
          'name': 'project',
          'description': 'project'
        }
      })
      .expect(404)
      .end(done);
  });

  it('should get projects from an organization', function(done) {
    request(app)
      .get('/api/projects/org/' + org._id)
      .expect(function(res) {
        project = res.body[0];
        expect(res.body[0].name).to.equal('project');
        expect(res.body.length).to.equal(1);
      })
      .end(done);
  });

  it('should delete an organization', function(done) {
    request(app)
      .delete('/api/orgs/' + org._id)
      .expect(200)
      .then(function() {
        Org.findById(org._id, function(err, org) {
          expect(org).to.equal(null);
          done();
        });
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

  it('should delete an project', function(done) {
    request(app)
      .delete('/api/projects/' + project._id)
      .expect(200)
      .then(function() {
        Org.findById(project._id, function(err, project) {
          expect(project).to.equal(null);
          done();
        });
      });
  });

  describe('users', function() {
    var user, org, project;

    before(function(done) {
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
            user = foundUser;
            Org.create({
              title: 'org1'
            }, function(err, foundOrg) {
              if (err) console.log(err);
              org = foundOrg;

              Project.create({
                name: 'project',
                description: 'project'
              }, function(err, foundProject) {
                if (err) console.log(err);
                project = foundProject;
                done();
              });
            });
          });
        });
    });

    it('should have a user, organization, and a project', function(done) {
      expect(user.username).to.equal('auser');
      expect(org.title).to.equal('org1');
      expect(project.name).to.equal('project');
      done();
    });

    it('should add an organization to the user', function(done) {
      request(app)
        .post('/api/users/orgs')
        .send({
          userId: user._id,
          organizationId: org._id
        })
        .expect(200)
        .end(done);
    });

    it('should add a project to the user', function(done) {
      request(app)
        .post('/api/users/projects')
        .send({
          userId: user._id,
          projectId: project._id
        })
        .expect(200)
        .end(done);
    });

    it('should get all organizations for a user', function(done) {
      request(app)
        .get('/api/users/orgs/' + user._id)
        .expect(function(res){
          expect(res.body.length).to.equal(1);
          expect(res.body[0].title).to.equal('org1');
        })
        .end(done);
    });

    it('should get all projects for a user', function(done) {
      request(app)
        .get('/api/users/projects/' + user._id)
        .expect(function(res){
          expect(res.body.length).to.equal(1);
          expect(res.body[0].name).to.equal('project');
        })
        .end(done);
    });

  });



});
