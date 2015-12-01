var express = require('express');
var router = express.Router();

var emailController = require('../controllers/emailController');


// List tasks
// curl -H "Content-Type: application/json" -X POST -d '{"recipients":["alex.zywiak@gmail.com", "nissa.wollum@gmail.com", "mgaffney123@gmail.com", "abdulrahman@talebagha.net"], "subject":"Sage Mailer", "text":"You are part of the successful inauguration of the Sage Mailer!"}' http://localhost:3000/api/email
router.post('/', emailController.sendEmail);

module.exports = router;
