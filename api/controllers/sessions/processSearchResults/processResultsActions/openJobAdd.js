const WebDriver = require('selenium-webdriver');
const localWebDriver = require('../../webDriver');
const driver = localWebDriver.get_driver();

exports.open_job_add = async (mainWindow, jobId) => {
    try {
        let jobElement = await driver.findElement({ xpath: '//*[@id="' + jobId + '"]/div/div/div[1]/a'});
        let jobAddUrl = await jobElement.getAttribute('href');
        let openedJobAdd = await open_result(jobAddUrl);

        if (!(openedJobAdd) || openedJobAdd === 'error') {
            await driver.close();
            let backToMainWindow = await driver.switchTo().window(mainWindow)
            return false
        } else {
            return true
        }

    } catch (err) {
        console.log(err)
        return false
    }

}

async function open_result(url) {
    let resultPage
    try {
        await driver.switchTo().newWindow('tab')
        await driver.get(url)
        resultPage = await driver.wait(WebDriver.until.elementLocated({ css: '.salary div'}), 20000);
        return resultPage;
    } catch (err) {
        console.log(err)
        return 'error'
    }
}
