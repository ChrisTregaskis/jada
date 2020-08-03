const Application = require('../../models/applicationModel');

exports.get_application = (req, res, next) => {
    const id = req.params.applicationId
    Application
        .findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    response: {
                        status: 200,
                        count: 1,
                        application: {
                            _id: doc._id,
                            user_id: doc.user_id,
                            session_id: doc.session_id,
                            session_date: doc.session_date,
                            session_time: doc.session_time,
                            job_title: doc.job_title,
                            totalJobs_id: doc.totalJobs_id,
                            apply_attempted: doc.apply_attempted,
                            interested: doc.interested,
                            salary: doc.salary,
                            company: doc.company,
                            job_type: doc.job_type,
                            job_posted: doc.job_posted,
                            location: doc.location,
                            job_url: doc.job_url,
                            job_contact: doc.job_contact,
                            totalJobs_ref: doc.totalJobs_ref,
                            found_dkw: doc.found_dkw,
                            found_udkw: doc.found_udkw,
                            found_top24: doc.found_top24
                        }
                    }
                })
            } else {
                res.status(404).json({
                    status: 404,
                    message: 'no valid entry found for application id'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                error: err
            })
        })
};