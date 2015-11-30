angular.module('app.services', [])

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
.factory('Users', function ($http) {
  var getAll = function () {
    return $http({
      method: 'GET',
      url: '/api/users'
    })
    .then(function (resp) {
      return resp.data;
    });
  };
  return {
    getAll: getAll
  };
})

.factory('Auth', function ($http, $location, $window) {
  var teamName = '';

  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/login',
      data: user
    })
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
    .then(function (resp) {
      teamName = user.teamname;
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('auth-token');
  };

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
