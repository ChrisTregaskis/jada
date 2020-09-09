const { grab_all_job_data } = require('./processSearchResults/processResultsActions/grabJobData');
const { check_desirability_salary } = require('./processSearchResults/processResultsActions/checkDesirabilityByPreference')

const localWebDriver = require('../sessions/webDriver');
const driver = localWebDriver.get_driver();

exports.run_test = async (req, res, next) => {
    const url = 'https://www.totaljobs.com/job/graduate-software-developer/rise-technical-recruitment-limited-job90658428';
    await driver.get(url);

    let jobData = await grab_all_job_data('90658428', 'https://www.totaljobs.com/job/graduate-software-developer/rise-technical-recruitment-limited-job90658428');
    if (!(jobData.success)) {
        return {
            success: false,
            message: 'System error grabbing job data'
        }
    }

    let applicationSalaryRange = jobData.job_info.salary;
    let desiredSalaryRange = await check_desirability_salary(applicationSalaryRange, '5f328a56e941284b21b2da3f')

    return await res.status(200).json({
        success: true,
        message: 'session test controller',
        app_sal_range: applicationSalaryRange,
        job_data_success: jobData.success,
        des_sal: desiredSalaryRange
    })
}