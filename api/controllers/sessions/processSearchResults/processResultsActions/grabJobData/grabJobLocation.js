const localWebDriver = require('../../../webDriver');
const driver = localWebDriver.get_driver();

exports.grab_job_location = async () => {
    try {
        let location;
        let locationSyntax_1 = await driver.findElements({ css: '.travelTime-locationText ul li a' });
        let locationSyntax_2 = await driver.findElements({ css: '.travelTime-locationText ul li' });
        let locationSyntax_3 = await driver.findElements({ css: '.location div' });
        if (locationSyntax_1.length > 0) {
            let locationElement = await driver.findElement({ css: '.travelTime-locationText ul li a' });
            location = await locationElement.getText();
            return {
                error: false,
                success: true,
                data: location
            }
        } else if (locationSyntax_2.length > 0) {
            let locationElement = await driver.findElement({ css: '.travelTime-locationText ul li' });
            location = await locationElement.getText();
            return {
                error: false,
                success: true,
                data: location
            }
        } else if (locationSyntax_3.length > 0) {
            let locationElement = await driver.findElement({ css: '.location div' });
            location = await locationElement.getText();
            return {
                error: false,
                success: true,
                data: location
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
