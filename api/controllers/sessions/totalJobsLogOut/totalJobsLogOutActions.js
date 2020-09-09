const WebDriver = require('selenium-webdriver');
const localWebDriver = require('../webDriver');
const driver = localWebDriver.get_driver();

exports.log_out_totalJobs = async () => {
    try {
        await driver.findElement({ id: 'navbar-personalisation-toggle' }).click();
        await driver.findElement({ id: 'sign-out-link' }).click();
        return {
            success: true,
            message: 'Successfully logged out'
        }
    } catch (err) {
        console.log(err)
        return {
            success: false,
            message: 'System error, unable to log out'
        }
    }
}

