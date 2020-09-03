const localWebDriver = require('../../../webDriver');
const driver = localWebDriver.get_driver();

exports.grab_job_JSON = async () => {
    try {
        let agnosticAnalyticsJSON = await driver.executeScript('return analytics');
        let jobJSONElements = await driver.findElements({ id: 'jobPostingSchema' });
        if (jobJSONElements.length > 0) {
            let jobJSONElement = await driver.findElement({ id: 'jobPostingSchema' });
            let jobJSONString = await jobJSONElement.getAttribute('innerHTML');
            let jobJSON = await JSON.parse(jobJSONString);

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
                data: {
                    job_schema: {
                        title: 'NOT_FOUND',
                        hiringOrganization: {
                            name: 'NOT_FOUND'
                        },
                        employmentType: 'NOT_FOUND',
                        datePosted: 'NOT_FOUND',
                        jobLocation: {
                            address: {
                                addressLocality: 'NOT_FOUND'
                            }
                        }
                    },
                    agnostic_analytics: agnosticAnalyticsJSON
                }
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
