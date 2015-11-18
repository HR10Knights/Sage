var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Team = require('../models/team');
var util = require('../util');
// curl -H "Content-Type: application/json" -X POST -d '{"username":"testuser", "password":"testpass", "teamname":"my team"}' http://localhost:3000/api/users/destroy
router.post('/destroy', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var teamname = req.body.teamname;

  Team.findOne({name: teamname}, function(err, team) {
    if (team) {
      User.findOne({username: username}, function(err, user) {
        if (user) {
          user.comparePassword(password, function(match) {
            if (match) {
              user.remove();
              res.status(200).send('Deleted');
            } else {
              res.status(401).send('Password does not match');
            }
          });
        } else {
          res.status(401).send('Username does not exist');
        }
      });
    } else {
      res.status(401).send('Team does not exist');
    }
  });
});

module.exports = router;
