const localWebDriver = require('../../../webDriver');
const driver = localWebDriver.get_driver();

exports.grab_job_company = async () => {
    try {
        let company;
        let companyElement;
        let companyElements = await driver.findElements({ css: '.company div a' });
        if (companyElements.length > 0) {
            companyElement = await driver.findElement({ css: '.company div a' });
            company = await companyElement.getText();
            return {
                error: false,
                success: true,
                data: company
            }
        } else {
            return {
                error: false,
                success: false,
                data: 'NOT_FOUND'
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
