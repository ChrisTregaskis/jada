const User = require('../../models/user');

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
