angular.module('app.services', [])

.factory('Tasks', function($http) {

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
      url: '/api/tasks' + task.id,
      data: JSON.stringify(task)
    });
  };

  var deleteTask = function(task) {

  };

  return {
    getAll: getAll,
    createTask: createTask,
    updateTask: updateTask,
    deleteTask: deleteTask
  };
})
.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'auth-token'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/signin',
      data: user
    })
    .then(function (resp) {
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
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.shortly');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.shortly');
    $location.path('/signin');
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});



