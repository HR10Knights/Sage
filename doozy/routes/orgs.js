var express = require('express');
var router = express.Router();

var orgController = require('../controllers/orgController');

// get all organizations
router.get('/', orgController.allOrganizations);

// get an organization by id
router.get('/:id', orgController.getOrganizationById);

// Get all users for an organization
router.get('/users/:id', orgController.getUserByOrganizationId);

// To add an organization
router.post('/', orgController.createOrganization);

// Update Organization
router.put('/', orgController.updateOrganization);

// Delete TODO
router.delete('/:orgId', orgController.removeOrganization);


module.exports = router;
