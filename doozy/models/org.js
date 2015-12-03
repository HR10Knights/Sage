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

var Org = mongoose.model('Org', db.orgSchema);


module.exports = Org;
