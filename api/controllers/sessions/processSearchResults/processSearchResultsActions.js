const localWebDriver = require('../webDriver');
const driver = localWebDriver.get_driver();
const Applications = require('../../../models/applicationModel');

exports.failed_res = (status, message) => {
    return {
        status: status,
        success: false,
        message: message
    }
}

exports.check_logged_in = async () => {
    try {
        let navBarWebElement = await driver.findElement({ id: "navbar-header" });
        let navBarClass = await navBarWebElement.getAttribute('class');
        let navBarClasses = navBarClass.split(" ");
        return navBarClasses.includes("logged-in")
    } catch (err) {
        console.log(err)
        return false
    }
}

exports.get_total_results = async () => {
    try {
        let totalResults;
        totalResults = await driver.findElements({ css: '.page-title span' });
        if (totalResults.length > 0) {
            totalResults = await driver.findElement({ css: '.page-title span' });
            return await totalResults.getText();
        }
    } catch (err) {
        console.log(err)
        return false
    }

}

exports.get_search_parameters = async () => {
    try {
        let jTElement = await driver.findElement({ id: 'keywords' });
        let jobTitle = await jTElement.getAttribute('value');

        let lElement = await driver.findElement({ id: 'location' });
        let location = await lElement.getAttribute('value');

        let rBtnGroupElement = await driver.findElement({ css: '.radius-button-group span' });
        let radius = await rBtnGroupElement.getText();

        return {
            success: true,
            data: {
                job_title: jobTitle,
                location: location,
                radius: radius
            }
        }
    } catch (err) {
        console.log(err)
        return {
            success: false,
            message: 'System error, failed to find search parameters',
            error: err
        }
    }
}

exports.generate_session_report = async (sessionId) => {
    try {
        let applications = await Applications.find({ session_id: sessionId})


        return {
            success: true,
            data: {
                applications: applications
            }
        }
    } catch (err) {
        console.log(err)
        return {
            success: false,
            message: 'System error, failed to generate session report',
            error: err
        }
    }

}