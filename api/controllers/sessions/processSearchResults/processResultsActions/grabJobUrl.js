const localWebDriver = require('../../webDriver');
const driver = localWebDriver.get_driver();

exports.grab_job_url = async (jobId) => {
    try {
        let jobElement = await driver.findElement({ xpath: '//*[@id="' + jobId + '"]/div/div/div[1]/a'});
        let jobAddUrl = await jobElement.getAttribute('href');
        return {
            success: true,
            data: jobAddUrl
        }
    } catch (err) {
        return {
            success: false,
            error: err
        }
    }
}