angular.module('app.auth', ['ui.router'])

.controller('AuthController', function ($scope, $window, $location, $state, Auth) {
  // binding for user login input
  $scope.user = {
    username: '',
    password: '',
    teamname: ''
  };

  $scope.signin = function () {
    // passes user input to the Auth service for db verification
    Auth.signin($scope.user)
      .then(function (token) {
        // stores valid jwt on client
        $window.localStorage.setItem('auth-token', token);
        $location.path('/landing');
        $state.go('user');
      })
      .catch(function (error) {
        alert(error.data);
        console.error(error);
      });
  };

  $scope.signup = function () {
    // passes user input to the Auth service for db verification
    Auth.signup($scope.user)
      .then(function (token) {
        // stores valid jwt on client
        $window.localStorage.setItem('auth-token', token);
        $location.path('/landing');
        $state.go('user');

      })
      .catch(function (error) {
        alert(error.data);
        console.error(error);
      });  

  };
});
