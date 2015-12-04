angular.module('services.OrganizationFactory', [])

  .factory('Organization', function ($http) {

    var allOrganizations = function (){
      return $http({
        method: 'GET',
        url: 'api/orgs/'
      }).then(function (resp) {
        return resp.data;
      });
    };

    var getOrganizationById = function (orgId){
      return $http({
        method: 'GET',
        url: 'api/orgs/' + orgId
      }).then(function (resp){
        return resp.data;
      });
    };

    var getUserByOrganizationId = function(orgId){
      return $http({
        method: 'GET',
        url: 'api/orgs/users/' + orgId
      }).then(function (resp){
        return resp.data;
      });
    };

    var createOrganization = function (newOrg){
      return $http({
        method: 'POST',
        url: '/api/orgs/',
        data: JSON.stringify(newOrg)
      }).then(function (resp){
        return resp.data;
      });
    };

    var updateOrganization = function (newData){
      return $http({
        method: 'PUT',
        url: 'api/orgs',
        data: newData
      }).then(function (resp){
        return resp.data;
      });
    };

    var removeOrganization = function (orgId){
      return $http({
        method: 'DELETE',
<<<<<<< 4988598b3462f31f217149c36b67d7a251440752
        url: 'api/orgs/' + orgId
=======
        url: 'api/orgs' + orgId
>>>>>>> (fix) attempting to fix tasks page
      }).then(function (resp) {
        return resp.data;
      });
    };

    return {
      allOrganizations: allOrganizations,
      getOrganizationById: getOrganizationById,
      getUserByOrganizationId: getUserByOrganizationId,
      createOrganization: createOrganization,
      updateOrganization: updateOrganization,
      removeOrganization: removeOrganization
    };
  });
