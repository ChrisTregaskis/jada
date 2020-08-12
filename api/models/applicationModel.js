const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: { type: String, required: true },
    obj_date: { type: Date, default: Date.now() },
    session_id: { type: String, required: true },
    session_date: { type: String, required: true },
    session_time: { type: String, required: true },
    job_title: { type: String, required: true },
    totalJobs_id: { type: String, required: true },
    desired: { type: Boolean, required: true },
    applied: { type: Boolean, required: true },
    salary: { type: String },
    company: { type: String },
    job_type: { type: String },
    job_posted: { type: String },
    location: { type: String },
    job_url: { type: String },
    job_contact: { type: String },
    totalJobs_ref: { type: String },
    found_dkw: { type: Array, required: true },
    found_udkw: { type: Array, required: true },
    found_ikw: { type: Array, required: true }
})

module.exports = mongoose.model('Application', applicationSchema);