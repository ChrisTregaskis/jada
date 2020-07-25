const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const getAllSessionsController = require('../controllers/sessions/getAllSessionsController');
const getSessionController = require('../controllers/sessions/getSessionController');
const postSessionToDBController = require('../controllers/sessions/postSessionToDBController');

router.get('/', checkAuth, getAllSessionsController.get_all_sessions);
router.post('/', postSessionToDBController.log_session);
router.get('/:sessionId', checkAuth, getSessionController.get_session);

module.exports = router;