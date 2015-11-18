var express = require('express');
var router = express.Router();
var Project = require('../models/project');

router.get('/', function (req, res, next) {
  Project.find({ }, function (err, projects) {
    if (err) {
      res.sendStatus(500, err);
    }

    res.status(200).send(projects);
  });
});

// To add a project by curl // NOTE: Untested
// curl -H "Content-Type: application/json" -X POST -d '{"name":"my task", "description":"blahblah"}' http://localhost:3000/api/projects/create
router.post('/create', function(req, res, next) {
  var description = req.body.description;
  var name = req.body.name;
  Project.findOne({name: name}, function(err, project) { // FIXME
    if (err) {
      res.sendStatus(500, err);
    }

    if (project) {
      res.status(400).send('Project already exists');
    } else {
      var newProject = new Project({
        description: description,
        name: name
      });
      newProject.save(function(err, newProject) {
        if (err) {
          res.sendStatus(400, err);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
});

module.exports = router;
