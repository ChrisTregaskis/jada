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
                        first_name: doc.first_name,
                        last_name: doc.last_name,
                        jada_email: doc.log_in_credentials.jada.email,
                        totalJobs_email: doc.log_in_credentials.totalJobs.email,
                        preferences: {
                            reporting_email: doc.preferences.reporting_email,
                            job_title: doc.preferences.job_title,
                            location: doc.preferences.location,
                            radius: doc.preferences.radius,
                            job_type: doc.preferences.job_type,
                            salary: doc.preferences.salary,
                            session_limit: doc.preferences.session_limit,
                            dkw: doc.preferences.dkw,
                            udkw: doc.preferences.udkw,
                            ikw: doc.preferences.ikw
                        }
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
