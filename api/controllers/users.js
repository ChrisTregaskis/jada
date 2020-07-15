const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.users_sign_up = (req, res, next) => {
  return res.status(200).json({
      message: 'Controller working!'
  })
};