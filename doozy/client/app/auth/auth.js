angular.module('app.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {
    username: '',
    password: '',
    teamname: ''
  };

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('auth-token', token);
        $location.path('/tasks');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('auth-token', token);
        $location.path('/tasks');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});
