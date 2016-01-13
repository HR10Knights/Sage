angular.module('app.landingCtrl', [])

.controller('LandingCtrl', ['$scope', 'Users', function($scope, Users){

	$scope.user = {};

	var formatUser = function(user){
		user.task_list = user.task_list.map(function(task){
			var formattedTask = task;

			formattedTask.project = user.project_list.filter(function(project){
				return task.project_id === project._id;
			})[0];

			formattedTask.organization = user.organization.filter(function(organization){
				return formattedTask.project.org_id === organization._id;
			})[0];

			return formattedTask;
		});
		return user;
	};

	$scope.initialize = function(){
		Users.getLoggedInUser()
			.then(function(user){
				$scope.user = formatUser(user);
				console.log($scope.user);
			});
	};

	$scope.initialize();
}]);
