angular.module('app.auth', [])

.controller('AuthController', function($scope, $http, TokenFactory) {
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
      TokenFactory.setToken(response.data.token);
      return response;
    });
  };
})

.factory('TokenFactory', function($window) {
  var storage = $window.localStorage;
  var key = 'auth-token';

  var getToken = function() {
    return storage.getItem(key);
  };

  var setToken = function(token) {
    if (token) {
      storage.setItem(key, token);
    } else {
      store.removeItem(key);
    }
  };

  return {
    getToken: getToken,
    setToken: setToken
  }
})
.factory('AuthInterceptor', function(TokenFactory) {
  var addToken = function(config) {
    var token = TokenFactory.getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  }

  return {
    request: addToken
  }
})