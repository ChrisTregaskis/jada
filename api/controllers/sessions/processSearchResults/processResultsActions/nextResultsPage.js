const WebDriver = require('selenium-webdriver');
const localWebDriver = require('../../webDriver');
const driver = localWebDriver.get_driver();

exports.next_results_page = async function() {
    try {
        let nextBtnElements = await driver.findElements({ css: '.pagination .next' });
        if (nextBtnElements.length > 0) {
            let nextBtnElement = await driver.findElement({ css: '.pagination .next' })
            let clickNextBtn = await nextBtnElement.click();
            let resultsPage = await driver.wait(WebDriver.until.elementLocated({
                xpath: '//*[@id="scroll-to-top"]'
            }), 20000);

            if (resultsPage) {
                return { success: true }
            } else {
                return { success: false }
            }

        } else {
            return { success: false }
        }
    } catch (err) {
        console.log(err)
        return {
            success: false,
            error: err
        }
    }

}
