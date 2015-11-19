angular.module('app.tasks', ['ngMaterial'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('indigo')
    .warnPalette('deep-orange')
    .backgroundPalette('green', {
      default: '50'
    });
})
.controller('TasksController', function($scope, Tasks, Users, Auth) {
	$scope.showAddTaskButton = true;
  $scope.data = {};

  $scope.data.tasks = [];
  $scope.getTasks = function() {
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
    // check for a blank form 
    if (!task) {
      return;
    }

    if (task.assigned === '') {
      task.users = [];
    } else if (!task.users) {
      if (task.assigned) {
        task.users = [task.assigned];
      } else {
        // otherwise its unassigned
        task.users = [];
      }
    }

    var found = false;

    // if the task already exists, update it
    for (var i = 0; i < $scope.data.tasks.length; i++) {
      var currentTask = $scope.data.tasks[i];
      if ( task._id && task._id === currentTask._id ) {
        Tasks.updateTask(task)
          .then(function(resp) {
            $scope.getTasks();
          })
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
        .then(function(resp) {
          $scope.getTasks();
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  };

  $scope.deleteTask = function(task) {
    Tasks.deleteTask(task)
      .then(function() {
        $scope.getTasks();
      })
      .catch(function(err) {
        console.log(err);
      });
  };

	$scope.loadTaskDetails = function(task) {
    // hide the 'Add Task' button
		$scope.showAddTaskButton=false;
    // show the task form
    $scope.showTaskForm = true;
    
    // load the task details into the form
    $scope.task = {};
    $scope.task._id = task._id;
		$scope.task.name = task.name;
		$scope.task.users = task.users.length > 0 ? task.users[0].username : null;  
		$scope.task.description = task.description;
	};

	$scope.resetTaskDetails = function() {
    // reset the task form if it was dirty
    if ( $scope.task ) {
      $scope.task.name = null;
      $scope.task.assigned = null;
      $scope.task.description = null;
      $scope.taskForm.$setUntouched();
    }
    
    // hide the task form
    $scope.showTaskForm = false;
    // show the 'Add Task' button
    $scope.showAddTaskButton = true;
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
