const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: { type: String, required: true },
    session_id: { type: String, required: true },
    session_date: { type: String, required: true },
    session_time: { type: String, required: true },
    total_processed: { type: Number, required: true },
    newly_processed: { type: Number, required: true },
    successfully_applied: { type: Number, required: true },
    skipped_applications: { type: Number, required: true },
    dkw_overview: { type: Array, required: true },
    dkw_all: { type: Array, required: true },
    udkw_overview: { type: Array, required: true },
    udkw_all: { type: Array, required: true },
    top24_overview: { type: Array, required: true },
    top24_all: { type: Array, required: true },
    locations_overview: { type: Array, required: true },
    locations_all: { type: Array, required: true }
})

module.exports = mongoose.model('Session', sessionSchema);