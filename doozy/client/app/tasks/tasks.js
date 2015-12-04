angular.module('app.tasks', [])


.controller('TasksController', function($scope, $location, Tasks, Users, Project, Auth) {

	// make sure the 'Add Task' button is showing when the page loads
  $scope.showAddTaskButton = true;
  $scope.data = {};

  $scope.data.teamname = Auth.getTeamName();
  // this gets populated by the updateTask sheet
  $scope.data.tasks = [];
  $scope.task = {};

  // this is a shortcut to the current users tasks
  $scope.tasks = [];

  // this is a shortcut to the current users projects 
  $scope.projects = [];

// these are references for data models in the db
  // $scope.data.taskMODEL = [
  //   // {
  //   //   name, 
  //   //   description,
  //   //   isCompleted,
  //   //   deadline,
  //   //   created_at,
  //   //   project_id
  //   // }
  // ];
  // $scope.data.userMODEL = {
  //   // username, 
  //   // password,
  //   // organization, 
  //   // project_list [obj],
  //   // task_list [obj]
  // };
  // $scope.data.projectsMODEL = [
  //   // {
  //   //   name, 
  //   //   description, 
  //   //   teamLead,
  //   //   org_id,
  //   //   tasks [id],
  //   //   deadline
  //   // }
  // ];
  // $scope.data.organizationMODEL = [
  //   // {
  //   //   title, 
  //   //   projects [id]
  //   // }
  // ];

// populates scope with a user object 
  $scope.getLoggedInUser = function(){
    Users.getLoggedInUser()
      .then(function(userobj){
        $scope.data.user = userobj;
        $scope.tasks = userobj.task_list;
        $scope.projects = userobj.project_list;
      })
      .catch(function(err){
        console.log(err);
      });
  };

  // invoke getLoggedInUser so that all of the users tasks load when you open the page
	$scope.getLoggedInUser();
  // retrieve the team name and tasks
  $scope.data.projectName = "";
  $scope.data.tasks = [];

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
  
// not using this at this point
  $scope.getUserByTaskId = function(taskId){
    // this will return none, one or more user objects
    // if it returns none task is unassigned
  };

  // update a task if it already exists or create a new task if one does not already exist
  // this function is called anytime the task form is submitted
  $scope.createTask = function(task) {
    // check for a blank form
    task.projectId = '5660b839bbf82e540bab3488'; 
    //task.assignee
    var changedUser = false;
    var found = false;
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
    for (var i = 0; i < $scope.data.tasks.length; i++) {
      var currentTask = $scope.data.tasks[i];
      if ( task._id && task._id === currentTask._id ) {
        found = true;
        //var currentUser = User
        Tasks.updateTaskById(task._id)
        .then(function(resp) {
          // if (changedUser) {
          //   $scope.getTasks();
          // }
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

    if (!found){
      var assigned = task.assigned;
      console.log("what is this" , assigned);
      Tasks.createTaskByProject(task)
        .then(function(resp) {
          if (assigned){
            Users.addTaskToUser({userId: assigned, taskId: resp._id})
              .then(function(resp){
              })
          }
          
          $scope.getProjectInfo();
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  };

  // delete a task from the database

  $scope.deleteTask = function(task) {
    console.log("in deleteTask", task)
    Tasks.removeTask(task)
      .then(function() {
        $scope.getProjectInfo();
      })
      .catch(function(err) {
        console.log(err);
      });
  }

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
  //&& !Tasks.isTaskAssigned({id: task._id});
  $scope.stagingFilter = function(task) {
    return !task.isCompleted
  };

  // if a task is not completed but has been assigned to a user, it belongs in the Assigned area
  $scope.assignedFilter = function(task) {
  	//return !task.isCompleted
  };

  // if a task has been completed, it belongs in the Completed area
  $scope.completedFilter = function(task) {
  	return task.isCompleted ? true : false;
  };

  // function for the go to Dashboard button
  $scope.goToDash =  function(){
    $location.path('/org');
  };
  // function for the signout button
  $scope.signout = Auth.signout;
});


/*  this solution to pass jsHINT did not work in production
        .then(checkChangedUser(resp)
          )
          .catch(
            catchError(err)
          );*/



     //    found = true;

     //    break;
     // }
// these next two functions are called by the promise inside the loop below. They are named and written outside the loop to please jshint
    // but...did not work under actual use
    // var checkChangedUser = function(resp){
    //   if (changedUser) {
    //     $scope.getTasks();
    //   }
    // };
    // var catchError = function(err){ console.log(err);};


    // for (var i = 0; i < $scope.data.tasks.length; i++) {
    //   var currentTask = $scope.data.tasks[i];
    //   if ( task._id && task._id === currentTask._id ) {
    //     Tasks.updateTask(task)
    //     .then(function(resp) {
    //       if (changedUser) {
    //         $scope.getTasks();
    //       }
    //     })
    //     .catch(function(err) {
    //       console.log(err);
    //     });
