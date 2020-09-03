const mongoose = require('mongoose');
const Session = require('../../../../../models/sessionModel');

exports.post_session_report = async (report) => {
    const session = new Session ({
        _id: new mongoose.Types.ObjectId(),
        user_id: report.user_id,
        session_id: report.session_id,
        session_date: report.session_date,
        session_time: report.session_time,
        total_processed: report.total_processed,
        newly_processed: report.newly_processed,
        successfully_applied: report.successfully_applied,
        skipped_applications: report.skipped_applications,
        dkw_overview: report.dkw_overview,
        dkw_all: report.dkw_all,
        udkw_overview: report.udkw_overview,
        udkw_all: report.udkw_all,
        ikw_overview: report.ikw_overview,
        ikw_all: report.ikw_all,
        locations_overview:report.locations_overview,
        locations_all: report.locations_all
    });

    try {
        let savedSession = await session.save();
        if (savedSession) {
            return { success: true }
        }
    } catch (err) {
        console.log(err)
        return {
            success: false,
            message: 'Failed to post session report',
            error: err
        }
    }
}