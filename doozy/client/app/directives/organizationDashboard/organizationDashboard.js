angular.module('directives.organizationDashboard', [])

.directive('organizationDashboard', function() {
    return {
      replace: true,
      templateUrl: 'app/directives/organizationDashboard/organizationDashboard.html',
      controller: 'OrganizationDashboardCtrl',
      scope: {
      	orgList: '='
      }
    }
  })
  .controller('OrganizationDashboardCtrl', ['$scope', function($scope) {
  	
  	
  }]);
