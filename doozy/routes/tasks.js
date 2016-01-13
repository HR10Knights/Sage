var express = require('express');
var router = express.Router();

var taskController = require('../controllers/taskController');

// View task
router.get('/:id', taskController.getTaskById);

// Update task
router.put('/', taskController.updateTaskById);

// View all assigned users
router.get('/users/:taskId', taskController.getUserByTaskId);

// Add a task to a project
router.post('/create', taskController.createTaskByProject);

//Check to see if task is assigned
router.post('/assign', taskController.isTaskAssigned);

// Remove a task
router.delete('/:id', taskController.removeTask);

module.exports = router;
