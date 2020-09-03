const Application = require('../../models/applicationModel')

exports.delete_applications_by_session_id = (req, res, next) => {
    const id = req.params.sessionId;
    Application
        .deleteMany({ session_id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                status: 200,
                session_id: id,
                message: `Deleted ${result.deletedCount}`
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        });
}