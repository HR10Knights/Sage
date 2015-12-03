angular.module('app', [
  'directives.organizationCard',
  'directives.projectCard',
  'app.services',
  'services.users',
  'app.tasks',
  'app.auth',
  'ui-route',
  'app.org',
  'ngRoute',
  'ngAnimate',
  'ngMaterial',
  'ngFx'
])
.config(function($stateProvider, $httpProvider, $mdThemingProvider, $locationProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('green', {
      default: '800'
    })
    .warnPalette('deep-orange')
    .backgroundPalette('green', {
      default: '50'
    });

  $stateProvider
    .state('signin', {
      url: "/" ,
      controller: 'AuthController',
      templateUrl: '/app/auth/signin.html'
    })
    .state('signup', {
      url: "/signup" ,
      controller: 'AuthController',
      templateUrl: '/app/auth/signup.html'
    })
    .state('user', {
      url: '/user',
      controller: 'TasksController',
      templateUrl: 'app/tasks/tasks.html',
      authenticate: true,
    })
    .state('/landing', {
      templateUrl: 'app/tasks/landing.html',
      controller: 'TasksController',
      authenticate: true
    })
    .state('/org', {
      templateUrl: '/app/org/org.html',
      controller: 'OrgController',
      authenticate: true,
    });
  //   .when('/signin', {
  //     templateUrl: '/app/auth/signin.html',
  //     controller: 'AuthController'
  //   })
  //
  //   .when('/signup', {
  //     templateUrl: '/app/auth/signup.html',
  //     controller: 'AuthController'
  //   })
  //   .when('/tasks', {
  //     templateUrl: '/app/tasks/tasks.html',
  //     controller: 'TasksController',
  //     authenticate: true,
  //   })
  //   .otherwise({
  //     redirectTo: '/tasks'
  //   });

  $httpProvider.interceptors.push('AttachTokens');
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
})
.factory('AttachTokens', function ($window) {
  // adds web token to headers
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('auth-token');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams){
      if(toState && toState.data.requireLogin && !Auth.isAuth()) {
        $location.path('/');
      }
  });
// .run(function ($rootScope, $location, Auth) {
//   // checks if user is logged in with any route change
//   $rootScope.$on('$routeChangeStart', function (evt, next, current) {
//     if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
//       $location.path('/signin');
//     }
//   });
});
