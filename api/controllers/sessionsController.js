const mongoose = require('mongoose');
const Session = require('../models/sessionModel');

exports.get_all_sessions = (req, res, next) => {
    Session
        .find()
        .exec()
        .then(docs => {
            const response = {
                status: 200,
                count: docs.length,
                sessions: docs.map(doc => {
                    return {
                        _id: doc._id,
                        TEST_SESSION: doc.TEST_SESSION,
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
                    }
                })
            }

            if (docs.length > 0) {
                res.status(200).json({ response });
            } else {
                res.status(404).json({
                    status: 404,
                    message: 'no data in db'
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

exports.get_session = (req, res, next) => {
    const id = req.params.sessionId;
    Session
        .findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    _id: doc._id,
                    TEST_SESSION: doc.TEST_SESSION,
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

exports.log_session = (req, res, next) => {
    const session = new Session ({
        _id: new mongoose.Types.ObjectId(),
        TEST_SESSION: req.body.TEST_SESSION,
        user_id: req.body.user_id,
        session_id: req.body.session_id,
        session_date: req.body.session_date,
        session_time: req.body.session_time,
        total_processed: req.body.total_processed,
        newly_processed: req.body.newly_processed,
        successfully_applied: req.body.successfully_applied,
        skipped_applications: req.body.skipped_applications,
        dkw_overview: req.body.dkw_overview,
        dkw_all: req.body.dkw_all,
        udkw_overview: req.body.udkw_overview,
        udkw_all: req.body.udkw_all,
        top24_overview: req.body.top24_overview,
        top24_all: req.body.top24_all,
        locations_overview: req.body.locations_overview,
        locations_all: req.body.locations_all
    })

    session
        .save()
        .then(result => {
            res.status(200).json({
                status: 200,
                message: "Session successfully logged",
                loggedSession: {
                    _id: result._id,
                    TEST_SESSION: result.TEST_SESSION,
                    user_id: result.user_id,
                    session_id: result.session_id,
                    session_date: result.session_date,
                    session_time: result.session_time,
                    total_processed: result.total_processed,
                    newly_processed: result.newly_processed,
                    successfully_applied: result.successfully_applied,
                    skipped_applications: result.skipped_applications,
                    dkw_overview: result.dkw_overview,
                    dkw_all: result.dkw_all,
                    udkw_overview: result.udkw_overview,
                    udkw_all: result.udkw_all,
                    top24_overview: result.top24_overview,
                    top24_all: result.top24_all,
                    locations_overview: result.locations_overview,
                    locations_all: result.locations_all
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                error: err
            })
        });
}