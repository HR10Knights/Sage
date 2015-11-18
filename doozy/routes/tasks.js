var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Task = require('../models/task');

var util = require('../util');
// List tasks
router.get('/', function(req, res, next) {
  Task.find({}, function(err, tasks) {
    res.status(200).send(tasks);
  });
});

// View task
router.get('/:id', function(req, res, next) {
  var taskId = mongoose.Types.ObjectId(req.params.id);
  Task.find({_id: taskId}, function(err, tasks) {
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
// outdated? curl example:
// curl -H "Content-Type: application/json" -X POST -d '{"name":"my task","description":"my description"}' http://localhost:3000/api/tasks
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

module.exports = router;