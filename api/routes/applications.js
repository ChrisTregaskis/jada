const express = require('express');
const router = express.Router();
const applicationsController = require('../controllers/applicationsController');

router.get('/', applicationsController.get_all_applications);
router.get('/:applicationId', applicationsController.get_application);
router.get('/session/:sessionId', applicationsController.get_by_session_id);
router.get('/user/:userId', applicationsController.get_by_user_id);
router.post('/', applicationsController.log_application);
router.delete('/:applicationId', applicationsController.delete_application);
router.delete('/user/:userId', applicationsController.delete_applications_by_user_id);
router.delete('/', applicationsController.delete_applications);

module.exports = router;