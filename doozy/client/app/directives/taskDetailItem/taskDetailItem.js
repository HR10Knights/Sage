angular.module('directives.taskDetailItem', [])

.directive('taskDetailItem', function() {
    return {
      replace: true,
      templateUrl: 'app/directives/taskDetailItem/taskDetailItem.html',
      controller: 'TaskDetailItemCtrl',
      scope: {
      	task: '='
      }
    }
  })
  .controller('TaskDetailItemCtrl', [function() {

  }])
