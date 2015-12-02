var express = require('express');
var router = express.Router();

var orgController = require('../controllers/orgController');

// curl http://localhost:3000/api/orgs/
router.get('/', orgController.allOrganizations);

// To add a project by curl // NOTE: Untested
// curl -H "Content-Type: application/json" -X POST -d '{"title":"Organization 1"}' http://localhost:3000/api/orgs/create
router.post('/create', orgController.createOrganization);

router.delete('/:orgId', orgController.removeOrganization);


module.exports = router;
