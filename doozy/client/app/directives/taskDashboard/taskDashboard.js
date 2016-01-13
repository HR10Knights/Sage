angular.module('directives.taskDashboard', [])

.directive('taskDashboard', function() {
    return {
      replace: true,
      templateUrl: 'app/directives/taskDashboard/taskDashboard.html',
      controller: 'TaskDashboardCtrl',
      scope: {
        taskList: '=',
        handleChange: '='
      }
    };
  })
  .controller('TaskDashboardCtrl', ['$scope', 'Tasks', function($scope, Tasks) {

    $scope.$watch('taskList', function(newList) {
      $scope.taskList = newList;
    });

    // if a task is not completed but has been assigned to a user, it belongs in the Assigned area
    $scope.assignedFilter = function(task) {
      return !task.isCompleted;
    };

    // if a task has been completed, it belongs in the Completed area
    $scope.completedFilter = function(task) {
      return !!task.isCompleted;
    };
  }]);
