// NOTE: createUser and loginUser are in the indexController
// var Team = require('../models/team');
var User = require('../models/user');
var Task = require('../models/task');
var Project = require('../models/project');
var Org = require('../models/org');


module.exports = {
  allUsers: function(req, res, next) {
    // send only _id and username
    User.find({}, '_id username', function(err, users) {
      if (err) return res.status(500).send();

      res.status(200).send(users);
    });
  },

  getLoggedInUser: function(req, res, next) {
    User.findById(req.user._id, {
      'password': false
    }, function(err, user) {
      if (err) return res.sendStatus(500, err);
      if (!user) return res.sendStatus(404, err);
      res.status(200).send(user);
    });
  },

  getUserById: function(req, res, next) {
    User.findById(req.params.id, {
      'password': false
    }, function(err, user) {
      if (err) return res.sendStatus(500, err);
      if (!user) return res.sendStatus(404, err);
      res.status(200).send(user);
    });
  },

  updateUser: function(req, res, next) {
    User.findOne({
      _id: req.body._id
    }, function(err, user) {

      if (err) return res.sendStatus(404, err);

      user.username = req.body.username;
      user.email = req.body.email;

      user.save(function(err, user) {
        if (err) console.log('err: ', err);
        if (err) return res.sendStatus(404, err);

        res.status(200).send(user);
      });
    });
  },

  removeUser: function(req, res, next) {
    var username = req.body.username.trim();
    var password = req.body.password.trim();
    User.findOne({
      username: username
    }, function(err, user) {
      if (!user) return res.status(401).send('Username does not exist');

      user.comparePassword(password, function(match) {
        if (!match) return res.status(401).send('Password does not match');

        user.remove();
        res.status(200).send(user);
      });
    });
  },

  addTaskToUser: function(req, res, next) {
    var userId = req.body.userId;
    var taskId = req.body.taskId;

    User.findOne({
      _id: userId
    }, function(err, user) {
      if (err) {
        return res.status(500).send();
      }
      Task.findOne({
        _id: taskId
      }, function(err, task) {
        if (err) {
          return res.status(500).send();
        }
        if (!task) {
          return res.status(404).send();
        }
        user.task_list.push(task);
        user.save(function(err, user) {
          if (err) {
            return res.status(500).send();
          }
          res.status(200).send(user);
        });
      });
    });
  },

  addProjectToUser: function(req, res, next) {
    var userId = req.body.userId;
    var projectId = req.body.projectId;

    User.findOne({
      _id: userId
    }, function(err, user) {
      if (err) {
        return res.status(500).send();
      }
      Project.findOne({
        _id: projectId
      }, function(err, project) {
        if (err) {
          return res.status(500).send();
        }
        if (!project) {
          return res.status(404).send();
        }
        user.project_list.push(project._id);
        user.save(function(err, user) {
          if (err) {
            return res.status(500).send();
          }
          res.status(200).send(user);
        });
      });
    });
  },

  addOrganizationToUser: function(req, res, next) {
    var userId = req.body.userId;
    var organizationId = req.body.organizationId;

    User.findOne({
      _id: userId
    }, function(err, user) {
      if (err) {
        return res.status(500).send();
      }
      Org.findOne({
        _id: organizationId
      }, function(err, org) {
        if (err) {
          return res.status(500).send();
        }
        if (!org) {
          return res.status(404).send();
        }
        user.organization.push(org._id);
        user.save(function(err, user) {
          if (err) {
            return res.status(500).send();
          }
          res.status(200).send(user);
        });
      });
    });
  },

  removeUserFromProject: function(req, res, next) {
    var projectId = req.body.projectId;
    var userId = req.body.userId;
    User.update({
      _id: userId
    }, {
      $pull: {
        project_list: projectId
      }
    }, function(err, user) {
      if (err) {
        return res.status(500).send();
      }
      res.status(200).send(user);
    });
  },

  removeUserFromTask: function(req, res, next) {
    var taskId = req.body.taskId;
    var userId = req.body.userId;
    User.update({
      _id: userId
    }, {
      $pull: {
        task_list: taskId
      }
    }, function(err, user) {
      if (err) {
        return res.status(500).send();
      }
      res.status(200).send(user);
    });
  },

  removeUserFromOrganization: function(req, res, next) {
    var organizationId = req.body.organizationId;
    var userId = req.body.userId;
    User.update({
      _id: userId
    }, {
      $pull: {
        organization: organizationId
      }
    }, function(err, user) {
      if (err) {
        return res.status(500).send();
      }
      res.status(200).send(user);
    });
  }
};
