const localWebDriver = require('../../webDriver');
const driver = localWebDriver.get_driver();

exports.grab_total_results = async () => {
    try {
        let totalResults;
        totalResults = await driver.findElements({ css: '.page-title span' });
        if (totalResults.length > 0) {
            totalResults = await driver.findElement({ css: '.page-title span' });
            return await totalResults.getText();
        }
    } catch (err) {
        console.log(err)
        return false
    }

}
