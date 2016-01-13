angular.module('directives.taskDashboardItem', [])

.directive('taskDashboardItem', function() {
    return {
      replace: true,
      templateUrl: 'app/directives/taskDashboardItem/taskDashboardItem.html',
      controller: 'TaskDashboardItemCtrl',
      scope: {
      	task: '=',
        handleChange: '='
      }
    }
  })
  .controller('TaskDashboardItemCtrl', ['$scope', function($scope) {
    // delete a task from the database
    $scope.updateTask = function(task) {
      return Tasks.updateTaskById(task)
        .then(function(){
          if($scope.handleChange){
            $scope.handleChange();
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    };
  }])
