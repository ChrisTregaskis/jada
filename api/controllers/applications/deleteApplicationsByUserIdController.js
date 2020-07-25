const Application = require('../../models/applicationModel')

exports.delete_applications_by_user_id = (req, res, next) => {
    const id = req.params.userId;
    Application
        .deleteMany({ user_id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                status: 200,
                user_id: id,
                message: `Deleted ${result.deletedCount}`
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        });
}