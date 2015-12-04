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
  .controller('OrganizationCardController', ['$scope', 'Project', 'Organization', 'Users', function($scope, Project, Organization, Users) {
    $scope.showProjectForm = false;
    $scope.showProjectButton = true;
    $scope.showUserForm = false;
    $scope.showUserButton = true;
    $scope.project = {};
    $scope.data = {};

    Users.getAll()
      .then(function(users) {
        $scope.data.users = users;
      });

    $scope.getOrganizationUsers = function(){
      Organization.getUserByOrganizationId($scope.org._id)
        .then(function(users) {
          $scope.data.orgUsers = users;
        });
    };

    $scope.getOrganizationUsers();

    $scope.refreshOrganizationCard = function() {
      Organization.getOrganizationById($scope.org._id)
        .then(function(org) {
          $scope.org = org;
        });
    };

    $scope.addUser = function(userId){
      Users.addOrganizationToUser({
        userId: userId,
        orgId: $scope.org._id
      })
      .then(function(){
        $scope.getOrganizationUsers();
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

    $scope.resetUserDetails = function() {
      // reset the task form if it was dirty
      if ($scope.newUser) {
        $scope.data.user = null;
        // reset the form validation
        $scope.userForm.$setUntouched();
      }

      // hide the task form
      $scope.showUserForm = false;
      // show the 'Add Task' button
      $scope.showUserButton = true;
    };



  }]);
