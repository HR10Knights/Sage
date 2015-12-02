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
    .exec(function (err, tasks) {
      if (err) return res.status(500).send();
      res.status(200).send(tasks)
    })

  },

  getProjectsforUser: function(req, res, next){
    var userId = req.params.userId
    User.findOne({_id: userId})
    .populate('project_list')
    .exec(function (err, projects) {
      if (err) return res.status(500).send();
      res.status(200).send(projects)
    })
  },

  addTaskToUser: function(req, res, next){
    var userId = req.params.userId;
    var taskId = req.params.taskId;

    User.findOne({_id: userId}, function (err, user){
      Task.findOne({_id: taskId}, function (err, task){
        user.task_list.push(task);
      });
    });
  },

  addProjectToUser: function(req, res, next){
    var userId = req.params.userId;
    var projectId = req.params.taskId;

    User.findOne({_id: userId}, function (err, user){
      Project.findOne({_id: taskId}, function (err, project){
        user.task_list.push(project);
      });
    });
  }
};
