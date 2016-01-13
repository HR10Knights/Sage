angular.module('directives.userManager', [])
  .directive('userManager', function() {
    return {
      replace: true,
      templateUrl: 'app/directives/userManager/userManager.html',
      controller: 'UserManagerCtrl',
      controllerAs: 'ctrl',
      scope: {
        handleSubmit: '=',
        handleRemove: '=',
        userList: '=',
        currentUsers: '='
      }
    };
  })
  .controller('UserManagerCtrl', ['$scope', function($scope) {
  	$scope.data = {};
  }]);
