var mongoose = require('mongoose');

var Task = require('../models/task');
var User = require('../models/user');


module.exports = {
  allTasks: function(req, res, next) {
    Task.find({}).populate('users').exec(function(err, tasks) {
      res.status(200).send(tasks);
    });
  },

  assignTask: function(req, res, next) {
    var user = req.body.user;
    var task = req.body.task;

    Task.findOne({_id: task}, function(err, task) {
      if (err) return res.sendStatus(404, err);

      User.findOne({_id: user}, function(err, user) {
        if (err) return res.sendStatus(404, err);

        task.users.push(user);
        user.tasks.push(task);
        task.save(function(err, t) {
          user.save(function(err, u) {
            if (err) return res.sendStatus(404, err);

            res.sendStatus(200);
          });
        });
      });
    });
  },

  createTask: function(req, res, next) {
    var users = req.body.users || [];
    // console.log('list of users: ' + req.body.users);

    var newTask = new Task({
      description: req.body.description,
      name: req.body.name,
      users: users
    });
    newTask.save(function(err, newTask) {
      if (err) return res.sendStatus(404, err);

      res.sendStatus(201);
    });
  },

  idToTask: function(req, res, next) {
    var taskId = mongoose.Types.ObjectId(req.params.id);
    Task.find({_id: taskId}).populate('users').exec(function(err, tasks) {
      if (err) return res.sendStatus(404, err);

      res.status(200).send(tasks);
    });
  },

  updateTask: function(req, res, next) {
    Task.findOne({_id: req.body._id}, function(err, task) {
      if (err) return res.sendStatus(404, err);

      task.name = req.body.name;
      task.description = req.body.description;
      task.isCompleted = req.body.isCompleted;
      task.users = req.body.users;
      console.log('users: ')
      console.log(req.body.users);

      task.save(function (err, task) {
        if (err) return res.sendStatus(404, err);

        res.sendStatus(205);
      });
    });
  },
  deleteTask: function(req, res, next) {
    var taskId = mongoose.Types.ObjectId(req.params.id);
    console.log('delete task: ' + taskId);
    Task.remove({ _id: taskId }, function(err) {
      if (err) return res.sendStatus(404, err)
      
      res.sendStatus(205);
    })
  }
};
