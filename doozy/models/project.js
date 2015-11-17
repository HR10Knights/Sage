var db = require('../config');
var mongoose = require('mongoose');

var Project = mongoose.model('Project', db.projectsSchema);


module.exports = Project;
