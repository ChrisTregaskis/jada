const localWebDriver = require('../../../webDriver');
const driver = localWebDriver.get_driver();

exports.grab_job_posted = async () => {
    try {
        let jobPosted;
        let jobPostedElement;
        let jobPostedElements = await driver.findElements({ css: '.date-posted div span'});
        if (jobPostedElements.length > 0) {
            jobPostedElement = await driver.findElement({ css: '.date-posted div span'});
            jobPosted = await jobPostedElement.getText();
            return {
                error: false,
                success: true,
                data: jobPosted
            }
        } else {
            return {
                error: false,
                success: false,
                data: 'NOT_FOUND'
            }
        }
    } catch (err) {
        console.log(err)
        return {
            success: false,
            error: err
        }
    }

}
