const localWebDriver = require('../../../webDriver');
const driver = localWebDriver.get_driver();

exports.grab_job_type = async () => {
    try {
        let jobType;
        let jobTypeElement;
        let jobTypeElements = await driver.findElements({ css: '.job-type div' });
        if (jobTypeElements.length > 0) {
            jobTypeElement = await driver.findElement({ css: '.job-type div' });
            jobType = await jobTypeElement.getText();
            return {
                error: false,
                success: true,
                data: jobType
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