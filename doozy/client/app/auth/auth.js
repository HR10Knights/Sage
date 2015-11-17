angular.module('app.auth', [])

.controller('AuthController', function($scope, $http) {
  $scope.user = {};

  $scope.signin = function(user) {
    return $http({
      method: 'POST',
      url: '/api/login',
      data: user
    })
    .then(function(response) {
      return response.data;
    });
  };

  $scope.signup = function(user) {
    return $http({
      method: 'POST',
      url: '/api/signup',
      data: user
    }).then(function(response) {
      return response.data;
    });
  };

});
