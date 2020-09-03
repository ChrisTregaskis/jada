const mongoose = require('mongoose');
const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    log_in_credentials: {
        jada: {
            email: {
                type: String,
                required: true,
                unique: true,
                match: emailRegEx
            },
            password: { type: String, required: true }
        },
        totalJobs: {
            tJ_email: {
                type: String,
                unique: true,
                match: emailRegEx
            },
            tJ_password: { type: String }
        }
    },
    preferences: {
        reporting_email: {
            type: String,
            match: emailRegEx
        },
        job_title: { type: String },
        location: { type: String },
        radius: { type: Number },
        session_limit: { type: Number },
        dkw: { type: Array },
        udkw: { type: Array },
        ikw: { type: Array }
    }
});

module.exports = mongoose.model('User', userSchema);