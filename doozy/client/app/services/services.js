angular.module('app.services', [])

.factory('Tasks', function($http) {
  
  // var getAll = function() {
  //   return $http({
  //     method: 'GET',
  //     url: '/api/tasks'
  //   })
  //   .then(function (resp) {
  //     return resp.data;
  //   });
  // };

  var getAll = function() {
  	return sampleTasks;
  }

  var postTask = function() {
    
  }

  return {
    getAll: getAll,
    postTask: postTask
  };
})
.factory('Auth', function ($http, $location, $window) {
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/login',
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
    return !!$window.localStorage.getItem('auth-token');
  };

  var signout = function () {
    $window.localStorage.removeItem('auth-token');
    $location.path('/signin');
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});

var luke = {username: 'luke'};
var andrew = {username: 'andrew'};
var zach = {username: 'zach'};
var jeff = {username: 'jeff'};
var eugene = {username: 'eugene'};

var task1 = {
	title: 'make UI',
	assignees: [luke],
	description: null, 
  completed: false
};

var task2 = {
	title: 'send auth token to server',
	assignees: [],
	description: null, 
  completed: false
};

var task3 = {
	title: 'make login page',
	assignees: [],
	description: null, 
  completed: true
};

var task4 = {
	title: 'backend routes for signup',
	assignees: [],
	description: null, 
  completed: false
};

var task5 = {
	title: 'angular routes',
	assignees: [luke, jeff],
	description: null, 
  completed: false
};

var task6 = {
	title: 'automated deployment',
	assignees: [eugene],
	description: null, 
  completed: true
};

var sampleTasks = [task1, task2, task3, task4, task5, task6];



