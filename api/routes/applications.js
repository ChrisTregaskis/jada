const express = require('express');
const router = express.Router();
const applicationsController = require('../controllers/applicationsController');

router.post('/', applicationsController.log_application)

module.exports = router;