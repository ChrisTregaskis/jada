const express = require('express');
const router = express.Router();
const sessionsController = require('../controllers/sessionsController');

router.get('/', sessionsController.get_all_sessions);
router.post('/', sessionsController.log_session);

module.exports = router;