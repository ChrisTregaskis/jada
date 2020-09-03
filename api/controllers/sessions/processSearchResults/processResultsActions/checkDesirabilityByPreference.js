const { get_user_job_type } = require('./dataBaseRequests/getUserPreferences');

exports.check_desirability_job_type = async (applicationJobType, userId) => {
    let userJobType = await get_user_job_type(userId);
    return applicationJobType === userJobType.job_type;
}