var db = require('../config');
var mongoose = require('mongoose');

var Org = mongoose.model('Org', db.orgSchema);


module.exports = Org;
