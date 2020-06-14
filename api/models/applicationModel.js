const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    jobTitle: { type: String, required: true }
})

module.exports = mongoose.model('Application', applicationSchema);