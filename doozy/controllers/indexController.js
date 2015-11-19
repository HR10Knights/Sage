var jwt = require('jwt-simple');
var Team = require('../models/team');
var User = require('../models/user');


var sendJWT = function (user, res) {
  var token = jwt.encode(user, 'secret');
  res.json({token: token});
};


module.exports = {
  createUser: function(req, res, next) {
    var username = req.body.username.trim();
    var password = req.body.password.trim();
    var teamname = req.body.teamname.trim();
    if (username === '' || teamname === '' || password === '') {
      res.status(400).send('Username, Password, and Teamname must be present');
      return;
    }

    User.findOne({username: username}, function(err, user) {
      if (user) { res.status(400).send('Username exists'); return; }
      var newUser = new User({
        username: username,
        password: password
      });

      newUser.save(function(err, newUser) {
        if (err) { res.status(404).send(err); return; }

        Team.findOne({name: teamname}, function(err, team) {
          if (err) { res.status(404).send(err); return; }
          team = team || new Team({name: teamname});

          team.users.push(newUser);
          team.save(function (err) {
            if (err) { res.status(404).send(err); return; }

            res.status(201);
            sendJWT(newUser, res);
          });
        });
      });
    });
  },

  getIndex: function(req, res, next) {
    res.render('index', { title: 'Express' });
  },

  loginUser: function(req, res, next) {
    var username = req.body.username.trim();
    var password = req.body.password.trim();
    var teamname = req.body.teamname.trim();
    if (username === '' || teamname === '' || password === '') {
      res.status(400).send('Username, Password, and Teamname must be present');
      return;
    }

    Team.findOne({name: teamname}, function(err, team) {
      if (!team) {
        res.status(401).send('Team does not exist');
        return;
      }

      User.findOne({username: username}, function(err, user) {
        if (!user) {
          res.status(401).send('Username does not exist');
          return;
        }
        user.comparePassword(password, function(match) {
          if (!match) {
            res.status(401).send('Password does not match');
            return;
          }
          sendJWT(user, res);
        });
      });
    });
  }
};
