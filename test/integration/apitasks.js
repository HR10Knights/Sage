process.env.NODE_ENV = "test"; // Use test database

var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../../doozy/server');
var db = require('../../doozy/config');
var mongoose = require('mongoose');

// describe('Tasks API', function() {
//   before(function(done) {
//     var con = mongoose.connect('mongodb://localhost/doozytest');
//     mongoose.connection.on('error', function() {});
//     mongoose.connection.on('open', function(){
//       con.connection.db.dropDatabase(function(err, result){
//         done();
//       });
//     });
//   });
//   after(function(done) {
//     mongoose.connection.close();
//     done();
//   });
//   it('gets listing of tasks', function(done) {
//     done();
//   })
// })