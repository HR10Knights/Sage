process.env.NODE_ENV = "test";
var mongoose = require('mongoose');
var con = mongoose.createConnection('mongodb://localhost/doozytest');

con.db.dropDatabase(function(err, result) {
  con.close(done);
});

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['sage.js'],
  getPageTimeout: 20000,
  multiCapabilities: [{
    'browserName': 'firefox'
  }, {
    'browserName': 'chrome'
  }]
};
