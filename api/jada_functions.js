const mongoose = require('mongoose');
const WebDriver = require('selenium-webdriver');
const driver = new WebDriver.Builder().forBrowser('chrome').build();

exports.navigate_to_website = async function() {
    driver.get(`https://www.totaljobs.com/jobs/software-engineer/in-bath?radius=20&s=header`)
    // const url = 'https://www.totaljobs.com/';
    // await driver.get(url);
    // driver.getTitle()
    //     .then(title => {
    //         if (title === 'Jobs | UK Job Search | Find your perfect job - totaljobs') {
    //             console.log(`successfully navigated to ${url}`);
    //         } else {
    //             console.log('page title does not match expected url page title')
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     });
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
        if (currentJobId.length > 0) {
            additionalJobs.push(currentJobId);
        }
    }
    return additionalJobs;
}

async function isInterested(jobId, dkw, udkw) {
    let jobTitle = await driver.findElement({ xpath: '//*[@id="' + jobId + '"]/div/div/div[1]/a/h2'}).getText();
    let jobTitleWebElement = await driver.findElement({ xpath: '//*[@id="' + jobId + '"]'});
    let jobTitleClasses = await jobTitleWebElement.getAttribute('class');

    let jobTitleUpperCase = jobTitle.toUpperCase();
    let explodedJTClasses = jobTitleClasses.split(" ");
    let explodedJobTitle = jobTitleUpperCase.split(/[^a-zA-Z\d\#\++:]/);

    let isDesirable = dkw.some(r => explodedJobTitle.indexOf(r) >= 0)
    let isNotDesirable = udkw.some(r => explodedJobTitle.indexOf(r) >= 0)
    let alreadyApplied = explodedJTClasses.includes('applied')
    console.log(`Already applied: ${alreadyApplied}`)
    console.log(`Includes DKW: ${isDesirable}`)
    console.log(`Includes UDKW: ${isNotDesirable}`)

    // populate found_dkw, found_udkw, found_top24 in current_application obj
    let explodedJD_top24 = jobTitleUpperCase.split(/[^a-zA-Z\d\#\++:]/);
    let top24FoundAll = explodedJD_top24.filter(check_top24);
    let top24FoundUnique = top24FoundAll.reduce((unique, item) =>
        unique.includes(item) ? unique : [...unique, item],[]);
    let explodedJD_dkw = jobTitleUpperCase.split(/[^a-zA-Z\d\#\++:]/);
    let explodedJD_udkw = jobTitleUpperCase.split(/[^a-zA-Z\d\#\++:]/);
    let dkwFoundAll = explodedJD_dkw.filter(check_dkw);
    let dkwFoundUnique = dkwFoundAll.reduce((unique, item) =>
        unique.includes(item) ? unique : [...unique, item],[]);
    let udkwFoundAll = explodedJD_udkw.filter(check_udkw);
    let udkwFoundUnique = udkwFoundAll.reduce((unique, item) =>
        unique.includes(item) ? unique : [...unique, item], []);

    let current_application = {
        "job_title": jobTitle,
        "totalJobs_id": jobId,
        "apply_attempted": false,
        "interested": false,
        "db_id": mongoose.Types.ObjectId(),
        "found_dkw": dkwFoundUnique,
        "found_udkw": udkwFoundUnique,
        "found_top24": top24FoundUnique
    }

    if (isDesirable && !isNotDesirable && !alreadyApplied) {
        return true
    } else {
        console.log(current_application)
        return false
    }
}

exports.check_interest = async function(potentialJobs, viewedResults, dkw, udkw) {
    console.log('-------> checking job initial interest: <-------')
    let interestedRoles = [];
    for (i = 0; i < potentialJobs.length; i++) {
        let hasBeenViewed = viewedResults.includes(potentialJobs[i]);
        console.log('------------------------------------------------')
        console.log(`Current job id: ${potentialJobs[i]}`)
        console.log(`Has been viewed: ${hasBeenViewed}`)
        if (!hasBeenViewed) {
            let interested = await isInterested(potentialJobs[i], dkw, udkw)
            console.log('/---- Interested: ')
            console.log(interested)
            if (interested) {
                interestedRoles.push(potentialJobs[i])
            }
        }
    }
    return interestedRoles;
}

function check_dkw(item) {
    const dkw = ['SOFTWARE', 'ENGINEER', 'ENGINEERING', 'DEVELOPER', 'GIT', 'BASH', 'NODE', 'AGILE', 'NODEJS',
        'BACKEND', 'FRONTEND', 'PHP', 'OOP', 'JS', 'JAVASCRIPT', 'HTML', 'CSS', 'MYSQL', 'MONGODB', 'RESTFUL', 'API',
        'GULP'];

    let itemCheck = dkw.includes(item)
    if (itemCheck) {
        return item
    }
}

function check_udkw(item) {
    const udkw = ['TRAINEESHIP', 'NET', 'TRAINEE', 'CONSULTANT', 'UX', 'DESIGNER', 'SALES', 'LEAD', 'WINDOWS'];

    let itemCheck = udkw.includes(item)
    if (itemCheck) {
        return item
    }
}

function check_top24(item) {
    const top24ProgLang = ['JAVASCRIPT', 'NODE', 'NODEJS', 'REACT', 'PYTHON', 'HTML', 'CSS', 'C++', 'TYPESCRIPT',
        'RUST', 'SCHEME', 'JAVA', 'KOTLIN', 'C#', 'PERL', 'PHP', 'SCALA', 'SWIFT', 'MATLAB', 'SQL', 'R', 'GOLANG', 'GO',
        'RUBY', 'BASH', 'C', 'NET', 'ASSEMBLY'];

    let itemCheck = top24ProgLang.includes(item)
    if (itemCheck) {
        return item
    }
}

async function process_jobAdd(jobId, previouslyAppliedJobs, dkw, udkw) {
    console.log('************************************************')
    let mainWindow = await driver.getWindowHandle();

    // make sure jobId exists on page
    let jobIdElement = await driver.findElements({ xpath: '//*[@id="' + jobId + '"]/div/div/div[1]/a' });
    if (jobIdElement.length <= 0) {
        console.log('SESSION ERROR: jobId not located')
        return false
    }

    let jobElement = await driver.findElement({ xpath: '//*[@id="' + jobId + '"]/div/div/div[1]/a'});
    let jobAddUrl = await jobElement.getAttribute('href');
    console.log(jobAddUrl)

    // open a new tab and go to current id job post
    await driver.switchTo().newWindow('tab')
    await driver.get(jobAddUrl)
    let resultPage = await driver.wait(WebDriver.until.elementLocated({ css: '.salary div'}), 2000);
    if (!resultPage) {
        console.log('SESSION ERROR: result page not loaded, salary information not found');
        await driver.close();
        let backToMainWindow = await driver.switchTo().window(mainWindow)
        return false;
    }

    // check jobId against previously applied
    let alreadyApplied = previouslyAppliedJobs.includes(jobId)
    if (alreadyApplied) {
        console.log(`Already applied: ${alreadyApplied}`)
        await driver.close();
        let backToMainWindow = await driver.switchTo().window(mainWindow)
        return false;
    }

    // check DKW, UDKW and top24ProgLang.
    let jobTitle = await driver.findElement({ css: '.job-content-top h1' }).getText();
    let jobDescription = await driver.findElement({ className: 'job-description' }).getText();
    let toUpperCaseJD =jobDescription.toUpperCase();
    let explodedJD = toUpperCaseJD.split(/[^a-zA-Z\d\#\++:]/);
    let isDesirable = dkw.some(r => explodedJD.indexOf(r) >= 0);
    let isNotDesirable = udkw.some(r => explodedJD.indexOf(r) >= 0);
    console.log(`Includes DKW: ${isDesirable}`)
    console.log(`Includes UDKW: ${isNotDesirable}`)

    let explodedJD_top24 = toUpperCaseJD.split(/[^a-zA-Z\d\#\++:]/);
    let top24FoundAll = explodedJD_top24.filter(check_top24);
    let top24FoundUnique = top24FoundAll.reduce((unique, item) =>
        unique.includes(item) ? unique : [...unique, item],[]);

    // Capture each key word thats found, save in array and add to current application obj
    let explodedJD_dkw = toUpperCaseJD.split(/[^a-zA-Z\d\#\++:]/);
    let explodedJD_udkw = toUpperCaseJD.split(/[^a-zA-Z\d\#\++:]/);
    let dkwFoundAll = explodedJD_dkw.filter(check_dkw);
    let dkwFoundUnique = dkwFoundAll.reduce((unique, item) =>
        unique.includes(item) ? unique : [...unique, item],[]);
    let udkwFoundAll = explodedJD_udkw.filter(check_udkw);
    let udkwFoundUnique = udkwFoundAll.reduce((unique, item) =>
        unique.includes(item) ? unique : [...unique, item], []);

    if (!isDesirable || isNotDesirable) {
        let currentApplication = {
            "job_title": jobTitle,
            "totalJobs_id": jobId,
            "apply_attempted": false,
            "db_id": mongoose.Types.ObjectId(),
            "found_dkw": dkwFoundUnique,
            "found_udkw": udkwFoundUnique,
            "found_top24": top24FoundUnique
        }
        console.log(currentApplication)
        // add currentApplication to db
        await driver.close();
        let backToMainWindow = await driver.switchTo().window(mainWindow)
        return false
    }

    // create and add to DB current application
    let location;
    let locationSyntax_1 = await driver.findElements({ css: '.travelTime-locationText ul li a' });
    let locationSyntax_2 = await driver.findElements({ css: '.travelTime-locationText ul li' });
    let locationSyntax_3 = await driver.findElements({ css: '.location div' });

    if (locationSyntax_1.length > 0) {
        location = await driver.findElement({ css: '.travelTime-locationText ul li a' }).getText();
    } else if (locationSyntax_2.length > 0) {
        location = await driver.findElement({ css: '.travelTime-locationText ul li' }).getText();
    } else if (locationSyntax_3.length > 0) {
        location = await driver.findElement({ css: '.location div' }).getText();
    } else {
        console.log('SESSION ERROR: location path not found')
    }

    let contactInitial = await driver.findElement({ css: '.contact-reference li'}).getText();
    let contactSplit = contactInitial.split(" ");
    let contactShift = contactSplit.shift();
    let contact = contactSplit.join(" ");

    let salary = await driver.findElement({ css: '.salary div' }).getText();
    let company = await driver.findElement({ css: '.company div a' }).getText();
    let jobType = await driver.findElement({ css: '.job-type div' }).getText();
    let jobPosted = await driver.findElement({ css: '.date-posted div span'}).getText();
    let totalJobsRef = await driver.findElement({ css: '.contact-reference li:nth-child(2)'}).getText();

    let currentApplication = {
        "job_title": jobTitle,
        "totalJobs_id": jobId,
        "apply_attempted": true,
        "salary": salary,
        "company": company,
        "job_type": jobType,
        "job_posted": jobPosted,
        "location": location,
        "job_url": jobAddUrl,
        "job_contact": contact,
        "totalJobs_ref": totalJobsRef,
        "db_id": mongoose.Types.ObjectId(),
        "found_dkw": dkwFoundUnique,
        "found_udkw": udkwFoundUnique,
        "found_top24": top24FoundUnique
    }
    console.log(currentApplication)

    // add currentApplication to db

    await driver.close();
    let backToMainWindow = await driver.switchTo().window(mainWindow)

    if (jobElement) {
        return true
    } else {
        return false
    }
}

async function get_applied_jobIds() {
    //this function will grab all ids from db and return them in an array
    return ['90265955', '90264496']
}

exports.process_interested_jobs = async function(interestedJobIds, dkw, udkw) {
    console.log('--------> processing interested jobs: <--------')
    let appliedJobs = [];
    let previouslyAppliedJobs = await get_applied_jobIds()

    for (i = 0; i < interestedJobIds.length; i++) {
        console.log('------------------------------------------------')
        let appliedJob = await process_jobAdd(interestedJobIds[i], previouslyAppliedJobs, dkw, udkw)
        console.log('/---- applied job: ')
        console.log(appliedJob)
        if (appliedJob) {
            appliedJobs.push(interestedJobIds[i])
        }
    }

    return appliedJobs;
}

exports.test = async function() {

}
