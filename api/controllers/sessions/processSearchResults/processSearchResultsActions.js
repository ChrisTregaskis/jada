const localWebDriver = require('../webDriver');
const driver = localWebDriver.get_driver();

exports.failed_res_400 = (message) => {
    return {
        status: 400,
        success: false,
        message: message
    }
}

exports.failed_res_500 = (message) => {
    return {
        status: 500,
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
