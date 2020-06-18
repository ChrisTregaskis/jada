const WebDriver = require('selenium-webdriver');
const driver = new WebDriver.Builder().forBrowser('chrome').build();

exports.navigate_to_website = async function() {
    // driver.get(`https://www.totaljobs.com/jobs/software-engineer/in-bath?radius=20&s=header`)
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
};

exports.navigate_to_loginPage = async function() {
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
};

exports.jobSeeker_login = async function() {
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
};

exports.enter_search = async function(jobTitle, area, radius) {
    await driver.findElement({ id: 'keywords' }).sendKeys(jobTitle);
    await driver.findElement({ id: 'location' }).sendKeys(area);
    await driver.findElement({ id: 'LocationType' }).sendKeys(radius);
    console.log('successfully entered job search parameters')
    await driver.findElement({ id: 'search-button' }).click();

    let resultsPage = await driver.wait(WebDriver.until.elementLocated({ xpath: '//*[@id="scroll-to-top"]'}), 2000);
    if (resultsPage) {
        console.log('successfully reached results page');
        return true;
    } else {
        return false;
    }
};

exports.populate_potential_jobs = async function() {
    let additionalJobs = [];
    let jobs = await driver.findElements({ className: 'job' })
    for (i = 0; i < jobs.length; i++) {
        let currentJobWebElement = await jobs[i];
        let currentJobId = await currentJobWebElement.getAttribute('id');
        additionalJobs.push(currentJobId);
    }
    return additionalJobs;
}

// exports.interested = async function(viewedResults, dkw, udkw) {
//
// };

exports.test = async function() {
    let additionalJobs = [];
    let resultsPage = await driver.wait(WebDriver.until.elementLocated({ xpath: '//*[@id="scroll-to-top"]'}), 2000);
    if (resultsPage) {
        console.log('successfully reached results page');
    } else {
        return console.log('SESSION ERROR: scroll top element not found');
    }

    //all job web elements
    let jobs = await driver.findElements({ className: 'job' });
    let job2WE = await jobs[1];
    let job2Id = await job2WE.getAttribute('id');

    //single job web element
    let jobWE = await driver.findElement({ css: '.job' });
    let jobId = await jobWE.getAttribute('id');

    console.log(jobId)
    console.log(job2Id)

    //take jobs arr length and loop through, grabbing each element and awaiting id attribute to add to additional jobs array
    for (i = 0; i < jobs.length; i++) {
        let currentJobWebElement = await jobs[i];
        let currentJobId = await currentJobWebElement.getAttribute('id');
        additionalJobs.push(currentJobId);
    }

    console.log(additionalJobs)
}
