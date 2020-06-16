const express = require('express');
const router = express.Router();
const applicationsController = require('../controllers/applicationsController');

router.get('/', applicationsController.get_all_applications)
router.post('/', applicationsController.log_application)
router.get('/:applicationId', applicationsController.get_application)
router.delete('/:applicationId', applicationsController.delete_application)

module.exports = router;