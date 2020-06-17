const WebDriver = require('selenium-webdriver');
const driver = new WebDriver.Builder().forBrowser('chrome').build();
const jobTitle = 'software developer';
const area = 'Bath';
const radius = 30;

run_jada(jobTitle, area, radius);

// procedural JADA function
async function run_jada(jobTitle, area, radius) {
    const radiusOptions = [0, 5, 10, 20, 30];
    let radiusValid = radiusOptions.includes(radius);
    if (!radiusValid) { return console.log('SESSION FAILED: invalid radius option') }

    await navigate_to_website();
    let navigateToLogin = await navigate_to_loginPage();
    if (!navigateToLogin) { return console.log('SESSION FAILED: navigate to login page failed') }

    let login = await jobSeeker_login();
    if (!login) { return console.log('SESSION FAILED: logged in user search button not found') }

    let enteredSearch = enter_search(jobTitle, area, radius);
    if (!enteredSearch) { return console.log('SESSION FAILED: first xpath result not found') }
}

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

async function navigate_to_loginPage() {
    let jobSeekerLogIn = await driver.findElement({ xpath: '//*[@id="jobseekerList"]/li[1]/a' }).getText();
    if (jobSeekerLogIn !== 'Jobseeker login') {
        console.log('SESSION FAILED: Jobseeker xpath text content does not match \'Jobseeker login\'')
        return false
    }

    await driver.findElement({ xpath: '//*[@id="jobseekerList"]/li[1]/a' }).click();
    let loginPage = await driver.wait(WebDriver.until.elementLocated({ id: 'btnLogin' }), 2000);
    if (loginPage) {
        console.log('successfully reached login page');
        return true
    } else {
        console.log('SESSION FAILED: navigate to login page failed')
        return false;
    }
}

async function jobSeeker_login() {
    const emailLogIn = 'chris.tregaskis.work@gmail.com';
    const passwordLogIn = 'gSpJ2biL$XDHwEQ';

    await driver.findElement({ id: 'Form_Email' }).sendKeys(emailLogIn);
    await driver.findElement({ id: 'Form_Password' }).sendKeys(passwordLogIn);
    await driver.findElement({ id: 'Form_RememberMe' }).click();
    console.log('successfully entered login information');
    await driver.findElement({ id: 'btnLogin' }).click();

    let searchPage = await driver.wait(WebDriver.until.elementLocated({ id: 'search-button' }), 2000);
    if (searchPage) {
        console.log('successfully reached search page');
        return true
    } else {
        return false
    }
}

async function enter_search(jobTitle, area, radius) {
    await driver.findElement({ id: 'keywords' }).sendKeys(jobTitle);
    await driver.findElement({ id: 'location' }).sendKeys(area);
    await driver.findElement({ id: 'LocationType' }).sendKeys(radius);
    console.log('successfully entered job search parameters')
    await driver.findElement({ id: 'search-button' }).click();

    let resultsPage = await driver.wait(WebDriver.until.elementLocated({ xpath: '//*[@id="90250477"]/div/div/div[1]/a'}), 2000);
    if (resultsPage) {
        console.log('successfully reached results page');
        return true;
    } else {
        return false;
    }
}