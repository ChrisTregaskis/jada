const mongoose = require('mongoose');
const Application = require('../../models/applicationModel')

exports.log_application = (req, res, next) => {
    const application = new Application ({
        _id: new mongoose.Types.ObjectId(),
        user_id: req.body.user_id,
        session_id: req.body.session_id,
        session_date: req.body.session_date,
        session_time: req.body.session_time,
        job_title: req.body.job_title,
        totalJobs_id: req.body.totalJobs_id,
        apply_attempted: req.body.apply_attempted,
        interested: req.body.interested,
        salary: req.body.salary,
        company: req.body.company,
        job_type: req.body.job_type,
        job_posted: req.body.job_posted,
        location: req.body.location,
        job_url: req.body.job_url,
        job_contact: req.body.job_contact,
        totalJobs_ref: req.body.totalJobs_ref,
        found_dkw: req.body.found_dkw,
        found_udkw: req.body.found_udkw,
        found_top24: req.body.found_top24
    });

    application
        .save()
        .then(result => {
            res.status(200).json({
                status: 200,
                message: "Application successfully logged",
                loggedApplication: {
                    _id: result._id,
                    user_id: result.user_id,
                    session_id: result.session_id,
                    session_date: result.session_date,
                    session_time: result.session_time,
                    job_title: result.job_title,
                    totalJobs_id: result.totalJobs_id,
                    apply_attempted: result.apply_attempted,
                    interested: result.interested,
                    salary: result.salary,
                    company: result.company,
                    job_type: result.job_type,
                    job_posted: result.job_posted,
                    location: result.location,
                    job_url: result.job_url,
                    job_contact: result.job_contact,
                    totalJobs_ref: result.totalJobs_ref,
                    found_dkw: result.found_dkw,
                    found_udkw: result.found_udkw,
                    found_top24: result.found_top24
                },
                request: {
                    type: 'GET',
                    desc: 'Get this particular application',
                    url: 'http://localhost:8080/applications/' + result._id
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                error: err
            })
        });
};