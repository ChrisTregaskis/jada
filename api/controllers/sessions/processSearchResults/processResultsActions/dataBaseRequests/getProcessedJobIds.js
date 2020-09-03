const Applications = require('../../../../../models/applicationModel');

exports.get_processed_job_ids = async (id) => {
    let userApplications;
    let processedJobIds = [];

    try {
        userApplications = await Applications.find({ user_id: id });
        if (userApplications.length > 0) {
            userApplications.forEach(application => {
                processedJobIds.push(application.totalJobs_id);
            })
        }
        return processedJobIds;
    } catch (err) {
        if (err) {
            console.log(err)
            return false
        }
    }

}