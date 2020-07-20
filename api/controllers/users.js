const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.users_sign_up = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                  return res.status(422).json({ message: 'Email exists' });
                } else {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            return res.status(500).json({ error: err });
                        } else {
                            const user = new User({
                                _id: new mongoose.Types.ObjectId(),
                                first_name: req.body.first_name,
                                last_name: req.body.last_name,
                                email: req.body.email,
                                password: hash
                            });
                            user
                                .save()
                                .then(result => {
                                  console.log(result)
                                  res.status(201).json({
                                      message: 'User created',
                                      user: {
                                          _id: result._id,
                                          first_name: result.first_name,
                                          last_name: result.last_name,
                                          email: result.email
                                      }
                                  })
                                })
                                .catch(err => {
                                  res.status(500).json({ error: err })
                                })
                      }
                  })
            }
        })
        .catch(err => {
          res.status(500).json({ error: err })
        })
};

exports.users_login = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    success: false,
                    message: 'Auth failed'
                });
            }

            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        success: false,
                        message: 'Auth failed'
                    })
                }

                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, process.env.JWT_KEY, { expiresIn: "1h" })
                    return res.status(200).json({
                        success: true,
                        message: 'Auth successful',
                        user_id: user[0]._id,
                        token: token
                    });
                }

                res.status(401).json({
                    success: false,
                    message: 'Auth failed'
                })
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
};

exports.get_user_by_id = (req, res, next) => {
    const userId = req.params.userId
    User
        .findById(userId)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    status: 200,
                    success: true,
                    user: {
                        _id: doc._id,
                        email: doc.email,
                        first_name: doc.first_name,
                        last_name: doc.last_name
                    }
                })
            } else {
                res.status(404).json({
                    status: 404,
                    success: false,
                    message: 'no valid entry found for user id'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                success: false,
                error: err
            })
        })
}

exports.users_delete_user = (req, res, next) => {
    User.deleteOne({ _id: req.params.userId })
      .exec()
      .then(result => {
          res.status(200).json({ message: 'User deleted' });
      })
      .catch(err => {
          res.status(500).json({ error: err })
      });
};