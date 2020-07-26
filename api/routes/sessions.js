const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const getAllSessionsController = require('../controllers/sessions/getAllSessionsController');
const getSessionController = require('../controllers/sessions/getSessionController');
const postSessionToDBController = require('../controllers/sessions/postSessionToDBController');
const totalJobsLogInController = require('../controllers/sessions/totalJobsLogIn/totalJobsLogInController');

router.get('/', checkAuth, getAllSessionsController.get_all_sessions);
router.post('/', postSessionToDBController.log_session);
router.get('/:sessionId', checkAuth, getSessionController.get_session);

// session logic
router.post('/totalJobsLogIn', totalJobsLogInController.totalJobs_logIn);

module.exports = router;