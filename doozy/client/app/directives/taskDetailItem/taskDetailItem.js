angular.module('directives.taskDetailItem', [])

.directive('taskDetailItem', function() {
    return {
      replace: true,
      templateUrl: 'app/directives/taskDetailItem/taskDetailItem.html',
      controller: 'TaskDetailItemCtrl',
      scope: {
        task: '=',
        handleTaskEdit: '='
      }
    }
  })
  .controller('TaskDetailItemCtrl', ['$scope', 'Tasks', function($scope, Tasks) {
    
    // Update a task
    $scope.updateTask = function(task) {
      return Tasks.updateTaskById(task)
        .catch(function(err) {
          console.log(err);
        });
    };
  }])
