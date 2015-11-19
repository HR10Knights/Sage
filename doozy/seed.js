// This file contains seed data for development purposes
var mongoose = require('mongoose');

var db = require('./config');
var Project = require('./models/project');
var Task = require('./models/task');
var User = require('./models/user');
var Team = require('./models/team');


var SeedData = {
  create: function() {
    var teamList = [
          {name: 'testteam'},
          {name: 'testteam2'},
          {name: 'testteam3'},
        ];
    var userList = [
          {username: 'testuser1', password: 'testpass'},
          {username: 'testuser2', password: 'testpass2'},
          {username: 'testuser3', password: 'testpass3'},
        ];
    var projectList = [
          {name: 'testproject', description: 'test project'},
          {name: 'testproject', description: 'test project'}
        ];

    for (var i = 0; i < teamList.length; i++) {
      var teamInfo = teamList[i];
      var newTeam = new Team(teamInfo);

      newTeam.save(function(err, team) {
        var userInfo = userList.shift();
        var user = new User(userInfo);

        user.team = team;
        team.users.push(user);

        team.save(function(err, t) {
          if (err) return console.log("Err: ", err);

          user.save(function(err, u) {
            if (err) return console.log("Err: ", err);

            console.log('Created user and team');
          });
        });
      });
    }
  },

  drop: function() { // TODO ? Refactor this to iterate through collections?
    mongoose.connect('mongodb://localhost/doozy');

    mongoose.connection.collections['teams'].drop( function(err) {
      if (err) return console.log("Err: ", err);

      console.log('teams dropped');
    });
    mongoose.connection.collections['projects'].drop( function(err) {
      if (err) return console.log("Err: ", err);

      console.log('projects dropped');
    });
    mongoose.connection.collections['tasks'].drop( function(err) {
      if (err) return console.log("Err: ", err);

      console.log('tasks dropped');
    });
    mongoose.connection.collections['users'].drop( function(err) {
      if (err) return console.log("Err: ", err);

      console.log('users dropped');
    });
  }
};


module.exports = SeedData;
SeedData.drop();
SeedData.create();
