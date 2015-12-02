angular.module('app.tasks', [])

.controller('TasksController', function($scope, Tasks, Users, Auth) {
  $scope.mockdata = {
    teamname: null,
    username: null,
    tasks: [
      {
        name: 'build slideout sidebar',
        description: null,
        project: 'frontEnd',
        organization: 'Sparta',
        assigned_to : ['nissa'],
        isCompleted: false,
        created_at: "12/1/15",
        updated_at: null,
        due_at: '12/10/15',
        status: 'assigned'
      },
      {}
    ]
  };

	// make sure the 'Add Task' button is showing when the page loads
  $scope.showAddTaskButton = true;
  $scope.data = {};
  // retrieve the team name
  $scope.data.teamname = Auth.getTeamName();
  // retrieve all of the tasks from the database
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
  // invoke getTasks so that all of the tasks load when you open the page
	$scope.getTasks();

  // get all of the User objects from the database and save them
  // these users populate the 'Assignee' dropdown menue of the task form
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
  
  // update a task if it already exists or create a new task if one does not already exist
  // this function is called anytime the task form is submitted
  $scope.updateTask = function(task) {
    // check for a blank form 
    var changedUser = false;
    if (!task) {
      return;
    }

    // modify the users property of the task object so that is correctly formatted for the api request
    if (task.assigned) {
      task.users = [task.assigned];
      changedUser = true;
    } else {
      task.users = [];
    }

    var found = false;

    // if the task already exists, update it

// these next two functions are called by the promise inside the loop below. They are named and written outside the loop to please jshint
    // but...did not work under actual use
    // var checkChangedUser = function(resp){
    //   if (changedUser) {
    //     $scope.getTasks();
    //   }
    // };
    // var catchError = function(err){ console.log(err);};


    for (var i = 0; i < $scope.data.tasks.length; i++) {
      var currentTask = $scope.data.tasks[i];
      if ( task._id && task._id === currentTask._id ) {
        Tasks.updateTask(task)
        .then(function(resp) {
          if (changedUser) {
            $scope.getTasks();
          }
        })
        .catch(function(err) {
          console.log(err);
        });



/*  this solution to pass jsHINT did not work in production
        .then(checkChangedUser(resp)
          )
          .catch(
            catchError(err)
          );*/



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

  // delete a task from the database
  $scope.deleteTask = function(task) {
    Tasks.deleteTask(task)
      .then(function() {
        $scope.getTasks();
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  // load task details into the task form
  // this function is called anytime that you click on a individual task
	$scope.loadTaskDetails = function(task) {
    // hide the 'Add Task' button
		$scope.showAddTaskButton=false;
    // show the task form
    $scope.showTaskForm = true;
    
    // load the task details into the form
    $scope.task = {};
    $scope.task._id = task._id;
		$scope.task.name = task.name;
    // only load the first user from the users array
		$scope.task.users = task.users.length > 0 ? task.users[0].username : null;  
		$scope.task.description = task.description;
	};

  // reset the task form
  // this function is called anytime the task form is submitted or closed
	$scope.resetTaskDetails = function() {
    // reset the task form if it was dirty
    if ( $scope.task ) {
      $scope.task.name = null;
      $scope.task.assigned = null;
      $scope.task.description = null;
      // reset the form validation
      $scope.taskForm.$setUntouched();
    }
    
    // hide the task form
    $scope.showTaskForm = false;
    // show the 'Add Task' button
    $scope.showAddTaskButton = true;
	};

  // if a task is not completed and does not have any users, it belongs in the Staging area
  $scope.stagingFilter = function(task) {
    return !task.isCompleted && task.users.length === 0 ? true : false;
  };

  // if a task is not completed but has been assigned to a user, it belongs in the Assigned area
  $scope.assignedFilter = function(task) {
  	return !task.isCompleted && task.users.length > 0 ? true : false;
  };

  // if a task has been completed, it belongs in the Completed area
  $scope.completedFilter = function(task) {
  	return task.isCompleted ? true : false;
  };

  // function for the signout button
  $scope.signout = Auth.signout;
});
