var mongoose = require('mongoose');

var Task = require('../models/task');
var User = require('../models/user');
var Project = require('../models/project');


module.exports = {

  getTasksByProject: function(req, res, next) {
    Project.findById(req.params.projectId)
      .populate('tasks')
      .exec(function(err, project) {
        if (err) {
          return res.status(500).send();
        }
        res.status(200).send(project.tasks);
      });
  },

  createTaskByProject: function(req, res, next) {
    var task = new Task(req.body.task);
    Project.findById(req.body.projectId, function(err, project) {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      if (project) {
        project.tasks.push(task._id);
        project.save(function(err) {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }
          task.save(function(err) {
            if (err) {
              console.log(err);
              return res.status(500).send(err);
            }
            res.status(201).send(project);
          });
        });
      } else {
        res.status(404).send();
      }
    });
  },

  allTasks: function(req, res, next) {
    Task.find({}, function(err, tasks) {
      res.status(200).send(tasks);
    });
  },

  assignTask: function(req, res, next) {
    var user = req.body.user;
    var task = req.body.task;

    Task.findOne({
      _id: task
    }, function(err, task) {
      if (err) return res.sendStatus(404, err);

      User.findOne({
        _id: user
      }, function(err, user) {
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

  idToTask: function(req, res, next) {
    var taskId = mongoose.Types.ObjectId(req.params.id);
    Task.find({
      _id: taskId
    }).populate('users').exec(function(err, tasks) {
      if (err) return res.sendStatus(404, err);

      res.status(200).send(tasks);
    });
  },

  updateTask: function(req, res, next) {
    Task.findOne({
      _id: req.body._id
    }, function(err, task) {
      console.log('task: ' + task);
      if (err) return res.sendStatus(404, err);

      task.name = req.body.name;
      task.description = req.body.description;
      task.isCompleted = req.body.isCompleted;
      task.users = req.body.users;
      // console.log('users: ');
      // console.log(req.body.users);

      task.save(function(err, task) {
        if (err) console.log('err: ', err);
        if (err) return res.sendStatus(404, err);

        res.sendStatus(205);
      });
    });
  },

  deleteTask: function(req, res, next) {
    var taskId = mongoose.Types.ObjectId(req.params.id);
    // console.log('delete task: ' + taskId);

    Task.remove({
      _id: taskId
    }, function(err) {
      if (err) return res.sendStatus(404, err);

      res.sendStatus(200);
    });
  }
};
