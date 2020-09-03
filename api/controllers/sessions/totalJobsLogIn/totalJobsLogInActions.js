const aesjs = require('aes-js');
const voltPackage = require('../../../volt');
const volt = voltPackage.open_volt();
const WebDriver = require('selenium-webdriver');
const localWebDriver = require('../webDriver');
const driver = localWebDriver.get_driver()

exports.navigate_to_website = async function() {
    const url = 'https://www.totaljobs.com/';
    await driver.get(url);
    driver.getTitle()
        .then(title => {
            return title === 'Jobs | UK Job Search | Find your perfect job - totaljobs';
        })
        .catch(err => { return err });
};

exports.navigate_to_loginPage = async function() {
    try {
        await driver.findElement({ xpath: '//*[@id="jobseekerList"]/li[1]/a' }).click();
        await driver.wait(WebDriver.until.elementLocated({ id: 'btnLogin' }), 20000);
    } catch (err) { throw err }
};

exports.jobSeeker_login = async function(emailLogIn, passwordLogIn) {
    const encryptedBytes = aesjs.utils.hex.toBytes(passwordLogIn);
    const aesCtr = new aesjs.ModeOfOperation.ctr(volt.AES_KEY, new aesjs.Counter(5));
    const decryptedBytes = aesCtr.decrypt(encryptedBytes);
    const pass = aesjs.utils.utf8.fromBytes(decryptedBytes);
    try {
        await driver.findElement({ id: 'Form_Email' }).sendKeys(emailLogIn);
        await driver.findElement({ id: 'Form_Password' }).sendKeys(pass);
        await driver.findElement({ id: 'Form_RememberMe' }).click();
        await driver.findElement({ id: 'btnLogin' }).click();
        await driver.wait(WebDriver.until.elementLocated({ id: 'search-button' }), 20000);
    } catch (err) { throw err }
};