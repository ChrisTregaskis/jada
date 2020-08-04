const WebDriver = require('selenium-webdriver');
const driver = new WebDriver.Builder().forBrowser('chrome').build();

exports.get_driver = () => {
    return driver
}
