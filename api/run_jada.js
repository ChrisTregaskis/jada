const WebDriver = require('selenium-webdriver');
const driver = new WebDriver.Builder().forBrowser('chrome').build();

async function run_jada(jobTitle, area, radius) {
    const emailLogIn = 'chris.tregaskis.work@gmail.com';
    const passwordLogIn = 'gSpJ2biL$XDHwEQ';

    await navigate_to_website();
    let loginOption = await check_login_option_exists();
    if (!loginOption) { return console.log('SESSION FAILED: Jobseeker xpath text content does not match \'Jobseeker login\'') }


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

// need to check that radius is only 0, 5, 10, 20, 30
run_jada('software developer', 'Bath', 20)

// fun fun functions

async function navigate_to_website() {
    const url = 'https://www.totaljobs.com/';
    await driver.get(url);
    driver.getTitle()
        .then(title => {
            if (title === 'Jobs | UK Job Search | Find your perfect job - totaljobs') {
                console.log(`successfully navigated to ${url}`);
            } else {
                console.log('page title does not match expected url page title')
            }
    })
        .catch(err => {
            console.log(err)
        });
}

async function check_login_option_exists() {
    let jobSeekerLogIn = await driver.findElement({ xpath: '//*[@id="jobseekerList"]/li[1]/a' }).getText();
    if (jobSeekerLogIn !== 'Jobseeker login') {
        return false;
    } else {
        return true;
    }
}

