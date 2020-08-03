const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const getAllSessionsController = require('../controllers/sessions/getAllSessionsController');
const getSessionController = require('../controllers/sessions/getSessionController');
const postSessionToDBController = require('../controllers/sessions/postSessionToDBController');
const totalJobsLogInController = require('../controllers/sessions/totalJobsLogIn/totalJobsLogInController');
const runJobSearchController = require('../controllers/sessions/runJobSearch/runJobSearchController');

router.get('/', checkAuth, getAllSessionsController.get_all_sessions);
router.post('/', postSessionToDBController.log_session);
router.get('/:sessionId', checkAuth, getSessionController.get_session);

// SYSTEM RUNTIME LOGIC
router.post('/totalJobsLogIn', checkAuth, totalJobsLogInController.totalJobs_logIn);
router.post('/runJobSearch', runJobSearchController.enter_search);

module.exports = router;