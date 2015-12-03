angular.module('services.TaskFactory')

.factory('Task', ['$http', function($http) {

  return {

    /**
     * Returns a single task by id
     * @param  {[string]} taskId [task._id]
     * @return {[object]}        [task]
     */
    getTaskById: function(taskId) {
      return $http({
          method: 'GET',
          url: '/api/tasks/' + taskId
        })
        .then(function(resp) {
          return resp.data;
        });
    },

    /**
     * Update a task
     * @param  {[object]} data [{_id:<REQUIRED>, name, description, isCompleted}]
     * @return {[object]}      [updated task]
     */
    updateTaskById: function(data) {
      return $http({
          method: 'PUT',
          url: '/api/tasks/',
          data: data
        })
        .then(function(resp) {
          return resp.data;
        });
    },

    /**
     * Get all users assigned to a task
     * @param  {[string]} taskId [task._id]
     * @return {[array]}         [array of user objects]
     */
    getUserByTaskId: function(taskId) {
      return $http({
          method: 'GET',
          url: '/api/tasks/users/' + taskId
        })
        .then(function(resp) {
          return resp.data;
        });
    },

    /**
     * Create a new task for a project
     * Must include parent project id and task name
     * @param  {[object]} data [{projectId:<REQUIRED>, name:<REQUIRED>, description}]
     * @return {[object]}      [updated project]
     */
    createTaskByProject: function(data) {
      return $http({
          method: 'POST',
          url: '/api/tasks/create',
          data: data
        })
        .then(function(resp) {
          return resp.data;
        });
    },

    /**
     * Deletes a task by id
     * @param  {[string]} taskId [description]
     * @return {[object]}        [removed task]
     */
    removeTask: function(taskId) {
      return $http({
          method: 'DELETE',
          url: '/api/tasks/' + taskId
        })
        .then(function(resp) {
          return resp.data;
        });
    }
  };
}]);
