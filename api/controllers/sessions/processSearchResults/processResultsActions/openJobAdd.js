const WebDriver = require('selenium-webdriver');
const localWebDriver = require('../../webDriver');
const driver = localWebDriver.get_driver();

exports.open_job_add = async (mainWindow, url) => {
    try {
        await driver.switchTo().newWindow('tab')
        await driver.get(url)
        let resultPage = await driver.wait(WebDriver.until.elementLocated({ css: '.salary div'}), 20000);
        if (!(resultPage)) {
            await driver.close();
            let backToMainWindow = await driver.switchTo().window(mainWindow)
            return {
                error: false,
                success: false
            }
        } else {
            return {
                error: false,
                success: true
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
