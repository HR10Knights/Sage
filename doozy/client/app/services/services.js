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
  	var task1 = {title: 'make UI', completed: false};
  	var task2 = {title: 'make login page', completed: true};
  	var task3 = {title: 'send auth token to server', completed: false};
  	var task4 = {title: 'authorization for signup', completed: true};
  	var task5 = {title: 'angular routes', completed: false};
  	var task6 = {title: 'this is an assigned task', completed: false, assignee: 'Luke'};
  	var task7 = {title: 'this is an assigned and completed task', completed: true, assignee: 'Luke'};
  
    return [task1, task2, task3, task4, task5, task6, task7];
  }

  var postTask = function() {
    
  }

  return {
    getAll: getAll,
    postTask: postTask
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
