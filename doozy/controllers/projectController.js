var Project = require('../models/project');


module.exports = {
  allProjects: function (req, res, next) {
    Project.find({ }, function (err, projects) {
      if (err) return res.status(500).send(err);

      res.status(200).send(projects);
    });
  },

  createProject: function(req, res, next) {
    var description = req.body.description.trim();
    var name = req.body.name.trim();

    Project.findOne({name: name}, function(err, project) { // FIXME?
      if (err) return res.status(500).send(err);
      if (project) return res.status(400).send('Project already exists');

      var newProject = new Project({
        description: description,
        name: name
      });

      newProject.save(function(err, newProject) {
        if (err) return res.status(400).send(err);

        res.sendStatus(201);
      });
    });
  }
};
