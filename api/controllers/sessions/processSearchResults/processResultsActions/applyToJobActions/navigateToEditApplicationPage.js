const WebDriver = require('selenium-webdriver');
const localWebDriver = require('../../../webDriver');
const driver = localWebDriver.get_driver();

exports.navigate_to_edit_application_page = async () => {
    try {
        let editApplicationBtnElements;
        editApplicationBtnElements = await driver.findElements({
            xpath: '//*[@id="top-button-panel"]/section/div[2]/div[2]/div/div[2]/div[1]/a'
        });

        if (editApplicationBtnElements.length > 0) {
            let editApplicationBtnElement = await driver.findElement({
                xpath: '//*[@id="top-button-panel"]/section/div[2]/div[2]/div/div[2]/div[1]/a'
            }).click();
            let applyPage = await driver.wait(WebDriver.until.elementLocated({ id: 'btnSubmit' }), 20000);
            if (applyPage) {
                return { success: true }
            } else {
                return {
                    error: false,
                    success: false,
                    message: 'System error, submit button on application not found'
                }
            }

        } else {
            return {
                error: false,
                success: false,
                message: 'System error, edit button on application not found'
            }
        }
    } catch (err) {
        return {
            success: false,
            error: 'System error, edit button on application not found'
        }
    }

}
