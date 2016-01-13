process.env.NODE_ENV = "test"; // Use test database

var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../../doozy/server');
var db = require('../../doozy/config');
var Project = require('../../doozy/models/project');
var Org = require('../../doozy/models/org');
var User = require('../../doozy/models/user');
var Task = require('../../doozy/models/task');
var mongoose = require('mongoose');

describe('Organization API (api/organization)', function() {
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

  it('should get an organization by id', function(done) {
    request(app)
      .get('/api/orgs/' + org._id)
      .expect(function(res) {
        expect(res.body.title).to.equal('org1');
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

  it('should delete an organization', function(done) {
    request(app)
      .delete('/api/orgs/' + org._id)
      .expect(200)
      .then(function() {
        Org.findById(org._id, function(err, org) {
          console.log(org);
          expect(org).to.equal(null);
          done();
        });
      });
  });

});
