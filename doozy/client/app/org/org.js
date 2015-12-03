angular.module('app.org', [])

.controller('OrgController', ['$scope', 'Users', function($scope, Users){
	$scope.showAddTaskButton = true;

	Users.getAll()
		.then(function(users){
			console.log(users);
		});

	Users.getLoggedInUser()
		.then(function(user){
			console.log(user);
		});

}]);