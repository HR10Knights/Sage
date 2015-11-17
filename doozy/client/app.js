angular.module('app', [
  'app.services',
  'app.tasks',
  'app.auth',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/signin', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    .when('/tasks', {
      templateUrl: 'app/tasks/tasks.html',
      controller: 'TasksController',
      authenticate: true,
    })
    .otherwise({
      redirectTo: '/tasks'
    });

    $httpProvider.interceptors.push('AttachTokens');
});



