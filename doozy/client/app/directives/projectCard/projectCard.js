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
  .controller('ProjectCardController', ['$scope', 'Project', function($scope, Project) {
    
    $scope.data = {
      projectUsers: []
    };

    var initialize = function(){
      $scope.updateUserList();
    };

    $scope.updateUserList = function() {
      Project.getUserByProjectId($scope.project._id)
        .then(function(users) {
          $scope.data.projectUsers = users;
        });
    };

    initialize();
  }]);
