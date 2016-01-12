angular.module('directives.taskDetail', [])

.directive('taskDetail', function() {
    return {
      replace: true,
      templateUrl: 'app/directives/taskDetail/taskDetail.html',
      controller: 'TaskDetailCtrl',
      scope: {
        handleTaskUpdate: '=',
        handleTaskEdit: '=',
        handleTaskRemove: '=',
        taskList: '='
      }
    }
  })
  .controller('TaskDetailCtrl', ['$scope', function($scope) {

    $scope.$watch('taskList', function(newList) {
      $scope.taskList = newList;
    });

    // if a task is not completed and does not have any users, it belongs in the Staging area
    //&& !Tasks.isTaskAssigned({id: task._id});
    $scope.stagingFilter = function(task) {
      return !task.isCompleted && task.users.length === 0;
    };

    // if a task is not completed but has been assigned to a user, it belongs in the Assigned area
    $scope.assignedFilter = function(task) {
      return !task.isCompleted && task.users.length > 0;
    };

    // if a task has been completed, it belongs in the Completed area
    $scope.completedFilter = function(task) {
      return task.isCompleted ? true : false;
    };

  }]);
