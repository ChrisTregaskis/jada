const { grab_all_job_data } = require('./processSearchResults/processResultsActions/grabJobData');
const { check_desirability_job_type } = require('./processSearchResults/processResultsActions/checkDesirabilityByPreference')

const localWebDriver = require('../sessions/webDriver');
const driver = localWebDriver.get_driver();

exports.run_test = async (req, res, next) => {
    const url = 'https://www.totaljobs.com/job/administrative-officer/guidant-global-job90645387';
    await driver.get(url);

    let jobData = await grab_all_job_data('90645387', 'https://www.totaljobs.com/job/administrative-officer/guidant-global-job90645387');
    if (!(jobData.success)) {
        return {
            success: false,
            message: 'System error grabbing job data'
        }
    }

    let applicationJobType = jobData.job_info.job_type;
    let desiredJobType = await check_desirability_job_type(applicationJobType, '5f328a56e941284b21b2da3f')

    return await res.status(200).json({
        success: true,
        message: 'session test controller',
        desired_job_type: desiredJobType,
        job_data_success: jobData.success
    })
}