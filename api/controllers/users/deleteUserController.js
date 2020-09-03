const User = require('../../models/user');

exports.delete_user = (req, res, next) => {
    User.deleteOne({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({ message: 'User deleted' });
        })
        .catch(err => {
            res.status(500).json({ error: err })
        });
};