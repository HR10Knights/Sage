angular.module('directives.projectDashboard', [])

.directive('projectDashboard', function() {
    return {
      replace: true,
      templateUrl: 'app/directives/projectDashboard/projectDashboard.html',
      controller: 'ProjectDashboardCtrl',
      scope: {
      	projectList: '='
      }
    };
  })
  .controller('ProjectDashboardCtrl', ['$scope', function($scope) {
    
    $scope.$watch('projectList', (list) => {
      $scope.projectList = list;
    });

    $scope.isPending = function(task){
      return !task.isCompleted;
    };
  }]);
