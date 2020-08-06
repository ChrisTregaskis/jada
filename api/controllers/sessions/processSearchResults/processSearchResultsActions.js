const WebDriver = require('selenium-webdriver');
const localWebDriver = require('../webDriver');
const driver = localWebDriver.get_driver();
const User = require('../../../models/user');

exports.get_user_preferences = async (id) => {
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
