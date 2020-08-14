const localWebDriver = require('../../../webDriver');
const driver = localWebDriver.get_driver();

exports.grab_job_JSON = async () => {
    try {
        let jobJSONElements = await driver.findElements({ id: 'jobPostingSchema' });
        if (jobJSONElements.length > 0) {
            let jobJSONElement = await driver.findElement({ id: 'jobPostingSchema' });
            let jobJSONString = await jobJSONElement.getAttribute('innerHTML');
            let jobJSON = await JSON.parse(jobJSONString);
            let agnosticAnalyticsJSON = await driver.executeScript('return analytics');

            return {
                error: false,
                success: true,
                data: {
                    job_schema: jobJSON,
                    agnostic_analytics: agnosticAnalyticsJSON
                }
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
