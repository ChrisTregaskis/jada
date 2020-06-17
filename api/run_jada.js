const WebDriver = require('selenium-webdriver');
const driver = new WebDriver.Builder().forBrowser('chrome').build();

async function seleniumGoogleTest() {
    await driver.get('http://google.com');
    await driver.findElement({ name: 'q' }).sendKeys('Sherry Espineli');
    await driver.findElement({ name: 'q' }).sendKeys(WebDriver.Key.ENTER);
    let firstResult = await driver.wait(WebDriver.until.elementLocated({ xpath: '//*[@id="rso"]/div[1]/div/div[1]/a' }), 2000);

    if (firstResult) {
        console.log('success')
        await driver.findElement({ xpath: '//*[@id="rso"]/div[1]/div/div[1]/a' }).click();
        driver.getTitle().then((title) => { console.log(title) }).catch((err) => { console.log(err) });
    } else {
        console.log('failure')
    }
}

// seleniumGoogleTest();

async function run_jada(jobTitle, area, radius) {
    const emailLogIn = 'chris.tregaskis.work@gmail.com';
    const passwordLogIn = 'gSpJ2biL$XDHwEQ';

    await driver.get('https://www.totaljobs.com/');
    console.log('successfully navigated to https://www.totaljobs.com/');
    let jobSeekerLogIn = await driver.findElement({ xpath: '//*[@id="jobseekerList"]/li[1]/a' }).getText();

    if (jobSeekerLogIn !== 'Jobseeker login') {
        return console.log('Jobseeker xpath text content does not match \'Jobseeker login\'');
    }

    await driver.findElement({ xpath: '//*[@id="jobseekerList"]/li[1]/a' }).click();
    let loginPageActive = await driver.wait(WebDriver.until.elementLocated({ id: 'btnLogin' }), 2000);

    if (loginPageActive) {
        console.log('successfully reached login page');
    } else {
        return console.log('login button not found');
    }

    let loginPageTitle = await driver.getTitle();
    if (loginPageTitle !== 'Totaljobs Sign in or Register') {
        return console.log('Login page title does not match \'Totaljobs Sign in or Register\'');
    }

    await driver.findElement(WebDriver.By.id('Form_Email')).sendKeys(emailLogIn);
    await driver.findElement({ id: 'Form_Password' }).sendKeys(passwordLogIn);
    await driver.findElement({ id: 'Form_RememberMe' }).click();
    console.log('successfully entered login information');
    await driver.findElement({ id: 'btnLogin' }).click();

    // driver.quit();

}

run_jada('software developer', 'Bath', 5)

// fun fun functions