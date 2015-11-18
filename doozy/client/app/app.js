angular.module('app', [
  'app.services',
  'app.tasks',
  'app.auth',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/signin', {
      templateUrl: 'auth/signin.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'auth/signup.html',
      controller: 'AuthController'
    })
    .when('/tasks', {
      templateUrl: 'tasks/tasks.html',
      controller: 'TasksController',
      authenticate: true,
    })
    .otherwise({
      redirectTo: '/tasks'
    });

  $httpProvider.interceptors.push('AuthInterceptor');
});
