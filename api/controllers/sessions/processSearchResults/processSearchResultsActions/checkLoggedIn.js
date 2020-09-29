const WebDriver = require('selenium-webdriver');
const localWebDriver = require('../../webDriver');
const driver = localWebDriver.get_driver();

exports.check_logged_in = async () => {
    try {
        let loggedInClass = await driver.wait(WebDriver.until.elementLocated({
            className: "navbar-header logged-in"
        }), 20000)
        let navBarWebElement = await driver.findElement({ id: "navbar-header" });
        let navBarClass = await navBarWebElement.getAttribute('class');
        let navBarClasses = navBarClass.split(" ");
        let loggedIn = navBarClasses.includes("logged-in")
        return {
            success: loggedIn
        }

    } catch (err) {
        console.log(err)
        return {
            success: false,
            error: err
        }
    }
}
