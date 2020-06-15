const mongoose = require('mongoose');
const Application = require('../models/applicationModel')

exports.get_all_applications = (req, res, next) => {
    Application
        .find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                application: docs.map(doc => {
                    return {
                        _id: doc._id,
                        jobTitle: doc.jobTitle
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
        jobTitle: req.body.jobTitle
    });

    application
        .save()
        .then(result => {
            res.status(200).json({
                message: "Application successfully logged",
                loggedApplication: {
                    _id: result._id,
                    jobTitle: result.jobTitle
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
                    jobTitle: doc.jobTitle
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
}