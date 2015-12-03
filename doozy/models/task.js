var db = require('../config');
var mongoose = require('mongoose');

// db.tasksSchema.pre('init', function(next, data) {
//   Task.populate(data, {
//     path: 'project_id'
//   }, function(err, task) {
//     data = task;
//     next();
//   });
// });

var Task = mongoose.model('Task', db.tasksSchema);


module.exports = Task;
