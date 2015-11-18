var express = require('express');
var router = express.Router();
var Team = require('../models/team');

/* GET team listing. */
router.get('/', function(req, res, next) {
  Team.find({}, function(err, teams) {
    // res.send(200, teams);
    res.status(200).send(teams);
  });
});

// Checks to see if a team exists
// eg: http://localhost:3000/api/teams/exists?name=my%20team
// returns true or false
router.get('/exists', function(req, res, next) {
  var name = req.query.name;
  Team.find({name: name}, function(err, teams) {
    if (teams.length > 0) {
      res.status(200).send(true);
    } else {
      res.status(200).send(false);
    }
  });
});

// To add a team by curl
// curl -H "Content-Type: application/json" -X POST -d '{"name":"my team"}' http://localhost:3000/api/teams/create
router.post('/create', function(req, res, next) {
  var name = req.body.name;
  Team.findOne({name: name}, function(err, team) {
    if (team) {
      res.status(400).send('Team exists');
    } else {
      var newTeam = new Team({
        name: name,
      });
      newTeam.save(function(err, newTeam) {
        if (err) {
          res.sendStatus(404, err);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
});

module.exports = router;
