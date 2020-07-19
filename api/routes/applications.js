const express = require('express');
const router = express.Router();
const applicationsController = require('../controllers/applicationsController');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, applicationsController.get_all_applications);
router.get('/:applicationId', checkAuth, applicationsController.get_application);
router.get('/session/:sessionId', checkAuth, applicationsController.get_by_session_id);
router.get('/user/:userId', checkAuth, applicationsController.get_by_user_id);
router.post('/', applicationsController.log_application);
router.delete('/:applicationId', checkAuth, applicationsController.delete_application);
router.delete('/user/:userId', checkAuth, applicationsController.delete_applications_by_user_id);

module.exports = router;