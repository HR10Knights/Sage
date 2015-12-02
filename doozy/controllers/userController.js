// NOTE: createUser and loginUser are in the indexController
// var Team = require('../models/team');
var User = require('../models/user');
var Task = require('../models/task')
var Project = require('../models/project')


module.exports = {
  allUsers: function(req, res, next) {
    // send only _id and username
    User.find({}, '_id username', function(err, users) {
      if (err) return res.status(500).send();

      res.status(200).send(users);
    });
  },

  /**
   * Returns all users that have given taskId in their task list
   */
  getUserByTaskId: function(req, res, next) {
    var taskId = req.params.taskId;
    User.find({
      task_list: {
        $in: taskId
      }
    }, {}, function(err, users) {
      if (err) return res.status(500).send();

      res.status(200).send(users);
    });
  },

  /**
   * Returns all users that are part of a project
   */
  getUserByProjectId: function(req, res, next) {
    var projectId = req.params.projectId;
    User.find({
      project_list: {
        $in: projectId
      }
    }, {}, function(err, users) {
      if (err) return res.status(500).send();

      res.status(200).send(users);
    });
  },

  /**
   * Returns all users that are part of an organization
   */
  getUserByOrganizationId: function(req, res, next) {
    var organizationId = req.params.organizationId;
    User.find({
      organization_list: {
        $in: organizationId
      }
    }, {}, function(err, users) {
      if (err) return res.status(500).send();

      res.status(200).send(users);
    });
  },

  destroyUser: function(req, res, next) {
    var username = req.body.username.trim();
    var password = req.body.password.trim();
    var teamname = req.body.teamname.trim();

    Team.findOne({
      name: teamname
    }, function(err, team) {
      if (!team) return res.status(401).send('Team does not exist');

      User.findOne({
        username: username
      }, function(err, user) {
        if (!user) return res.status(401).send('Username does not exist');

        user.comparePassword(password, function(match) {
          if (!match) return res.status(401).send('Password does not match');

          user.remove();
          res.status(200).send('Deleted');
        });
      });
    });
  },

  getTasksForUser: function(req, res, next){
    var userId = req.params.userId
    User.findOne({_id: userId})
    .populate('task_list')
    .exec(function (err, user) {
      if (err) {
        return res.status(500).send();
      }
      res.status(200).send(user.task_list);
    });

  },

  getProjectsforUser: function(req, res, next){
    var userId = req.params.userId
    User.findOne({_id: userId})
    .populate('project_list')
    .exec(function (err, user) {
      if (err) {
        return res.status(500).send();
      }
      res.status(200).send(user.project_list);
    });
  },

  addTaskToUser: function(req, res, next){
    var userId = req.body.userId;
    var taskId = req.body.taskId;

    User.findOne({_id: userId}, function (err, user){
      if (err) {
        return res.status(500).send();
      }
      Task.findOne({_id: taskId}, function (err, task){
        if (err) {
          return res.status(500).send();
        }
        user.task_list.push(task);
        res.status(200).send(user);
      });
    });
  },

  addProjectToUser: function(req, res, next){
    var userId = req.body.userId;
    var projectId = req.body.projectId;

    User.findOne({_id: userId}, function (err, user){
      if (err) {
        return res.status(500).send();
      }
      Project.findOne({_id: taskId}, function (err, project){
        if (err) {
          return res.status(500).send();
        }
        user.project_list.push(project);
        res.status(200).send(user);
      });
    });
  }
};
