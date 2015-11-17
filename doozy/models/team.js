var db = require('../config');
var mongoose = require('mongoose');

var Team = mongoose.model('Team', db.teamsSchema);


module.exports = Team;
