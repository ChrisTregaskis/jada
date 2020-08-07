const localWebDriver = require('../../../webDriver');
const driver = localWebDriver.get_driver();

exports.grab_job_description = async () => {
    let jobDescription
    try {
        jobDescription = await driver.findElement({ className: 'job-description' }).getText();
        return {
            success: true,
            data: jobDescription
        }
    } catch (err) {
        console.log(err)
        return {
            success: false,
            error: err
        }
    }
}