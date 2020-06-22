const mongoose = require('mongoose');
const Application = require('../models/applicationModel')

exports.get_all_applications = (req, res, next) => {
    Application
        .find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                applications: docs.map(doc => {
                    return {
                        _id: doc._id,
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
                })
            }

            if (docs.length > 0) {
                res.status(200).json({response})
            } else {
                res.status(404).json({
                    message: 'no data in db'
                })
            }

        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
};

exports.log_application = (req, res, next) => {
    const application = new Application ({
        _id: new mongoose.Types.ObjectId(),
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
                error: err
            })
        });
};

exports.get_application = (req, res, next) => {
    const id = req.params.applicationId
    Application
        .findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    _id: doc._id,
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
                })
            } else {
                res.status(404).json({
                    message: 'no valid entry found for application id'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
};

exports.delete_application = (req, res, next) => {
    const id = req.params.applicationId
    Application
        .deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'application deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:8080/applications',
                    desc: 'add a new application to db',
                    body: { jobTitle: 'String'}
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}

exports.delete_applications = (req, res, next) => {
    let deleteOption = req.body.deleteOption;
    console.log(deleteOption)
    Application
        .deleteMany({ "apply_attempted": deleteOption })
        .exec()
        .then(result => {
            res.status(200).json({
                message: `Deleted ${result.deletedCount}`
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}