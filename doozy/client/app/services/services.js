angular.module('app.services', [
  'services.UserFactory'
  ])


// Project Factory

  // getProjectByOrganizationId
    // Get all projects for an organization
  
  // Remove Project
    // Delete project from organization
    // Removes all child teams

  // Add Team to Project
    // Adds a new team to the project
    // adds to project with id and posts new team info

// Team Factory

  // getTeamByOrganizationId
    // Get all teams for an organization

  // getTeamByProjectId
    // Get all teams for a project

  // addUserToTeam
    // Add a new user to a team by teamId
    // Associates with existing user or by email address if user isn't signed up yet

  // removeTeam
    // Delete team from a project
    // removes all child tasks

.factory('Tasks', function($http) {

/*
API format for a task object (all requests types):
taskObj = {
  name: 'task name',
  users: [userObj, userObj],
  description: 'bla bla bla',
  isCompleted: false
}

required properties: name, isCompleted
optional properties: users, description
*/

  var getAll = function() {
    return $http({
      method: 'GET',
      url: '/api/tasks'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  // getTaskByUserId
    // Gets all tasks assigned to a user

  // getTaskByTeamId
    // Gets all tasks assigned to a team

  // getTaskByProjectId
    // Gets all tasks assigned to a project

  // getTaskByOrganizationId
    // gets all tasks assigned to an organization

  // Modify task object to include teamId
  var createTask = function(task) {
    return $http({
      method: 'POST',
      url: '/api/tasks',
      data: JSON.stringify(task)
    });
  };

  var updateTask = function(task) {
    return $http({
      method: 'PUT',
      url: '/api/tasks/' + task._id,
      data: JSON.stringify(task)
    });
  };

  var deleteTask = function(task) {
    return $http({
      method: 'DELETE',
      url: '/api/tasks/' + task._id,
      data: JSON.stringify(task)
    });
  };


  return {
    getAll: getAll,
    createTask: createTask,
    updateTask: updateTask,
    deleteTask: deleteTask
  };
})

.factory('Auth', function ($http, $location, $window) {
  var teamName = '';

  // sends user login input to db
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/login',
      data: user
    })
    // if successful, send encoded token back to auth.js
    .then(function (resp) {
      teamName = user.teamname;
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/signup',
      data: user
    })
    // if successful, send encoded token back to auth.js
    .then(function (resp) {
      teamName = user.teamname;
      return resp.data.token;
    });
  };

  // checks if user has a previously stored web token
  // returning false will redirect user to signin page
  var isAuth = function () {
    return !!$window.localStorage.getItem('auth-token');
  };

  // clears web token and redirect to signin
  var signout = function () {
    $window.localStorage.removeItem('auth-token');
    $location.path('/signin');
  };
  var getTeamName = function () {
    return teamName;
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout,
    getTeamName: getTeamName
  };
});
