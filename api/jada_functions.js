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

async function isInterested(jobId, dkw, udkw, session_id, session_date, session_time) {
    let jobTitle = await driver.findElement({ xpath: '//*[@id="' + jobId + '"]/div/div/div[1]/a/h2'}).getText();
    let jobTitleWebElement = await driver.findElement({ xpath: '//*[@id="' + jobId + '"]'});
    let jobTitleClasses = await jobTitleWebElement.getAttribute('class');

    let explodedJTClasses = jobTitleClasses.split(" ");
    let alreadyApplied = explodedJTClasses.includes('applied')
    console.log(`Already applied: ${alreadyApplied}`)

    let jobTitleUpperCase = jobTitle.toUpperCase();
    let keyWordFinder = key_word_finder(jobTitleUpperCase);

    let jobDesirability = check_desirability(jobTitleUpperCase, dkw, udkw);
    let isDesirable = jobDesirability.is_desirable;
    let isNotDesirable = jobDesirability.is_not_desirable;

    if (isDesirable && !isNotDesirable && !alreadyApplied) {
        return true
    } else {
        let logFailedInterest = await log_failed_interest(session_id, session_date, session_time, jobId, jobTitle, keyWordFinder)
        return false
    }
}

exports.check_interest = async function(potentialJobs, viewedResults, dkw, udkw, session_id, session_date, session_time) {
    console.log('-------> checking job initial interest: <-------')
    let interestedRoles = [];
    for (i = 0; i < potentialJobs.length; i++) {
        let hasBeenViewed = viewedResults.includes(potentialJobs[i]);
        console.log('------------------------------------------------')
        console.log(`Current job id: ${potentialJobs[i]}`)
        console.log(`Has been viewed: ${hasBeenViewed}`)
        if (!hasBeenViewed) {
            let interested = await isInterested(potentialJobs[i], dkw, udkw, session_id, session_date, session_time)
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
    const udkw = ['TRAINEESHIP', 'NET', 'TRAINEE', 'CONSULTANT', 'UX', 'DESIGNER', 'SALES', 'LEAD', 'WINDOWS', 'SENIOR', 'PYTHON'];

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

async function open_result(url) {
    await driver.switchTo().newWindow('tab')
    await driver.get(url)
    let resultPage = await driver.wait(WebDriver.until.elementLocated({ css: '.salary div'}), 4000);
    if (!resultPage) {
        return false;
    } else {
        return true
    }
}

async function check_already_applied(previouslyAppliedJobs, jobId) {
    let alreadyApplied = previouslyAppliedJobs.includes(jobId)
    if (alreadyApplied) {
        return true;
    } else {
        return false
    }
}

async function grab_job_detail(jobId, jobAddUrl) {
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

    let jobTitle = await driver.findElement({ css: '.job-content-top h1' }).getText();
    let salary = await driver.findElement({ css: '.salary div' }).getText();
    let company = await driver.findElement({ css: '.company div a' }).getText();
    let jobType = await driver.findElement({ css: '.job-type div' }).getText();
    let jobPosted = await driver.findElement({ css: '.date-posted div span'}).getText();
    let totalJobsRef = await driver.findElement({ css: '.contact-reference li:nth-child(2)'}).getText();

    return {
        "job_title": jobTitle,
        "totalJobs_id": jobId,
        "salary": salary,
        "company": company,
        "job_type": jobType,
        "job_posted": jobPosted,
        "location": location,
        "job_url": jobAddUrl,
        "job_contact": contact,
        "totalJobs_ref": totalJobsRef,
    }
}

function key_word_finder(upperCaseJobString) {
    let explodedJD_dkw = upperCaseJobString.split(/[^a-zA-Z\d\#\++:]/);
    let explodedJD_udkw = upperCaseJobString.split(/[^a-zA-Z\d\#\++:]/);
    let explodedJD_top24 = upperCaseJobString.split(/[^a-zA-Z\d\#\++:]/);

    let dkwFoundAll = explodedJD_dkw.filter(check_dkw);
    let udkwFoundAll = explodedJD_udkw.filter(check_udkw);
    let top24FoundAll = explodedJD_top24.filter(check_top24);

    let dkwFoundUnique = dkwFoundAll.reduce((unique, item) =>
        unique.includes(item) ? unique : [...unique, item],[]);
    let udkwFoundUnique = udkwFoundAll.reduce((unique, item) =>
        unique.includes(item) ? unique : [...unique, item], []);
    let top24FoundUnique = top24FoundAll.reduce((unique, item) =>
        unique.includes(item) ? unique : [...unique, item],[]);

    return {
        "found_dkw": dkwFoundUnique,
        "found_udkw": udkwFoundUnique,
        "found_top24": top24FoundUnique
    }
}

function check_desirability(upperCaseJobString, dkw, udkw) {
    let explodedJobString = upperCaseJobString.split(/[^a-zA-Z\d\#\++:]/);
    let isDesirable = dkw.some(r => explodedJobString.indexOf(r) >= 0);
    let isNotDesirable = udkw.some(r => explodedJobString.indexOf(r) >= 0);
    console.log(`Includes DKW: ${isDesirable}`)
    console.log(`Includes UDKW: ${isNotDesirable}`)

    return {
        "is_desirable": isDesirable,
        "is_not_desirable": isNotDesirable
    }
}

async function log_failed_interest(session_id, session_date, session_time, jobId, jobTitle, keyWordFinder) {
    let current_application = {
        "session_id": session_id,
        "session_date": session_date,
        "session_time": session_time,
        "job_title": jobTitle,
        "totalJobs_id": jobId,
        "apply_attempted": false,
        "interested": false,
        "db_id": mongoose.Types.ObjectId(),
        "found_dkw": keyWordFinder.found_dkw,
        "found_udkw": keyWordFinder.found_udkw,
        "found_top24": keyWordFinder.found_top24
    }
    console.log(current_application)
    // add currentApplication to db
}

async function log_undesirable_job(session_id, session_date, session_time, jobAdd, keyWordFinder) {
    let currentApplication = {
        "session_id": session_id,
        "session_date": session_date,
        "session_time": session_time,
        "job_title": jobAdd.job_title,
        "totalJobs_id": jobAdd.totalJobs_id,
        "apply_attempted": false,
        "db_id": mongoose.Types.ObjectId(),
        "found_dkw": keyWordFinder.found_dkw,
        "found_udkw": keyWordFinder.found_udkw,
        "found_top24": keyWordFinder.found_top24
    }
    console.log(currentApplication)
    // add currentApplication to db
}

async function log_desirable_job(session_id, session_date, session_time, jobAdd, keyWordFinder) {
    let currentApplication = {
        "session_id": session_id,
        "session_date": session_date,
        "session_time": session_time,
        "job_title": jobAdd.job_title,
        "totalJobs_id": jobAdd.totalJobs_id,
        "apply_attempted": true,
        "salary": jobAdd.salary,
        "company": jobAdd.company,
        "job_type": jobAdd.job_type,
        "job_posted": jobAdd.job_posted,
        "location": jobAdd.location,
        "job_url": jobAdd.job_url,
        "job_contact": jobAdd.job_contact,
        "totalJobs_ref": jobAdd.totalJobs_ref,
        "db_id": mongoose.Types.ObjectId(),
        "found_dkw": keyWordFinder.found_dkw,
        "found_udkw": keyWordFinder.found_udkw,
        "found_top24": keyWordFinder.found_top24
    }
    console.log(currentApplication)
    // add currentApplication to db
}

async function process_jobAdd(jobId, previouslyAppliedJobs, dkw, udkw, session_id, session_date, session_time) {
    console.log('************************************************');
    let mainWindow = await driver.getWindowHandle();
    let appliedJob = false;

    // make sure jobId exists on page. Return false if so or grab url and continue
    let jobIdElement = await driver.findElements({ xpath: '//*[@id="' + jobId + '"]/div/div/div[1]/a' });
    if (jobIdElement.length <= 0) {
        console.log('SESSION ERROR: jobId not located');
        return false
    }

    // open a new tab and go to current id job post
    let jobElement = await driver.findElement({ xpath: '//*[@id="' + jobId + '"]/div/div/div[1]/a'});
    let jobAddUrl = await jobElement.getAttribute('href');
    console.log(jobAddUrl)
    let navigateToResultPage = await open_result(jobAddUrl)
    if (!navigateToResultPage) {
        console.log('SESSION ERROR: result page not loaded, salary information not found');
        await driver.close();
        let backToMainWindow = await driver.switchTo().window(mainWindow)
        return false
    }

    // check jobId against previously applied
    let alreadyApplied = await check_already_applied(previouslyAppliedJobs, jobId);
    if (alreadyApplied) {
        console.log(`Already applied: ${alreadyApplied}`);
        await driver.close();
        let backToMainWindow = await driver.switchTo().window(mainWindow)
        return false
    }

    // grab all jobAdd page detail
    let jobDescription = await driver.findElement({ className: 'job-description' }).getText();
    let toUpperCaseJD = jobDescription.toUpperCase();
    let jobAdd = await grab_job_detail(jobId, jobAddUrl);
    let keyWordFinder = key_word_finder(toUpperCaseJD);

    // check desirability, log and apply accordingly
    let jobDesirability = check_desirability(toUpperCaseJD, dkw, udkw)
    let isDesirable = jobDesirability.is_desirable;
    let isNotDesirable = jobDesirability.is_not_desirable;

    if (isDesirable && !isNotDesirable) {
        let logDesirableJob = await log_desirable_job(session_id, session_date, session_time, jobAdd, keyWordFinder)
        appliedJob = true
    } else {
        let logUndesirableJob = await log_undesirable_job(session_id, session_date, session_time, jobAdd, keyWordFinder);
    }

    await driver.close();
    let backToMainWindow = await driver.switchTo().window(mainWindow);

    return appliedJob;
}

async function get_applied_jobIds() {
    //this function will grab all ids from db and return them in an array
    return ['90265955', '90264496']
}

exports.process_interested_jobs = async function(interestedJobIds, dkw, udkw, session_id, session_date, session_time) {
    console.log('--------> processing interested jobs: <--------')
    let appliedJobs = [];
    let previouslyAppliedJobs = await get_applied_jobIds()

    for (i = 0; i < interestedJobIds.length; i++) {
        console.log('------------------------------------------------')
        let appliedJob = await process_jobAdd(interestedJobIds[i], previouslyAppliedJobs, dkw, udkw, session_id, session_date, session_time)
        console.log('/---- applied job: ')
        console.log(appliedJob)
        if (appliedJob) {
            appliedJobs.push(interestedJobIds[i])
        }
    }

    return appliedJobs;
}

exports.getDate = function(separator) {
    today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if(dd < 10) dd = '0' + dd;
    if(mm < 10) mm = '0' + mm;
    return (yyyy+separator+mm+separator+dd)
}

exports.getTime = function() {
    let today = new Date();
    let hh = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    if(hh < 10) hh = '0' + hh;
    if(min < 10) min = '0' + min;
    if(sec < 10) sec = '0' + sec;
    return time = `${hh}:${min}:${sec}`;
}

exports.test = async function() {

}
