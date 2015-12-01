angular.module('services.UserFactory', [])
  .factory('Users', function($http) {
    // getUserByTaskId
    // get all users assigned to a task
    var getUsersByTaskId = function(taskId){
      return $http({
          method: 'GET',
          url: '/api/users/task/' + taskId
        })
        .then(function(resp) {
          return resp.data;
        });
    };
    // getUserByProjectId
    // get all users assigned to a project
    var getUsersByProjectId = function(projectId){
      return $http({
          method: 'GET',
          url: '/api/users/project/' + projectId
        })
        .then(function(resp) {
          return resp.data;
        });
    };
    // getUserByOrganizationId
    // get all users from an organization
    var getUsersByOrganizationId = function(organizationId){
      return $http({
          method: 'GET',
          url: '/api/users/organization/' + organizationId
        })
        .then(function(resp) {
          return resp.data;
        });
    };

    var getAll = function() {
      return $http({
          method: 'GET',
          url: '/api/users'
        })
        .then(function(resp) {
          return resp.data;
        });
    };
    return {
      getAll: getAll
    };
  })
