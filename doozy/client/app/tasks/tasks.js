angular.module('app.tasks', [])

.controller('TasksController', function($scope, Tasks) {
	$scope.data = {};
	$scope.getTasks = function() {
		$scope.data.tasks = Tasks.getAll();

		  // .then(function(tasks) {
		  // 	$scope.data.tasks = tasks;
		  // })
	   //  .catch(function(err) {
    //     console.error(err);
	   //  });
	};
	$scope.getTasks();


	$scope.postTask = function(task) {
    if ( task !== null && task !== undefined ) {
      // TODO: need to call Tasks.postTask(task) in this function

      var found = false;
      // edit the task if it already exists
      for (var i = 0; i < $scope.data.tasks.length; i++) {
      	var currentTask = $scope.data.tasks[i];
      	if ( task.title === currentTask.title ) {
      		currentTask.assignee = task.assignee;
      		currentTask.description = task.description;
      		found = true;
      		break;
      	}
      }

      // create new task if one does not already exist
      if ( !found ) {	
    	  $scope.data.tasks.push(task);
      }
    }
	};

	$scope.loadTaskDetails = function(task) {
		$scope.task = {};
		$scope.task.title = task.title;
		$scope.task.assignee = task.assignee;
		$scope.task.description = task.description;
		$scope.buttonText = 'Edit Task';
	};

	$scope.clearTaskFields = function() {
    $scope.task = {};
    $scope.buttonText = 'Add Task';
	}
});