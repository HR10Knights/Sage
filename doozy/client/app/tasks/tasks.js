angular.module('app.tasks', ['ngMaterial'])

.controller('TasksController', function($scope, Tasks) {
	
  $scope.data = {};
  $scope.data.tasks = [];
  $scope.getTasks = function() {
		// $scope.data.tasks = Tasks.getAll();
      Tasks.getAll()
		  .then(function(tasks) {
		  	$scope.data.tasks = tasks;
		  })
	    .catch(function(err) {
        console.log(err);
	    });
	};
	$scope.getTasks();


  $scope.updateTask = function(task) {
    var found = false;

    // if the task already exists, update it
    for (var i = 0; i < $scope.data.tasks.length; i++) {
      var currentTask = $scope.data.tasks[i];
      if ( task._id && task._id === currentTask._id ) {
        Tasks.updateTask(task)
          .catch(function(err) {
            console.log(err);
          });

        found = true;
        break;
     }
    }

    // if the task does not already exists, create a new task
    if ( !found ) {
      Tasks.createTask(task)
        .catch(function(err) {
          console.log(err);
        });
    }

    $scope.getTasks();
  };

  $scope.deleteTask = function(task) {

  };

  $scope.completeTask = function(task) {

  };


	$scope.loadTaskDetails = function(task) {
		$scope.task = {};
		$scope.task.name = task.name;
		$scope.task.users = task.users.length > 0 ? task.users[0].username : null;  
		$scope.task.description = task.description;
		$scope.buttonText = 'Edit Task';
	};

	$scope.clearTaskFields = function() {
    $scope.task = {};
    $scope.buttonText = 'Add Task';
	}

  $scope.stagingFilter = function(task) {
    return !task.isCompleted && task.users.length === 0 ? true : false;
  };

  $scope.assignedFilter = function(task) {
  	return !task.isCompleted && task.users.length > 0 ? true : false;
  };

  $scope.completedFilter = function(task) {
  	return task.isCompleted ? true : false;
  }

});
