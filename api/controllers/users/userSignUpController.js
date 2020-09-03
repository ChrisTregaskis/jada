const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

exports.users_sign_up = async (req, res, next) => {
    const reqEmail = req.body.email;
    const reqPass = req.body.password;
    const reqFName = req.body.first_name;
    const reqLName = req.body.last_name;
    let user;

    let emailExists = await User.find({ "log_in_credentials.jada.email": reqEmail })

    if (emailExists.length >= 1) {
        return res.status(422).json({
            status: 422,
            success: false,
            message: 'Email exists'
        });
    }

    bcrypt.hash(reqPass, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: err
            });
        } else {
            user = new User({
                _id: new mongoose.Types.ObjectId(),
                first_name: reqFName,
                last_name: reqLName,
                log_in_credentials: {
                    jada: {
                        email: reqEmail,
                        password: hash
                    }
                }
            });

            user.save()
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
                        .catch(err => {
                            res.status(500).json({
                                success: false,
                                error: err
                            })
                        })
                })

        }
    })


};
