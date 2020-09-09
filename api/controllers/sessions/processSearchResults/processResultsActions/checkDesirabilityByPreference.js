const { get_user_job_type, get_user_salary } = require('./dataBaseRequests/getUserPreferences');

exports.check_desirability_job_type = async (applicationJobType, userId) => {
    let userJobType = await get_user_job_type(userId);
    return applicationJobType === userJobType.job_type;
}

exports.check_desirability_salary = async (applicationSalaryRange, userId) => {
    let userSalaryPreferences = await get_user_salary(userId);
    let userSalaryLow = userSalaryPreferences.salary.permanent_minimum;
    let userSalaryHigh = userSalaryPreferences.salary.permanent_maximum;
    let applicationSalaryArray = applicationSalaryRange.split("-");
    let applicationSalaryLow = parseInt(applicationSalaryArray[0]);
    let applicationSalaryHigh = parseInt(applicationSalaryArray[1]);
    let desired = false;

    if (userSalaryLow >= applicationSalaryLow && userSalaryLow <= applicationSalaryHigh) {
        desired = true
    } else if (userSalaryHigh <= applicationSalaryHigh && userSalaryHigh >= applicationSalaryLow) {
        desired = true
    }

    return desired
}