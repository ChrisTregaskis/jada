const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const getAllSessionsController = require('../controllers/sessions/getAllSessionsController');

const sessionsController = require('../controllers/sessionsController');

router.get('/', checkAuth, getAllSessionsController.get_all_sessions);
router.post('/', sessionsController.log_session);
router.get('/:sessionId', checkAuth, sessionsController.get_session);

module.exports = router;