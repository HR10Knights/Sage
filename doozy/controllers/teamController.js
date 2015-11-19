var Team = require('../models/team');


module.exports = {
  allTeams: function(req, res, next) {
    Team.find({}, function(err, teams) {
      res.status(200).send(teams);
    });
  },

  createTeam: function(req, res, next) {
    var name = req.body.name.trim();

    Team.findOne({name: name}, function(err, team) {
      if (team) return res.status(400).send('Team exists');

      var newTeam = new Team({
        name: name,
      });

      newTeam.save(function(err, newTeam) {
        if (err) return res.sendStatus(404, err);

        res.sendStatus(201);
      });
    });
  },

  exists: function(req, res, next) {
    var name = req.query.name.trim();

    Team.findOne({name: name}, function(err, foundTeam) {
      res.status(200).send(!!foundTeam);
    });
  }
};
