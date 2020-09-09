const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const getAllSessionsController = require('../controllers/sessions/getAllSessionsController');
const getSessionController = require('../controllers/sessions/getSessionController');
const postSessionToDBController = require('../controllers/sessions/postSessionToDBController');
const totalJobsLogInController = require('../controllers/sessions/totalJobsLogIn/totalJobsLogInController');
const runJobSearchController = require('../controllers/sessions/runJobSearch/runJobSearchController');
const processSearchResultsController =
    require('../controllers/sessions/processSearchResults/processSearchResultsController');
const sessionTestController = require('../controllers/sessions/sessionTestController');
const totalJobsLogOutController = require('../controllers/sessions/totalJobsLogOut/totalJobsLogOutController');

router.get('/', checkAuth, getAllSessionsController.get_all_sessions);
router.post('/', postSessionToDBController.log_session);
router.get('/:sessionId', checkAuth, getSessionController.get_session);

// SYSTEM SESSION RUNTIME LOGIC
router.post('/totalJobsLogIn', checkAuth, totalJobsLogInController.totalJobs_logIn);
router.post('/runJobSearch', checkAuth, runJobSearchController.enter_search);
router.post('/processSearchResults', checkAuth, processSearchResultsController.process_results);
router.post('/totalJobsLogOut', checkAuth, totalJobsLogOutController.totalJobs_logOut);

router.post('/test', sessionTestController.run_test);

module.exports = router;