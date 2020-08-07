const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

exports.users_login = (req, res, next) => {
    User.find({ "log_in_credentials.jada.email": req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    success: false,
                    message: 'Auth failed'
                });
            }

            bcrypt.compare(req.body.password, user[0].log_in_credentials.jada.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        error: err,
                        success: false,
                        message: 'Auth failed'
                    })
                }

                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, process.env.JWT_KEY, { expiresIn: "8h" })
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
