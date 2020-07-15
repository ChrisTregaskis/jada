const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');

router.post('/signup', UsersController.users_sign_up);

module.exports = router;