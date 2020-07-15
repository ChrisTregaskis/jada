const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');

router.get('/signup', UsersController.users_sign_up);

module.exports = router;