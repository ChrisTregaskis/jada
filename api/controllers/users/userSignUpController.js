const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

exports.users_sign_up = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(422).json({
                    status: 422,
                    success: false,
                    message: 'Email exists'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            log_in_credentials: {
                                jada: {
                                    email: req.body.email,
                                    password: hash
                                }
                            }
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result)
                                res.status(201).json({
                                    success: true,
                                    message: 'User created',
                                    user: {
                                        _id: result._id,
                                        first_name: result.first_name,
                                        last_name: result.last_name,
                                        email: result.log_in_credentials.jada.email
                                    }
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    success: false,
                                    error: err
                                })
                            })
                    }
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                error: err
            })
        })
};
