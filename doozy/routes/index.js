var express = require('express');
var router = express.Router();
var Team = require('../models/team');
var User = require('../models/user');
var jwt = require('jwt-simple');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// User sign up
// curl -H "Content-Type: application/json" -X POST -d '{"username":"testuser", "password":"testpass", "teamname":"my team"}' http://localhost:3000/api/signup
router.post('/signup', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var teamname = req.body.teamname;
  if (username === '' || teamname === '' || password === '') {
    res.status(400).send('Invalid sign up');
  } else {
    Team.findOne({name: teamname}, function(err, team) {
      if (team) {
        User.findOne({username: username}, function(err, user) {
          if (!user) {
            var newUser = new User({
              username: username,
              password: password
            });
            newUser.save(function(err, newUser) {
              if (err) {
                res.send(404, err);
              } else {
                team.users.push(newUser);
                team.save(function(err) {
                  if (err) {
                    res.send(404, err);
                  } else {
                    var token = jwt.encode(newUser, 'secret');
                    res.json({token: token});
                  }
                });
              }
            });
          } else {
            res.status(400).send('Username exists');
          }
        });
      } else {
        res.status(400).send('Team does not exist');
      }
    });
  } 
});

// User log in
// Returns 401 for not authorized and 'Password does not match' 'Username does not exist' and 'Team does not exist'
// Returns 200 and true for authorized
// curl -H "Content-Type: application/json" -X POST -d '{"username":"testuser", "password":"testpass", "teamname":"my team"}' http://localhost:3000/api/login
router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var teamname = req.body.teamname;

  Team.findOne({name: teamname}, function(err, team) {
    if (team) {
      User.findOne({username: username}, function(err, user) {
        if (user) {
          user.comparePassword(password, function(match) {
            if (match) {
              var token = jwt.encode(user, 'secret');
              res.json({token: token});
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
