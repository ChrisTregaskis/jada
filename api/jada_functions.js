const mongoose = require('mongoose');
const fetch = require('node-fetch');
const nodeMailer = require('nodemailer');
const WebDriver = require('selenium-webdriver');
const driver = new WebDriver.Builder().forBrowser('chrome').build();

exports.navigate_to_website = async function() {
    driver.get(`https://www.totaljobs.com/jobs/junior-developer/in-bristol?radius=5&s=header`)
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

exports.check_interest = async function(potentialJobs, dkw, udkw, session_id, session_date, session_time) {
    console.log('-------> checking job initial interest: <-------')
    let interestedRoles = [];
    let viewedResults = await get_applied_jobIds();
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
        'GULP', 'GRADUATE', 'JUNIOR'];

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

async function check_processed_ids(previouslyAppliedJobs, jobId) {
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

    // add handle for stale depricated issue that stops code from running. - UnhandledPromiseRejectionWarning
    let jobTitle = await driver.findElement({ css: '.job-content-top h1' }).getText();
    let salary = await driver.findElement({ css: '.salary div' }).getText();
    let company = await driver.findElement({ css: '.company div a' }).getText();
    let jobType = await driver.findElement({ css: '.job-type div' }).getText(); //sometimes doesn't appear on page... handle if its not there!
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

    let dkwFoundUnique = remove_duplicates(dkwFoundAll)
    let udkwFoundUnique = remove_duplicates(udkwFoundAll)
    let top24FoundUnique = remove_duplicates(top24FoundAll)

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

async function add_application_db(application) {
    return responseData = await handle_fetch(
        'http://localhost:8080/applications',
        'POST',
        application
    )
}

async function handle_fetch(url, requestMethod, dataToSend) {
    let requestData = JSON.stringify(dataToSend);
    let response = await fetch(url, {
        method: requestMethod,
        body: requestData,
        headers: {
            "Content-Type" : "application/json"
        }
    })

    let responseData = await response.json();

    if (responseData.status === 404) {
        console.log(`Response status: ${responseData.status}`);
        console.log(`Response message: ${responseData.message}`);
    } else if (responseData.status === 500) {
        console.log('SESSION ERROR: handle fetch unsuccessful');
        console.log(`Response status: ${responseData.status}`);
        console.log(`Response message: ${responseData.message}`);
    }
    return responseData
}

async function log_failed_interest(session_id, session_date, session_time, jobId, jobTitle, keyWordFinder) {
    let currentApplication = {
        "session_id": session_id,
        "session_date": session_date,
        "session_time": session_time,
        "job_title": jobTitle,
        "totalJobs_id": jobId,
        "apply_attempted": false,
        "interested": false,
        "found_dkw": keyWordFinder.found_dkw,
        "found_udkw": keyWordFinder.found_udkw,
        "found_top24": keyWordFinder.found_top24
    }
    let logApplication = await add_application_db(currentApplication);
    console.log(logApplication)
    if (logApplication.status !== 200) {
        console.log(`SESSION ERROR: unable to log job id: ${jobId}`)
    }
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
        "job_url": jobAdd.job_url,
        "found_dkw": keyWordFinder.found_dkw,
        "found_udkw": keyWordFinder.found_udkw,
        "found_top24": keyWordFinder.found_top24
    }
    let logApplication = await add_application_db(currentApplication);
    console.log(logApplication)
    if (logApplication.status !== 200) {
        console.log(`SESSION ERROR: unable to log job id: ${jobAdd.totalJobs_id}`)
    }
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
    let logApplication = await add_application_db(currentApplication);
    console.log(logApplication)
    if (logApplication.status !== 200) {
        console.log(`SESSION ERROR: unable to log job id: ${jobAdd.totalJobs_id}`)
    }
}

async function process_jobAdd(jobId, previouslyAppliedJobs, dkw, udkw, session_id, session_date, session_time) {
    console.log('************************************************');
    let mainWindow = await driver.getWindowHandle();
    let appliedJob = false;

    // make sure jobId exists on page.
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
    let alreadyApplied = await check_processed_ids(previouslyAppliedJobs, jobId);
    if (alreadyApplied) {
        console.log(`Job already processed: ${alreadyApplied}`);
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

async function get_all_applications() {
    console.log('Grabbing all applications...')
    let response = await fetch('http://localhost:8080/applications', {
        method: 'GET',
        headers: {
            "Content-Type" : "application/json"
        }
    })

    let responseData = await response.json();

    if (responseData.status === 404) {
        console.log(`Response status: ${responseData.status}`);
        console.log(`Response message: ${responseData.message}`);
        return [];
    } else if (responseData.status === 500) {
        console.log('SESSION ERROR: handle fetch unsuccessful');
        console.log(`Response status: ${responseData.status}`);
        console.log(`Response message: ${responseData.message}`);
    }

    let applications = await responseData.response.applications;
    return applications
}

async function get_applied_jobIds() {
    let applications = await get_all_applications();
    let processedIds = applications.map(application => {
        return application.totalJobs_id
    })
    console.log('Job ids successfully loaded...')
    console.log('Job id count: ')
    console.log(processedIds.length)
    return processedIds
}

exports.process_interested_jobs = async function(interestedJobIds, dkw, udkw, session_id, session_date, session_time) {
    console.log('--------> processing interested jobs: <--------')
    let appliedJobs = [];
    let previouslyAppliedJobs = await get_applied_jobIds();

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

exports.check_nextBtn_status = async function() {
    let nextBtnElement = await driver.findElement({ css: '.pagination .next' });
    let nextBtnClasses = await nextBtnElement.getAttribute('class');
    let explodedBtnClasses = nextBtnClasses.split(" ");
    let disabledNextBtn = explodedBtnClasses.includes('disabled')

    if (!disabledNextBtn) {
        return true
    } else {
        return false
    }
}

exports.next_results_page = async function() {
    let nextBtnElement = await driver.findElement({ css: '.pagination .next' }).click();
    let resultsPage = await driver.wait(WebDriver.until.elementLocated({ xpath: '//*[@id="scroll-to-top"]'}), 4000);
    if (resultsPage) {
        console.log('************************************************')
        console.log('************************************************')
        console.log('Successfully reached next results page');
        return true;
    } else {
        return false;
    }
}

async function get_by_sessionId(sessionId) {
    console.log('Grabbing all applications by session_id...')
    let response = await fetch(`http://localhost:8080/applications/session/${sessionId}`, {
        method: 'GET',
        headers: {
            "Content-Type" : "application/json"
        }
    })

    let responseData = await response.json();
    if (responseData.status === 404) {
        console.log(`Response status: ${responseData.status}`);
        console.log(`Response message: ${responseData.message}`);
        return [];
    } else if (responseData.status === 500) {
        console.log('SESSION ERROR: handle fetch unsuccessful');
        console.log(`Response status: ${responseData.status}`);
        console.log(`Response message: ${responseData.message}`);
    }

    let applications = await responseData.response.applications;
    return applications
}

function map_dkw(applications) {
    let dkw = [];
    applications.forEach(application => {
        dkw.push(...application.found_dkw)
    });
    return dkw
}

function map_udkw(applications) {
    let udkw = [];
    applications.forEach(application => {
        udkw.push(...application.found_udkw)
    });
    return udkw
}

function map_top24(applications) {
    let top24 = [];
    applications.forEach(application => {
        top24.push(...application.found_top24)
    });
    return top24
}

function map_locations(applications) {
    let locations = [];
    applications.forEach(application => {
        if (application.location !== undefined) {
            let toUpperCaseLocation = application.location.toUpperCase();
            let location = toUpperCaseLocation.split(/[^a-zA-Z\d:]/);

            if (location.includes('BRISTOL') === true) {
                locations.push('BRISTOL')
            } else if (location.includes('BATH') === true) {
                locations.push('BATH')
            } else {
                locations.push(location[0])
            }
        }
    });
    return locations
}

function remove_duplicates(array) {
    return array.reduce((unique, item) =>
        unique.includes(item) ? unique : [...unique, item],[]);
}

exports.produce_session_report = async function(session_id, session_date, session_time, allSessionJobIds) {
    let applications = await get_by_sessionId(session_id)
    let successfullyApplied = applications.filter((application) => {
        if (application.apply_attempted === true) {
            return application
        }
    });

    let skippedApplications = applications.filter((application) => {
        if (application.apply_attempted === false) {
            return application
        }
    })

    let dkwFoundAll = map_dkw(applications);
    let udkwFoundAll = map_udkw(applications);
    let top24FoundAll = map_top24(applications);
    let locationsAll = map_locations(applications);

    let dkwFoundUnique = remove_duplicates(dkwFoundAll);
    let udkwFoundUnique = remove_duplicates(udkwFoundAll);
    let top24FoundUnique = remove_duplicates(top24FoundAll);
    let locationsOverview = remove_duplicates(locationsAll);

    let sessionReport = {
        "session_id": session_id,
        "session_date": session_date,
        "session_time": session_time,
        "total_processed": allSessionJobIds.length,
        "newly_processed": applications.length,
        "successfully_applied": successfullyApplied.length,
        "skipped_applications": skippedApplications.length,
        "dkw_overview": dkwFoundUnique,
        "dkw_all": dkwFoundAll,
        "udkw_overview":udkwFoundUnique,
        "udkw_all": udkwFoundAll,
        "top24_overview": top24FoundUnique,
        "top24_all": top24FoundAll,
        "locations_overview": locationsOverview,
        "locations_all" : locationsAll
    }

    return sessionReport
}

exports.save_session = async function(sessionReport) {
    let responseData = await handle_fetch(
        'http://localhost:8080/sessions',
        'POST',
        sessionReport
    )

    if (responseData.status !== 200) {
        console.log(`SESSION ERROR: unable to log job id: ${sessionReport.session_id}`)
        return false
    } else if (responseData.status === 200) {
        console.log('Successfully logged session report...')
        console.log(sessionReport)
        return true
    }
}

function count_key_word(keyWord, array) {
    return array.filter(word => word === keyWord)
}

function display_email_keyWords(kwOverview, kwAll) {
    let kwOverviewCount = [];
    let kwOverviewHtmlStringArr = [];
    let kwFoundUpToTwice = [];
    let kwToDiscard = ['DEVELOPER', 'SOFTWARE', 'ENGINEER', 'ENGINEERING'];

    kwOverview.forEach(keyWord => {
        kwOverviewCount.push(count_key_word(keyWord, kwAll).length)
    })

    for (i = 0; i < kwOverview.length; i++) {
        if (kwToDiscard.includes(kwOverview[i]) === false) {
            if (kwOverviewCount[i] <= 2) {
                kwFoundUpToTwice.push(kwOverview[i].toLowerCase())
            } else {
                kwOverviewHtmlStringArr.push(`
            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border:0;border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;width:100%">
                <tr>
                    <td width="15%" style="border-right:1px solid #c3c8c9; color:#000000;direction:ltr;font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:14px;line-height:28px;padding-top:20px;vertical-align:top; text-align:right; padding-right:5px; min-width:55px;" valign="top" class="label" >${kwOverview[i].toLowerCase()}</td>
                    <td width="85%" style="direction:ltr;vertical-align:top" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" align="left" style="border:0;border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;table-layout:fixed;width:100%">
                            <tr>
                                <td align="left" style="direction:ltr">
                                    <table style="border:0;border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;width:${50 + (kwOverviewCount[i] * 10)}px" class="bar"> 
                                        <tr>
                                            <td align="left" style="direction:ltr;padding-bottom:15px;padding-left:0;padding-top:15px">
                                                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#17a2b8; border:0;border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;width:100%" bgcolor="#17a2b8">
                                                    <tr>
                                                        <td height="40" style="font-size:0;line-height:0;">&nbsp;</td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td width="40" align="left" style="color:#717172;direction:ltr;font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:14px;line-height:28px;padding-left:8px;padding-top:20px;text-align:left;vertical-align:top;max-width:40px;" valign="top" class="label" >${kwOverviewCount[i]}</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `)
            }
        }
    }

    let kwOverviewHtmlString = kwOverviewHtmlStringArr.join(" ")
    let kwFoundUpToTwiceHtmlString = kwFoundUpToTwice.join(", ")


    return `
        <p>Key words found max 2 times: ${kwFoundUpToTwiceHtmlString}</p>
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border: none; border-collapse: collapse; border-spacing: 0; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;">
            <tr>
                <td align="left" style="direction: ltr;">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border: none; border-collapse: collapse; border-spacing: 0; max-width: 800px; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;">
                        <tr>
                            <td align="center" style="direction: ltr;">
                                <table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" class="" style="border: none; border-collapse: collapse; border-spacing: 0; mso-table-lspace: 0; mso-table-rspace: 0; table-layout: fixed; width: 100%;">
                                    <tr>
                                        <td style="direction: ltr;">
                                            <!-- mapped results -->
                                            ${kwOverviewHtmlString}
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    `
}

exports.email_session_report = async function(sessionReport) {
    let date = sessionReport.session_date;
    let time = sessionReport.session_time;
    let sessionId = sessionReport.session_id;
    let totalProcessed = sessionReport.total_processed;
    let newlyProcessed = sessionReport.newly_processed;
    let successfullyApplied = sessionReport.successfully_applied;
    let skippedApplications = sessionReport.skipped_applications;
    let dkwOverview = sessionReport.dkw_overview;
    let dkwAll = sessionReport.dkw_all;
    let udkwOverview = sessionReport.udkw_overview;
    let udkwAll = sessionReport.udkw_all;
    let top24Overview = sessionReport.top24_overview;
    let top24All = sessionReport.top24_all;
    let locationOverview = sessionReport.locations_overview;
    let locationAll = sessionReport.locations_all;

    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'chris.tregaskis.work@gmail.com',
            pass: 'Romans 12.1-2'
        }
    });

    let mailOptions = {
        from: 'chris.tregaskis.work@gmail.com',
        to: 'chris.tregaskis.work@gmail.com',
        subject: `Jada session report! ${date}`,
        html: `
            <h1>Jada Session Report: ${date} @ ${time}</h1>
            <br>
            <h3>Yo Chris, here is your session report...</h3>
            <p>Session Id: ${sessionId}</p>
            <p>Session date: ${date}</p>
            <p>Session time: ${time}</p>
            <p>Session total processed: ${totalProcessed}</p>
            <p>Session newly processed: ${newlyProcessed}</p>
            <p>Session successfully applied: ${successfullyApplied}</p>
            <p>Session skipped applications: ${skippedApplications}</p>
            
            <h3>Desired Key Words Overview:</h3>
            ${display_email_keyWords(dkwOverview, dkwAll)}
            <br>
            <h3>Undesired Key Words Overview:</h3>
            ${display_email_keyWords(udkwOverview, udkwAll)}
            <br>
            <h3>Top 24 Programing Languages Overview:</h3>
            ${display_email_keyWords(top24Overview, top24All)}
            <br>
            <h3>Locations Found Overview:</h3>
            ${display_email_keyWords(locationOverview, locationAll)}

        `
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            //return false
        } else {
            console.log(`EMAIL SENT: ${info.response}`)
            //return true
        }
    })
}

