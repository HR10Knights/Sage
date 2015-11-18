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
    description: description,
    status: 'Staging'
  });
  newTask.save(function(err, newTask) {
    if (err) {
      res.sendStatus(404, err);
    } else {
      res.sendStatus(201);
    }
  });
});

// Complete task
// curl -H "Content-Type: application/json" -X POST -d '{"id":"564ba3c274dcdd15294eb3ed"}' http://localhost:3000/api/tasks/complete
router.post('/complete', function(req, res, next) {
  var id = req.body.id;
  Task.update({_id: id}, { $set: { status: 'Complete' }}, function(err) {
    if (err) {
      res.send(404).send('Not found');
    } else {
      res.sendStatus(200);
    }
  });
});
module.exports = router;