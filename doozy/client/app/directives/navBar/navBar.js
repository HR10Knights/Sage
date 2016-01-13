var NavBarCtrl = function(Auth) {

  var navLinks = [{
    'name': 'Organization',
    'state': 'org'
  },
  {
    'name': 'Dashboard',
    'state': 'landing'
  }]

  angular.extend(this, Auth, {
  	navLinks: navLinks
  });
};

angular.module('directives.navBar', [])

.directive('navBar', function() {
    return {
      replace: true,
      templateUrl: 'app/directives/navBar/navBar.html',
      controller: 'NavBarCtrl',
      controllerAs: 'ctrl'
    }
  })
  .controller('NavBarCtrl', ['Auth', NavBarCtrl]);
