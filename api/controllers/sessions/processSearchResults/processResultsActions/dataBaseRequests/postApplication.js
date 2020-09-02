const mongoose = require('mongoose');
const Application = require('../../../../../models/applicationModel');

exports.post_application = async (sessionDetail, userId, jobData, foundKeyWords, desired, applied) => {
    const application = new Application ({
        _id: new mongoose.Types.ObjectId(),
        user_id: userId,
        session_id: sessionDetail.session_id,
        session_date: sessionDetail.session_date,
        session_time: sessionDetail.session_time,
        job_title: jobData.job_info.job_title,
        job_desc: jobData.job_info.job_desc,
        totalJobs_id: jobData.job_info.totalJobs_id,
        desired: desired,
        applied: applied,
        salary: jobData.job_info.salary,
        company: jobData.job_info.company,
        job_type: jobData.job_info.job_type,
        job_posted: jobData.job_info.job_posted,
        location: jobData.job_info.location,
        job_url: jobData.job_info.job_url,
        job_contact: jobData.job_info.job_contact,
        totalJobs_ref: jobData.job_info.totalJobs_ref,
        found_dkw: foundKeyWords.found_dkw,
        found_udkw: foundKeyWords.found_udkw,
        found_ikw: foundKeyWords.found_ikw
    })

    try {
        let savedApplication = await application.save();
        if (savedApplication) {
            return { success: true }
        }
    } catch (err) {
        console.log(err)
        return {
            success: false,
            error: err
        }
    }

}