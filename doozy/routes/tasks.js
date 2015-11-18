var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Task = require('../models/task');
var User = require('../models/user');

var util = require('../util');
// List tasks
router.get('/', function(req, res, next) {
  Task.find({}).populate('users').exec(function(err, tasks) {
    res.status(200).send(tasks);
  });
});

// View task
router.get('/:id', function(req, res, next) {
  var taskId = mongoose.Types.ObjectId(req.params.id);
  Task.find({_id: taskId}).populate('users').exec(function(err, tasks) {
    res.status(200).send(tasks);
  });
});

// Update task
router.put('/:id', function(req, res, next) {
  Task.findOne({_id: req.body._id}, function(err, task) {
    if (err) {
      res.sendStatus(404, err);
      return;
    }
    task.name = req.body.name;
    task.description = req.body.description;
    task.isCompleted = req.body.isCompleted;
    task.users = req.body.users;

    task.save(function (err, task) {
      if (err) {
        res.sendStatus(404, err);
        return;
      }
      res.sendStatus(205);
    });
  });
});

// Create task
// curl -H "Content-Type: application/json" -X POST -d '{"name":"my task 2","description":"my description"}' http://localhost:3000/api/tasks
router.post('/', function(req, res, next) {
  var users = req.body.users || [];

  var newTask = new Task({
    description: req.body.description,
    name: req.body.name,
    users: users
  });
  newTask.save(function(err, newTask) {
    if (err) {
      res.sendStatus(404, err);
    } else {
      res.sendStatus(201);
    }
  });
});

// Assign task to user
// curl -H "Content-Type: application/json" -X POST -d '{"user":"564cd72524d8b619223cd11b","task":"564d0970c7de37cd2bdb3ec2"}' http://localhost:3000/api/tasks/assign
router.post('/assign', function(req, res, next) {
  var user = req.body.user;
  var task = req.body.task;

  Task.findOne({_id: task}, function(err, task) {
    if (err) {
      res.sendStatus(404, err);
      return;
    }
    User.findOne({_id: user}, function(err, user) {
      if (err) {
        res.sendStatus(404, err);
        return;
      }
      task.users.push(user);
      user.tasks.push(task);
      task.save(function(err, t) {
        user.save(function(err, u) {
          if (err) {
            res.sendStatus(404, err);
          } else {
            res.sendStatus(200);
          }
        });
      });
    });
  });
});
module.exports = router;