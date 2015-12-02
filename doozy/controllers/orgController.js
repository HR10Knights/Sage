var Org = require('../models/org');

module.exports = {
  /**
   * Returns all organizations in db
   * @return {[array]}        [all organizations]
   */
  allOrganizations: function(req, res, next) {
    Org.find({}, function(err, orgs) {
      if (err) return res.status(500).send(err);
      res.status(200).send(orgs);
    });
  },

  /**
   * Creates a new organization
   * @param  {[object]}   req  [{title: ...}]
   */
  createOrganization: function(req, res, next) {
    Org.findOne({
      title: req.body.title
    }, function(err, org) {
      if (err) return res.status(500).send(err);
      if (org) return res.status(400).send('Organziation already exists');

      var newOrg = new Org({title: req.body.title});

      newOrg.save(function(err, newOrg) {
        if (err) return res.status(400).send(err);
        res.sendStatus(201);
      });
    });
  },

  removeOrganization: function(req, res, next) {
    // TODO
  }
};
