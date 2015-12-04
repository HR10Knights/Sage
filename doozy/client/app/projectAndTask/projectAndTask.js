angular.module('app.projectAndTask', [])

.controller('ProjectAndTaskController', function($scope, Tasks, Users, Project, Auth) {

  // make sure the 'Add Task' button is showing when the page loads
  $scope.showAddTaskButton = true;
  $scope.data = {};
  // retrieve the team name and tasks
  $scope.getProjectId = Project.getCurrentProject();
  //$scope.data.projectName = $scope.currentUser.name;
  $scope.data.tasks = [];

 
  $scope.getProjectInfo = function (){
    Project.getProjectById($scope.getProjectId)
    .then(function (project){
     $scope.data.projectName = project.name;
      $scope.data.tasks = project.tasks;
    })
  };

  $scope.getProjectInfo();
  // get all of the User objects from the database and save them
  // these users populate the 'Assignee' dropdown menue of the task form
  $scope.getProjectUsers = function() {
    Project.getUserByProjectId($scope.getProjectId)
    .then(function(users) {
      $scope.data.users = users;
    })
    .catch(function(err) {
      console.log(err);
    });
  };
  $scope.getProjectUsers();
  
  // update a task if it already exists or create a new task if one does not already exist
  // this function is called anytime the task form is submitted
  $scope.createTask = function(task) {
    // check for a blank form
    var found = false;
    task.isAssigned = false;
    task.projectId = $scope.getProjectId;
    task.username = task.assigned;
    if (task.username) {
        task.isAssigned = true;
      }  else {
        task.isAssigned = false;
      }
    //task.assignee
    var changedUser = false;

    // modify the users property of the task object so that is correctly formatted for the api request
    for (var i = 0; i < $scope.data.tasks.length; i++) {
      var currentTask = $scope.data.tasks[i];
      if ( task._id && task._id === currentTask._id ) {
        found = true;
        console.log("in update", task)
        Tasks.updateTaskById(task)
        .then(function(resp) {
          $scope.getProjectInfo();
        })
        .catch(function(err) {
          console.log(err);
        });
     }
    }

    if (!found){
      Tasks.createTaskByProject(task)
        .then(function(resp) {
          if (task.username){
            Users.addTaskToUser({userId: task.username, taskId: resp._id})
              .then(function(resp){
                $scope.getProjectInfo();
              })
              .catch(function(err) {
              console.log(err);
              });
          }
          
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  };

  // delete a task from the database
  $scope.updatetask = function (task) {
    Tasks.updateTaskById(task).then( function (resp){
      $scope.getProjectInfo()
    })
      .catch(function(err) {
        console.log(err);
    });
  }
  $scope.deleteTask = function(task) {
    Tasks.removeTask(task._id)
      .then (function() {
        $scope.getProjectInfo();
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  // load task details into the task form
  // this function is called anytime that you click on a individual task
  $scope.loadTaskDetails = function(task) {
    console.log("in loading", task);
    // hide the 'Add Task' button
    $scope.showAddTaskButton=false;
    // show the task form
    $scope.showTaskForm = true;

    // load the task details into the form
    $scope.task = {};
    $scope.task._id = task._id;
    $scope.task.name = task.name;
    // only load the first user from the users array
    $scope.task.users = task.users;
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
    return !task.isCompleted && task.isAssigned === false;
  };

  // if a task is not completed but has been assigned to a user, it belongs in the Assigned area
  $scope.assignedFilter = function(task) {
    return !task.isCompleted && task.isAssigned === true;
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
