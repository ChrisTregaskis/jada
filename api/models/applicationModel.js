const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    TEST_application: { type: Boolean, required: true},
    obj_date: { type: Date, default: Date.now() },
    session_id: { type: String, required: true },
    session_date: { type: String, required: true },
    session_time: { type: String, required: true },
    job_title: { type: String, required: true },
    totalJobs_id: { type: String, required: true },
    apply_attempted: { type: Boolean, required: true},
    interested: { type: Boolean },
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
    found_top24: { type: Array, required: true }
})

module.exports = mongoose.model('Application', applicationSchema);