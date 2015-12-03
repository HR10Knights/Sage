var db = require('../config');
var mongoose = require('mongoose');

db.projectsSchema.pre('init', function(next, data) {
  Project.populate(data, {
    path: 'tasks'
  }, function(err, project) {
    data = project;
    next();
  });
});

var Project = mongoose.model('Project', db.projectsSchema);

module.exports = Project;
