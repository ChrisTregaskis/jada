const localWebDriver = require('../../../webDriver');
const driver = localWebDriver.get_driver();

exports.grab_job_salary = async () => {
    try {
        let salary;
        let salaryElement;
        let salaryElements = await driver.findElements({ css: '.salary div' });
        if (salaryElements.length > 0) {
            salaryElement = await driver.findElement({ css: '.salary div' });
            salary = await salaryElement.getText();
            return {
                error: false,
                success: true,
                data: salary
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