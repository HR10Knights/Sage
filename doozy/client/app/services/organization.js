angular.module('services.organization', [])

.factory('Organization', ['$http', function($http) {

  return {
    createOrganization: function(org) {
      return $http({
        method: 'POST',
        url: 'api/org',
        data: {
          org: org
        }
      }).then(function(resp) {
        return resp.data;
      });
    }
  };
}]);
