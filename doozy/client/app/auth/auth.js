angular.module('app.auth', [])

.controller('AuthController', function($scope, $http, $location, Auth) {
  $scope.user = {};

  $scope.signin = function() {
    Auth.signin($scope.user)
      .then(function(token) {
        $window.localStorage.setItem('wat', token);
        $location.path('/tasks');
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  $scope.signup = function() {
    Auth.signup($scope.user)
      .then(function(token) {
        $window.localStorage.setItem('wat', token);
        $location.path('/tasks');
      })
      .catch(function(error) {
        console.error(error);
      });
  };
});
