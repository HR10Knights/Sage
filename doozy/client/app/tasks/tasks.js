angular.module('app.tasks', ['ngMaterial'])

.controller('TasksController', function($scope, Tasks, Users, Auth) {
	$scope.showAddTaskButton = true;
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

  $scope.getUsers = function() {
    Users.getAll()
    .then(function(users) {
      $scope.data.users = users;
    })
    .catch(function(err) {
      console.log(err);
    });
  };
  $scope.getUsers();
  
  $scope.updateTask = function(task) {
    if (!task.users) {
      if (task.assigned) {
        task.users = [task.assigned];
      } else {
        // otherwise its unassigned
        task.users = [];
      }
    }
    var found = false;

    // update task data
    $scope.getTasks();
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
    Tasks.deleteTask(task)
      .catch(function(err) {
        console.log(err);
      });
  };

  $scope.completeTask = function(task) {
    task.isCompleted = !task.isCompleted;
  };


	$scope.loadTaskDetails = function(task) {
		$scope.task = {};
    $scope.task._id = task._id;
		$scope.task.name = task.name;
		$scope.task.users = task.users.length > 0 ? task.users[0].username : null;  
		$scope.task.description = task.description;
		$scope.buttonText = 'Edit Task';
	};

	$scope.clearTaskFields = function() {
    $scope.task = {};
    $scope.buttonText = 'Add Task';
	};

  $scope.stagingFilter = function(task) {
    return !task.isCompleted && task.users.length === 0 ? true : false;
  };

  $scope.assignedFilter = function(task) {
  	return !task.isCompleted && task.users.length > 0 ? true : false;
  };

  $scope.completedFilter = function(task) {
  	return task.isCompleted ? true : false;
  };

  $scope.signout = Auth.signout;
});
