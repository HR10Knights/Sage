var express = require('express');
var router = express.Router();

var projectController = require('../controllers/projectController');

// Gets all projects
router.get('/', projectController.allProjects);

// Gets all projects for an organization
// curl http://localhost:3000/api/projects/org/<orgId>
router.get('/:orgId', projectController.getProjectsByOrg);

// To add a project to an organization
// curl -H "Content-Type: application/json" -X POST -d '{"orgId":"<>", "project":{"name":"project1", "description":"project1"}}' http://localhost:3000/api/projects/create
router.post('/create', projectController.createProjectByOrg);


module.exports = router;
