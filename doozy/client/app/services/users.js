angular.module('services.UserFactory', [])
  .factory('Users', function($http) {

    return {
      /**
       * Returns all users
       * @return {[array]} [array of user objects]
       */
      getAll: function() {
        return $http({
            method: 'GET',
            url: '/api/users'
          })
          .then(function(resp) {
            return resp.data;
          });
      },

      /**
       * Returns a user by id with all assigned
       * organizations, tasks, and projects
       * @param  {[string]} id [user's Id]
       * @return {[object]}    [userObject]
       */
      getUserById: function(id) {
        return $http({
            method: 'GET',
            url: '/api/users/' + id
          })
          .then(function(resp) {
            return resp.data;
          });
      },

      /**
       * Pass in updated user data
       * Must contain _id field
       * Can update username/email
       * @param  {[object]} data [data to update to user]
       * @return {[object]}      [updated user object]
       */
      updateUser: function(data) {
        return $http({
            method: 'PUT',
            url: '/api/users',
            data: data
          })
          .then(function(resp) {
            return resp.data;
          });
      },

      /**
       * Add a task to a user
       * Must include taskId and userId in data
       * {taskId:<task._id>, userId:<user._id>}
       * @param {[object]} data [taskId and userId]
       */
      addTaskToUser: function(data) {
        return $http({
            method: 'POST',
            url: '/api/users/tasks',
            data: data
          })
          .then(function(resp) {
            return resp.data;
          });
      },

      /**
       * Add a project to a user
       * Must include projectId and userId in data
       * {projectId:<project._id>, userId:<user._id>}
       * @param {[object]} data [projectId and userId]
       */
      addProjectToUser: function(data) {
        return $http({
            method: 'POST',
            url: '/api/users/projects',
            data: data
          })
          .then(function(resp) {
            return resp.data;
          });
      },

      /**
       * Add an organization to a user
       * Must include organizationId and userId in data
       * {organizationId:<organization._id>, userId:<user._id>}
       * @param {[object]} data [organizationId and userId]
       */
      addOrganizationToUser: function(data) {
        return $http({
            method: 'POST',
            url: '/api/users/orgs',
            data: data
          })
          .then(function(resp) {
            return resp.data;
          });
      },

      /**
       * remove a task from a user
       * Must include taskId and userId in data
       * {taskId:<task._id>, userId:<user._id>}
       * @param {[object]} data [taskId and userId]
       */
      removeTaskToUser: function(data) {
        return $http({
            method: 'POST',
            url: '/api/users/tasks/remove',
            data: data
          })
          .then(function(resp) {
            return resp.data;
          });
      },

      /**
       * remove a project from a user
       * Must include projectId and userId in data
       * {projectId:<project._id>, userId:<user._id>}
       * @param {[object]} data [projectId and userId]
       */
      removeProjectToUser: function(data) {
        return $http({
            method: 'POST',
            url: '/api/users/projects/remove',
            data: data
          })
          .then(function(resp) {
            return resp.data;
          });
      },

      /**
       * remove an organization from a user
       * Must include organizationId and userId in data
       * {organizationId:<organization._id>, userId:<user._id>}
       * @param {[object]} data [organizationId and userId]
       */
      removeOrganizationToUser: function(data) {
        return $http({
            method: 'POST',
            url: '/api/users/orgs/remove',
            data: data
          })
          .then(function(resp) {
            return resp.data;
          });
      },

      /**
       * Delete a user
       * Must have correct username and password
       * @param  {[object]} data [username, password]
       * @return {[object]}      [deleted user]
       */
      removeUser: function(data) {
        return $http({
            method: 'POST',
            url: '/api/users/remove',
            data: data
          })
          .then(function(resp) {
            return resp.data;
          });
      }
    };
  });
