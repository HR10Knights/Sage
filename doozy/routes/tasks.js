var express = require('express');
var router = express.Router();

var taskController = require('../controllers/taskController');


// List all tasks by project
router.get('/:projectId', taskController.allTasks);

// Add a task to a project
router.post('/create', taskController.createTaskByProject);





// List tasks
// router.get('/', taskController.allTasks);

// // Create task
// // curl -H "Content-Type: application/json" -X POST -d '{"name":"my task 2","description":"my description"}' http://localhost:3000/api/tasks
// router.post('/', taskController.createTask);

// // View task
// router.get('/:id', taskController.idToTask);

// // Update task
// router.put('/:id', taskController.updateTask);

// // Delete task
// router.delete('/:id', taskController.deleteTask);

// // Assign task to user
// // curl -H "Content-Type: application/json" -X POST -d '{"user":"564cd72524d8b619223cd11b","task":"564d0970c7de37cd2bdb3ec2"}' http://localhost:3000/api/tasks/assign
// router.post('/assign', taskController.assignTask);


module.exports = router;
