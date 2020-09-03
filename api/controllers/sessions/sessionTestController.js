const { apply_to_job } = require('../sessions/processSearchResults/processResultsActions/applyToJob');
const localWebDriver = require('../sessions/webDriver');
const driver = localWebDriver.get_driver();

exports.run_test = async (req, res, next) => {
    const url = 'https://www.totaljobs.com/job/software-developer/premier-it-job90603037';
    await driver.get(url);

    let applyToJob = await apply_to_job();

    if (applyToJob.error) {
        await res.status(500).json({ error: applyToJob.error })
    } else if (applyToJob.success) {
        await res.status(200).json({
            success: true,
            message: 'session test controller',
            applyToJob: applyToJob
        })
    }
}