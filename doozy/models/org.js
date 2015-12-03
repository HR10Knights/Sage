var db = require('../config');
var mongoose = require('mongoose');

db.orgSchema.pre('init', function(next, data) {
  Org.populate(data, {
    path: 'projects'
  }, function(err, org) {
    data = org;
    next();
  });
});

db.orgSchema.pre('remove', function(next, done) {
  User.update({}, {$pull: {organization: this._id}}, function (err, user){
    if (err) {
      console.log(err);
    }
  });

  Project.find({org_id: this._id}, function (err, project){
    if (err) {
      console.log(err);
    }
    for (var i = 0; i < project.length; i++) {
      if (project[i]){
        removeProject(project[i]);
      }
    }
  });
});
  
var Org = mongoose.model('Org', db.orgSchema);


module.exports = Org;
