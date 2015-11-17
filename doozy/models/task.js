var db = require('../config');
var mongoose = require('mongoose');

var Task = mongoose.model('Task', db.tasksSchema);


module.exports = Task;
