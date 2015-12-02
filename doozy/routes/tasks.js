var express = require('express');
var router = express.Router();

var taskController = require('../controllers/taskController');

// View task
router.get('/:id', taskController.getTaskById);

// Update task
router.put('/', taskController.updateTaskById);

// View all user tasks
router.get('/users/:taskId', taskController.getUserByTaskId);

// List all tasks by project
router.get('/project/:projectId', taskController.getTasksByProject);

// Add a task to a project
router.post('/create', taskController.createTaskByProject);

// Remove a task
router.delete('/:id', taskController.removeTask);

module.exports = router;
