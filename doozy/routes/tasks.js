var express = require('express');
var router = express.Router();

// List tasks
router.get('/', function(req, res, next) {
  res.status(200).send('task list');
});

// View task
router.get('/:id', function(req, res, next) {
  var taskId = req.params.id;
  res.status(200).send('task id: ' + taskId);
});

// Create task
// curl -H "Content-Type: application/json" -X POST -d '{"name":"my task"}' http://localhost:3000/api/tasks
router.post('/', function(req, res, next) {
  res.status(200).send('create task');
});

module.exports = router;