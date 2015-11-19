var express = require('express');
var router = express.Router();

var teamController = require('../controllers/teamController');


/* GET team listing. */
router.get('/', teamController.allTeams);

// Checks to see if a team exists
// eg: http://localhost:3000/api/teams/exists?name=my%20team
// returns true or false
router.get('/exists', teamController.exists);

// To add a team by curl
// curl -H "Content-Type: application/json" -X POST -d '{"name":"my team"}' http://localhost:3000/api/teams/create
router.post('/create', teamController.createTeam);


module.exports = router;
