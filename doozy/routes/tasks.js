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

// Create task
// curl -H "Content-Type: application/json" -X POST -d '{"name":"my task","description":"my description"}' http://localhost:3000/api/tasks
router.post('/', function(req, res, next) {
  var name = req.body.name;
  var description = req.body.description;
  var newTask = new Task({
    name: name,
    description: description
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