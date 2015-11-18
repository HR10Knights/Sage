// This file contains seed data for development purposes
var db = require('./config');
var Project = require('./models/project');
var Task = require('./models/task');
var User = require('./models/user');
var Team = require('./models/team');
var mongoose = require('mongoose');
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
          user.save(function(err, u) {
            console.log('Created user and team');
          })
        })
      })
    }

  },

  drop: function() {
    mongoose.connect('mongodb://localhost/doozy');
    mongoose.connection.collections['teams'].drop( function(err) {
        console.log('teams dropped');
    });
    mongoose.connection.collections['projects'].drop( function(err) {
        console.log('projects dropped');
    });
    mongoose.connection.collections['tasks'].drop( function(err) {
        console.log('tasks dropped');
    });
    mongoose.connection.collections['users'].drop( function(err) {
        console.log('users dropped');
    });
  }
};

module.exports = SeedData;
SeedData.drop();
SeedData.create();