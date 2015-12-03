angular.module('app.org', [])

.controller('OrgController', ['$scope', 'Users', 'Organization', 'Tasks', 'Project', function($scope, Users, Organization, Project, Tasks){
	$scope.showAddTaskButton = true;

	angular.extend($scope, Users, Organization);

	$scope.user;
	$scope.data = {};

	$scope.getLoggedInUser()
		.then(function(user){
			$scope.user = user;
		});

	$scope.populateData = function(user){
		$scope.data.orgs = user.organizations;
	};

}]);