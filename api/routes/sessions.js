const express = require('express');
const router = express.Router();
const sessionsController = require('../controllers/sessionsController');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, sessionsController.get_all_sessions);
router.post('/', sessionsController.log_session);
router.get('/:sessionId', checkAuth, sessionsController.get_session);

module.exports = router;