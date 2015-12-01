angular.module('services.email', [])

.factory('Email', ['$http', function($http) {

  /**
   * Send Email
   */

  var sendEmail = function(recipients, content) {
    return $http({
        method: 'POST',
        data: JSON.stringify({
        	recipients: recipients,
        	subject: content.subject || 'Message From Sage',
        	text: content.text,
        	html: content.html
        }),
        url: '/api/email'
      })
      .then(function(resp) {
        return resp.data;
      });
  };

  return {
    sendEmail: sendEmail
  };
}]);
