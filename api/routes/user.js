const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');
const checkAuth = require('../middleware/check-auth');

router.post('/signup', UsersController.users_sign_up);
router.post('/login', UsersController.users_login);
router.delete('/:userId', checkAuth, UsersController.users_delete_user);

module.exports = router;