process.env.NODE_ENV = "test"; // Use test database

var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var sinon = require('sinon');
var app = require('../../doozy/server');
var emailController = require('../../doozy/controllers/emailController');


describe('Emails', function() {
	before(function () {
		
	});

	after(function () {
		
	});

  it('sends an email', function(done) {
    
  });
});
