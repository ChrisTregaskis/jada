const WebDriver = require('selenium-webdriver');
const localWebDriver = require('../webDriver');
const driver = localWebDriver.get_driver();
const User = require('../../../models/user');

exports.get_user_kw = async (id) => {
    let userData = await User.findById(id)
    let userPreferences = {};
    try {
        userPreferences = {
            dkw: userData.preferences.dkw,
            udkw: userData.preferences.udkw,
            ikw: userData.preferences.ikw
        }
        return userPreferences
    } catch (err) { throw err }
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