angular.module('services.TaskFactory', [])

.factory('Tasks', ['$http', function($http) {

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
          data: JSON.stringify(data)
        })
        .then(function(resp) {
          return resp.data;
        });
    },

    isTaskAssigned: function(data) {
      return $http({
        method: 'POST',
        url: '/api/tasks/assign',
        data: JSON.stringify(data)
      })
      .then(function(resp){
        return resp.data
      });
    },

    /**
     * Get all users assigned to a task
     * @param  {[string]} taskId [task._id]
     * @return {[array]}         [array of user objects]
     */
    getUserByTaskId: function(taskId) {
      console.log("in factory", taskId);
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
          data: JSON.stringify(data)
        })
        .then(function(resp) {
          return resp.data;
        });
    },

    /**
     * Deletes a task by id
     * @param  {[object]} task [description]
     * @return {[object]}        [removed task]
     */
    removeTask: function(task) {
      return $http({
          method: 'DELETE',
          url: '/api/tasks/' + task._id
        })
        .then(function(resp) {
          return resp.data;
        });
    }
  };
}]);
