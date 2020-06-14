const mongoose = require('mongoose');
const Application = require('../models/applicationModel')

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
}