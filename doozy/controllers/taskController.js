var mongoose = require('mongoose');

var Task = require('../models/task');
var User = require('../models/user');
var Project = require('../models/project');


module.exports = {

  /**
   * Returns all users that have given taskId in their task list
   */
  getUserByTaskId: function(req, res, next) {
    User.find({
      'task_list': req.params.taskId
    }, function(err, users) {
      if (err) return res.status(500).send();

      res.status(200).send(users);
    });
  },

  /**
   * [Creates a task for a given project]
   * @param  {[object]}   req  [req.body.name, req.body.description, req.body.projectId]
   * @return {[object]}              [Updated Project]
   */
  createTaskByProject: function(req, res, next) {

    Project.findById(req.body.projectId, function(err, project) {
      if (err) {
        return res.status(500).send(err);
      }
      if (project) {
        var task = new Task({
          name: req.body.name,
          description: req.body.description,
          project_id: project._id
        });
        project.tasks.push(task._id);
        project.save(function(err) {
          if (err) {
            return res.status(500).send(err);
          }
          task.save(function(err) {
            if (err) {
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

  /**
   * [Gets a task by id]
   * @param  {[object]}   req.params.id  [Task's _id]
   * @return {[object]}                   [Task]
   */
  getTaskById: function(req, res, next) {
    Task.findById(req.params.id, function(err, tasks) {
      if (err) return res.sendStatus(404, err);

      res.status(200).send(tasks);
    });
  },

  /**
   * [Updates a task]
   * @param  {[object]}   req.body  [Fields to update.  Requires _id]
   * @return {[object]}             [Updated task]
   */
  updateTaskById: function(req, res, next) {

    Task.findOne({
      _id: req.body._id
    }, function(err, task) {

      if (err) return res.sendStatus(404, err);

      task.name = req.body.name;
      task.description = req.body.description;
      task.isCompleted = req.body.isCompleted;

      task.save(function(err, task) {
        if (err) console.log('err: ', err);
        if (err) return res.sendStatus(404, err);

        res.status(205).send(task);
      });
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

  /**
   * Removes a task
   * @param  {[object]}   req.params.id  [_id of task to remove]
   * @return {[object]}                  [removed task]
   */
  removeTask: function(req, res, next) {
    Task.findOneAndRemove(req.params.id, function(err, task) {
      if (err) return res.sendStatus(500, err);
      if (!task) {
        return res.sendStatus(404, err);
      } else {
        task.remove();
      }
      res.status(200).send(task);
    });
  }
};
