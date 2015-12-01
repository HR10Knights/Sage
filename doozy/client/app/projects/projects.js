angular.module('app.projects', ['ngMaterial'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('green', {
      default: '800'
    })
    .warnPalette('deep-orange')
    .backgroundPalette('green', {
      default: '50'
    });
})