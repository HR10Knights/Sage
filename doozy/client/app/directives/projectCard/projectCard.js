angular.module('directives.projectCard', [])

.directive('projectCard', function(Users, Project, Organization) {
    return {
      replace: true,
      templateUrl: 'app/directives/projectCard/projectCard.html',
      controller: 'ProjectCardController',
      scope: {
        project: '=',
        org: '='
      }
    };
  })
  .controller('ProjectCardController', ['$scope', 'Users', 'Project', 'Organization', function($scope, Users, Project, Organization) {
    $scope.data = {
      projectUsers: []
    };

    $scope.updateUserList = function() {
      Project.getUserByProjectId($scope.project._id)
        .then(function(users) {
          $scope.data.projectUsers = users;
        });
    };

    Organization.getUserByOrganizationId($scope.org._id)
      .then(function(users) {
        $scope.data.orgUsers = users;
      });

    $scope.addUser = function(userId) {
      if ($scope.data.newUser) {
        Users.addProjectToUser({
          userId: userId,
          projectId: $scope.project._id
        }).then(function() {
          $scope.updateUserList();
        });
      }
    };

    $scope.updateUserList();

  }]);
