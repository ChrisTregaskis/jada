const localWebDriver = require('../../../webDriver');
const driver = localWebDriver.get_driver();

exports.grab_job_title = async () => {
    try {
        let jtElement = await driver.findElement({ css: '.job-content-top h1' });
        let jobTitle = await jtElement.getText();
        return {
            success: true,
            data: jobTitle
        }
    } catch (err) {
        console.log(err)
        return {
            success: false,
            error: err
        }
    }

}