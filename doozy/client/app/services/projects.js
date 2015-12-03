angular.module('services.ProjectFactory', [])

  .factory('Project', function($http) {
    /**
     * Return all users currently assigned to a task
     * @param  {[int]} taskId   [id of the given task]
     * @return {[array]}        [array of user objects]
     */
    var createProjectByOrgID = function(data){
      return $http({
        method: 'POST',
        url: 'api/projects/create',
        data: JSON.stringify(data)
      }).then(function(resp) {
        return resp.data;
      });
    };

    var getProjectById = function(projectId) {
      return $http({
        method: 'GET',
        url: 'api/projects/' + projectID
      }).then(function (resp){
        return resp.data;
      });
    };

    var getUserByProjectId = function (projectId) {
      return $http({
        method: 'GET',
        url: 'api/projects/users/' + projectId
      }).then(function (resp){
        return resp.data;
      });
    };

    var removeProject = function (projectId) {
      return $http({
        method: 'DELETE',
        url: 'api/projects/' + projectId
      }).then(function (resp){
        return resp.data;
      });
    };

    var updateProject = function(projectId, newData){
      return $http({
        method: 'PUT',
        url: 'api/projects',
        data: newData
      }).then(function (resp){
        return resp.data;
      });
    };

    var allProjects = function(){
      return $http({
        method: 'GET',
        url: 'api/projects'
      }).then(function (resp){
        return resp.data;
      });
    };

    return {
      createProjectByOrgID: createProjectByOrgID,
      getProjectById: getProjectById,
      getUserByProjectId: getUserByProjectId,
      removeProject: removeProject,
      updateProject: updateProject,
      allProjects: allProjects
    };
  });


