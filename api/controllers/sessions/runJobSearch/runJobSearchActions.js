const localWebDriver = require('../webDriver');
const driver = localWebDriver.get_driver();

exports.enter_job_title = async (jobTitle) => {
    try {
        await driver.findElement({ id: 'keywords' }).clear();
        await driver.findElement({ id: 'keywords' }).sendKeys(jobTitle);
    } catch (err) { throw err }
}

exports.enter_location = async (location) => {
    try {
        await driver.findElement({ id: 'location' }).clear();
        await driver.findElement({ id: 'location' }).sendKeys(location);
    } catch (err) { throw err }
}

exports.enter_radius = async (radius) => {
    try {
        await driver.findElement({ id: 'LocationType' }).sendKeys(radius);
    } catch (err) { throw err }
}