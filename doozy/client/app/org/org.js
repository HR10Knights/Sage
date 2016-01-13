angular.module('app.org', [])

.controller('OrgController', ['$scope', 'Users', 'Organization', 'Tasks', 'Project', function($scope, Users, Organization, Project, Tasks) {
  $scope.showAddOrgButton = true;
  $scope.showOrgForm = false;

  $scope.user;
  $scope.data = {};
  $scope.newOrg = {};

  $scope.resetOrgDetails = function() {
    // reset the task form if it was dirty
    if ($scope.newOrg) {
      $scope.newOrg.title = null;
      // reset the form validation
      //$scope.orgForm.$setUntouched();
    }

    // hide the task form
    $scope.showOrgForm = false;
    // show the 'Add Task' button
    $scope.showAddOrgButton = true;
  };

  $scope.getUserData = function() {
    Users.getLoggedInUser()
      .then(function(user) {
        $scope.user = user;
      });
  };

  // Watches for changes in the current user and updates scope
  $scope.$watch('user', function() {
    if ($scope.user) {
      $scope.populateUserData();
    }
  });

  $scope.populateUserData = function() {
    $scope.data.organization = $scope.user.organization;
  };

  $scope.newOrganization = function(data) {
    Organization.createOrganization(data)
      .then(function(org) {
        $scope.newOrg = {};
        return Users.addOrganizationToUser({
          orgId: org._id,
          userId: $scope.user._id
        })
      })
      .then(function() {
        $scope.resetOrgDetails();
        $scope.getUserData();
      });
  };

  // Initialize User
  $scope.getUserData();

}]);

