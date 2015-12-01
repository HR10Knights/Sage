angular.module('services.UserFactory', [])
  .factory('Users', function($http) {
    /**
     * Return all users currently assigned to a task
     * @param  {[int]} taskId   [id of the given task]
     * @return {[array]}        [array of user objects]
     */
    var getUsersByTaskId = function(taskId){
      return $http({
          method: 'GET',
          url: '/api/users/task/' + taskId
        })
        .then(function(resp) {
          return resp.data;
        });
    };

    /**
     * Return all users currently assigned to a project
     * @param  {[int]} projectId   [id of the given project]
     * @return {[array]}        [array of user objects]
     */
    var getUsersByProjectId = function(projectId){
      return $http({
          method: 'GET',
          url: '/api/users/project/' + projectId
        })
        .then(function(resp) {
          return resp.data;
        });
    };

    /**
     * Return all users currently assigned to a organization
     * @param  {[int]} organizationId   [id of the given organization]
     * @return {[array]}        [array of user objects]
     */
    var getUsersByOrganizationId = function(organizationId){
      return $http({
          method: 'GET',
          url: '/api/users/organization/' + organizationId
        })
        .then(function(resp) {
          return resp.data;
        });
    };

    /**
     * Returns all users
     * @return {[array]} [array of user objects]
     */
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
