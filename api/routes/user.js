const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const userSignUpController = require('../controllers/users/userSignUpController');
const userLogInController = require('../controllers/users/userLogInController');
const getUserByIdController = require('../controllers/users/getUserByIdController');
const deleteUserController = require('../controllers/users/deleteUserController');
const setTJLogInController = require('../controllers/users/setTJLogInController')

router.get('/:userId', checkAuth, getUserByIdController.get_user_by_id);
router.post('/signup', userSignUpController.users_sign_up);
router.post('/login', userLogInController.users_login);
router.delete('/:userId', checkAuth, deleteUserController.delete_user);
router.put('/preferences/totalJobs/:userId', checkAuth, setTJLogInController.set_totalJobs_LogIn);

module.exports = router;