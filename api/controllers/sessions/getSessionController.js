const Session = require('../../models/sessionModel');

exports.get_session = (req, res, next) => {
    const id = req.params.sessionId;
    Session
        .findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    _id: doc._id,
                    user_id: doc.user_id,
                    session_id: doc.session_id,
                    session_date: doc.session_date,
                    session_time: doc.session_time,
                    total_processed: doc.total_processed,
                    newly_processed: doc.newly_processed,
                    successfully_applied: doc.successfully_applied,
                    skipped_applications: doc.skipped_applications,
                    dkw_overview: doc.dkw_overview,
                    dkw_all: doc.dkw_all,
                    udkw_overview: doc.udkw_overview,
                    udkw_all: doc.udkw_all,
                    top24_overview: doc.top24_overview,
                    top24_all: doc.top24_all,
                    locations_overview: doc.locations_overview,
                    locations_all: doc.locations_all
                })
            } else {
                res.status(404).json({
                    status: 404,
                    message: 'no valid entry found for session database obj id'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                error: err
            })
        });
}