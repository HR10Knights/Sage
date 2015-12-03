angular.module('app.tasks', [])

.controller('TasksController', function($scope, $location, Tasks, Users, Auth) {

	// make sure the 'Add Task' button is showing when the page loads
  $scope.showAddTaskButton = true;
  $scope.data = {};
  // retrieve the team name
  $scope.data.teamname = Auth.getTeamName();
  // this gets populated by the updateTask sheet
  $scope.task = {};

  // this is a shortcut to the current users tasks
  $scope.tasks = [];

// these are references for data models in the db
  $scope.data.tasks = [
    // {
    //   name, 
    //   description,
    //   isCompleted,
    //   deadline,
    //   created_at,
    //   project_id
    // }
  ];
  $scope.data.user = {
    // username, 
    // password,
    // organization, 
    // project_list [],
    // task_list []
  };
  $scope.data.projects = [
    // {
    //   name, 
    //   description, 
    //   teamLead,
    //   org_id,
    //   tasks [],
    //   deadline
    // }
  ];
  $scope.data.organization = [
    // {
    //   title, 
    //   projects []
    // }
  ];

// populates with a user object 
  $scope.getLoggedInUser = function(){
    Users.getLoggedInUser()
      .then(function(userobj){
        $scope.data.user = userobj;
      })
      .catch(function(err){
        console.log(err);
      })
  };

  // get tasks specific to user
  $scope.getTasks = function() {
    return  $scope.tasks = $scope.data.user.tasks;
  };

  $scope.getUserByTaskId = function(taskId){
    // this will return none, one or more user objects
    // if it returns none task is unassigned
  };

  $scope.getProjectById = function(projID){
    // this function will have to be called as we loop through a users assigned projects to populate the dropdown 
    Project.getProjectById(projID)
      .then(function(proj){
        $scope.projectsByName.push(proj.name)
      })
      .catch(function(err) {
        console.log(err);
      });
  };


  // invoke getTasks so that all of the tasks load when you open the page
	$scope.getLoggedInUser();
  $scope.getTasks();

  // get all of the User objects from the database and save them
  // these users populate the 'Assignee' dropdown menue of the task form
  $scope.getAll = function() {
    Users.getAll()
    .then(function(users) {
      $scope.data.users = users;
    })
    .catch(function(err) {
      console.log(err);
    });
  };
  $scope.getAll();
  
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
  //  old version
  // $scope.deleteTask = function(task) {
  //   Tasks.deleteTask(task)
  //     .then(function() {
  //       $scope.getTasks();
  //     })
  //     .catch(function(err) {
  //       console.log(err);
  //     });
  // };

  // new version
    $scope.removeTask = function(taskId) {
    Task.removeTask(taskId)
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

  // function for the go to Dashboard button
  $scope.goToDash = Auth.goToDash;
  // function for the signout button
  $scope.signout = Auth.signout;
});
