const WebDriver = require('selenium-webdriver');
const localWebDriver = require('../../../webDriver');
const driver = localWebDriver.get_driver();

exports.click_apply = async () => {
    try {
        let submitButton = await driver.findElement({ id: 'btnSubmit' });
        let clickSubmit = await submitButton.click();
        let returnToSearch = await driver.wait(WebDriver.until.elementLocated({
            className: 'return-to-search'
        }), 20000);

        let submissionSuccessful = await driver.findElements({ className: 'return-to-search' });
        if (submissionSuccessful.length > 0) {
            return { success: true }
        }
    } catch (err){
        console.log(err)
        return {
            success: false,
            error: err
        }
    }
}
