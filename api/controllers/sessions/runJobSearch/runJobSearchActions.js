const WebDriver = require('selenium-webdriver');
const localWebDriver = require('../webDriver');
const driver = localWebDriver.get_driver();

exports.valid_url = async () => {
    let title = await driver.getTitle();
    return title === 'Jobs | UK Job Search | Find your perfect job - totaljobs';
}

exports.enter_job_title = async (jobTitle) => {
    try {
        await driver.findElement({ id: 'keywords' }).clear();
        await driver.findElement({ id: 'keywords' }).sendKeys(jobTitle);
    } catch (err) {
        console.log(err)
        throw err
    }
}

exports.enter_location = async (location) => {
    try {
        await driver.findElement({ id: 'location' }).clear();
        await driver.findElement({ id: 'location' }).sendKeys(location);
    } catch (err) {
        console.log(err)
        throw err
    }
}

exports.enter_radius = async (radius) => {
    try {
        await driver.findElement({ id: 'LocationType' }).sendKeys(radius);
    } catch (err) {
        console.log(err)
        throw err
    }
}

exports.click_search = async () => {
    try {
        await driver.findElement({ id: 'search-button' }).click();
        await driver.wait(WebDriver.until.elementLocated({
            xpath: '//*[@id="scroll-to-top"]'
        }), 20000);
    } catch (err) {
        console.log(err)
        throw err
    }
}