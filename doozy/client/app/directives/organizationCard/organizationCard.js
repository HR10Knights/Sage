angular.module('directives.organizationCard', [])

.directive('organizationCard', function(Project, Organization) {
    return {
      replace: true,
      templateUrl: 'app/directives/organizationCard/organizationCard.html',
      controller: 'OrganizationCardController',
      scope: {
        org: '=',
      }
    }
  })
  .controller('OrganizationCardController', ['$scope', 'Project', 'Organization', function($scope, Project, Organization) {
    $scope.showProjectForm = false;
    $scope.showProjectButton = true;
    $scope.project = {};
    $scope.data = {};
    
    Organization.getUserByOrganizationId($scope.org._id)
    	.then(function(users){
    		$scope.data.users = users;
    	});

    $scope.refreshOrganizationCard = function(){
    	Organization.getOrganizationById($scope.org._id)
    		.then(function(org){
    			$scope.org = org;
    		});
    };

    $scope.newProject = function(data) {
    	data.orgId = $scope.org._id;
      Project.createProjectByOrgID(data)
        .then(function() {
          $scope.refreshOrganizationCard();
        });
    };

    $scope.resetProjectDetails = function() {
      // reset the task form if it was dirty
      if ($scope.project) {
        $scope.project.name = null;
        $scope.project.users = null;
        // reset the form validation
        $scope.projectForm.$setUntouched();
      }

      // hide the task form
      $scope.showProjectForm = false;
      // show the 'Add Task' button
      $scope.showProjectButton = true;
    };



  }]);
