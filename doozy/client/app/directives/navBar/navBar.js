var NavBarCtrl = function(Auth) {

  var navLinks = [{
    'name': 'Organization',
    'state': 'org'
  },
  {
    'name': 'Tasks',
    'state': 'tasks'
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
    }
  })
  .controller('NavBarCtrl', ['Auth', NavBarCtrl]);
