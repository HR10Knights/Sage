var express = require('express');
var router = express.Router();

var projectController = require('../controllers/projectController');


router.get('/', projectController.allProjects);

// To add a project by curl // NOTE: Untested
// curl -H "Content-Type: application/json" -X POST -d '{"name":"my task", "description":"blahblah"}' http://localhost:3000/api/projects/create
router.post('/create', projectController.createProject);


module.exports = router;
