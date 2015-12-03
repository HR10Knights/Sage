var db = require('../config');
var mongoose = require('mongoose');
var User = require('./user');
var Project = require('./project');

db.orgSchema.pre('init', function(next, data) {
  Org.populate(data, {
    path: 'projects'
  }, function(err, org) {
    data = org;
    next();
  });
});

db.orgSchema.pre('remove', function(next, done) {
  User.update({}, {
      $pull: {
        organization: this._id
      }
    })
    .then(function() {

      Project.find({
        org_id: this._id
      }, function(err, project) {
        if (err) {
          console.log(err);
        }
        for (var i = 0; i < project.length; i++) {
          if (project[i]) {
            project[i].remove();
          }
        }
      });

    });
});

var Org = mongoose.model('Org', db.orgSchema);


module.exports = Org;
