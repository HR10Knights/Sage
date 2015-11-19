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
      return res.status(400).send('Username, Password, and Teamname must be present');
    }

    User.findOne({username: username}, function(err, user) {
      if (user) return res.status(400).send('Username exists');
      var newUser = new User({
        username: username,
        password: password
      });

      newUser.save(function(err, newUser) {
        if (err) return res.status(404).send(err);

        Team.findOne({name: teamname}, function(err, team) {
          if (err) return res.status(404).send(err);
          team = team || new Team({name: teamname});

          team.users.push(newUser);
          team.save(function (err) {
            if (err) return res.status(404).send(err);

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
      return res.status(400).send('Username, Password, and Teamname must be present');
    }

    Team.findOne({name: teamname}, function(err, team) {
      if (!team) return res.status(401).send('Team does not exist');

      User.findOne({username: username}, function(err, user) {
        if (!user) return res.status(401).send('Username does not exist');

        user.comparePassword(password, function(match) {
          if (!match) return res.status(401).send('Password does not match');

          sendJWT(user, res);
        });
      });
    });
  }
};
