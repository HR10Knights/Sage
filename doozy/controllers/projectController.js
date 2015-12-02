var Project = require('../models/project');
var Org = require('../models/org');

module.exports = {
  /**
   * Gets all projects present on DB
   * @return {[array]}        [projects array]
   */
  allProjects: function(req, res, next) {
    Project.find({}, function(err, projects) {
      if (err) {
        return res.status(500).send();
      }
      res.status(200).send(projects);
    });
  },

  /**
   * [Gets all projects associated with an organization]
   * req.params.orgId === organization id
   * @return {[array]}        [projects array]
   */
  getProjectsByOrg: function(req, res, next) {
    Org.findById(req.params.orgId)
      .populate('projects')
      .exec(function(err, org) {
        if (err) {
          return res.status(500).send();
        }
        res.status(200).send(org.projects);
      });
  },

  /**
   * [Creates a new project for an organization]
   * req.body = {orgId: organizationId, project: {title:..., description: ...}}
   * @return {[object]}        [organization object]
   */
  createProjectByOrg: function(req, res, next) {
    var project = new Project(req.body.project);
    Org.findById(req.body.orgId, function(err, org) {
      if (err) {
        return res.status(500).send(err);
      }
      if (org) {
        org.projects.push(project._id);
        org.save(function(err) {
          if (err) {
            return res.status(500).send(err);
          }
          project.save(function(err) {
            if (err) {
              return res.status(500).send(err);
            }
            res.status(201).send(org);
          });
        });
      } else {
        res.status(404).send();
      }
    });
  }
};
