const localWebDriver = require('../../webDriver');
const driver = localWebDriver.get_driver();

exports.grab_search_params = async () => {
    try {
        let jTElement = await driver.findElement({ id: 'keywords' });
        let jobTitle = await jTElement.getAttribute('value');

        let lElement = await driver.findElement({ id: 'location' });
        let location = await lElement.getAttribute('value');

        let rBtnGroupElement = await driver.findElement({ css: '.radius-button-group span' });
        let radius = await rBtnGroupElement.getText();

        return {
            success: true,
            data: {
                job_title: jobTitle,
                location: location,
                radius: radius
            }
        }
    } catch (err) {
        console.log(err)
        return {
            success: false,
            message: 'System error, failed to find search parameters',
            error: err
        }
    }
}