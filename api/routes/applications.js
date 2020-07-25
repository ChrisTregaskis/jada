const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const getAllApplicationsController = require('../controllers/applications/getAllApplicationsController');
const getApplicationsBySessionIdController =
    require('../controllers/applications/getApplicationsBySessionIdController');
const getApplicationsByUserIdController = require('../controllers/applications/getApplicationsByUserIdController');
const postApplicationToDBController = require('../controllers/applications/postApplicationToDBController');
const getApplicationController = require('../controllers/applications/getApplicationController');
const deleteApplicationController = require('../controllers/applications/deleteApplicationController');
const deleteApplicationsByUserIdController =
    require('../controllers/applications/deleteApplicationsByUserIdController');

router.get('/', checkAuth, getAllApplicationsController.get_all_applications);
router.get('/:applicationId', checkAuth, getApplicationController.get_application);
router.get('/session/:sessionId', checkAuth, getApplicationsBySessionIdController.get_by_session_id);
router.get('/user/:userId', checkAuth, getApplicationsByUserIdController.get_by_user_id);
router.post('/', postApplicationToDBController.log_application);
router.delete('/:applicationId', checkAuth, deleteApplicationController.delete_application);
router.delete('/user/:userId', checkAuth, deleteApplicationsByUserIdController.delete_applications_by_user_id);

module.exports = router;