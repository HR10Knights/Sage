angular.module('directives.taskManager', [])

.directive('taskManager', function() {
    return {
      replace: true,
      templateUrl: 'app/directives/taskManager/taskManager.html',
      controller: 'TaskManagerCtrl',
      scope: {
        handleSubmit: '=',
        handleRemove: '=',
        task: '=',
        projectUsers: '='
      }
    }
  })
  .controller('TaskManagerCtrl', ['$scope', 'Users', function($scope, Users) {
  	
  	$scope.task = $scope.task || {};

  	$scope.$watch('task', function(newTask){
  		$scope.task = newTask;
  	});

    $scope.removeUser = function(userId){
      var idx = $scope.task.users.indexOf(userId);
      $scope.task.users.splice(idx, 1);
      Users.removeTaskToUser({
        taskId: $scope.task._id,
        userId: userId
      });
    };

  }]);
