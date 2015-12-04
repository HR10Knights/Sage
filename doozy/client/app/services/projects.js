angular.module('services.ProjectFactory', [])

  .factory('Project', function($http) {
    /**
     * Return all users currently assigned to a task
     * @param  {[int]} taskId   [id of the given task]
     * @return {[array]}        [array of user objects]
     */

    var currentProjectId = 0;

    var createProjectByOrgID = function(data){
      return $http({
        method: 'POST',
        url: 'api/projects/create',
        data: JSON.stringify(data)
      }).then(function(resp) {
        return resp.data;
      });
    };

    var setCurrentProject = function(projectId) {
      console.log("setting project", projectId);
      currentProjectId = projectId;
    };

    var getCurrentProject = function(){
      return currentProjectId;
    }

    var getProjectById = function(projectId) {
      return $http({
        method: 'GET',
        url: 'api/projects/' + projectId
      }).then(function (resp){
        return resp.data;
      });
    };

    var getUserByProjectId = function (projectId) {
      console.log("getting triggered");
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
      getCurrentProject: getCurrentProject,
      setCurrentProject: setCurrentProject,
      currentProjectId: currentProjectId,
      createProjectByOrgID: createProjectByOrgID,
      getProjectById: getProjectById,
      getUserByProjectId: getUserByProjectId,
      removeProject: removeProject,
      updateProject: updateProject,
      allProjects: allProjects
    };
  });


