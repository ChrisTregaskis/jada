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
    let loginPage = await driver.wait(WebDriver.until.elementLocated({ id: 'btnLogin' }), 2000);
    if (loginPage) {
        console.log('successfully reached login page');
    } else {
        return console.log('login button not found');
    }

    await driver.findElement({ id: 'Form_Email' }).sendKeys(emailLogIn);
    await driver.findElement({ id: 'Form_Password' }).sendKeys(passwordLogIn);
    await driver.findElement({ id: 'Form_RememberMe' }).click();
    console.log('successfully entered login information');
    await driver.findElement({ id: 'btnLogin' }).click();

    let searchPage = await driver.wait(WebDriver.until.elementLocated({ id: 'search-button' }), 2000);
    if (searchPage) {
        console.log('successfully reached search page');
    } else {
        return console.log('search button not found');
    }

    await driver.findElement({ id: 'keywords' }).sendKeys(jobTitle);
    await driver.findElement({ id: 'location' }).sendKeys(area);
    await driver.findElement({ id: 'LocationType' }).sendKeys(radius);
    console.log('successfully entered job search parameters')
    await driver.findElement({ id: 'search-button' }).click();

    let resultsPage = await driver.wait(WebDriver.until.elementLocated({ xpath: '//*[@id="90250477"]/div/div/div[1]/a'}), 2000);
    if (resultsPage) {
        console.log('successfully reached results page');
    } else {
        return console.log('first result not found');
    }
    

}

run_jada('software developer', 'Bath', 20)

// need to check that radius is only 0, 5, 10, 20, 30

// fun fun functions