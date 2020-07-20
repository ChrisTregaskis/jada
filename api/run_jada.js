const mongoose = require('mongoose');
const Jada = require('./jada_functions');
const dkw = [
    'SOFTWARE', 'ENGINEER', 'ENGINEERING', 'DEVELOPER',
    'GIT', 'BASH', 'NODE', 'AGILE',
    'NODEJS', 'BACKEND', 'FRONTEND', 'PHP',
    'OOP', 'JS', 'JAVASCRIPT', 'HTML',
    'CSS', 'MYSQL', 'MONGODB', 'RESTFUL',
    'API', 'GULP', 'GRADUATE', 'JUNIOR'
];
const udkw = [
    'TRAINEESHIP', 'NET', 'TRAINEE', 'CONSULTANT',
    'UX', 'DESIGNER', 'SALES', 'LEAD', 'WINDOWS'
];

// BEFORE RUNNING <---> SWITCH FROM TEST BUILD USING CL
const jobTitle = 'Junior Software Engineer';
const area = 'Dorset';
const radius = 30;
const user_id = '5f102df825d2553212c30ede';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QyQHRlc3QuY29tIiwidXNlcklkIjoiNWYxMDJkZjgyNWQyNTUzMjEyYzMwZWRlIiwiaWF0IjoxNTk1MjM3Njg1LCJleHAiOjE1OTUyNDEyODV9.MutGhOxywUeELiP19PbMDTdVSVmvDoc1DikCPjjhkGs';

const searchProperties = {
    "user_id": user_id,
    "search_jobTitle": jobTitle,
    "search_area": area,
    "search_radius": radius,
    "user_token": token,
    "dkw": dkw,
    "udkw": udkw
}

run_jada(searchProperties);

async function run_jada(searchProperties) {
    console.log(`User Id: ${searchProperties.user_id}`)
    console.log(`Job Title: ${searchProperties.search_jobTitle}`)
    console.log(`Area: ${searchProperties.search_area}`)
    console.log(`Radius: ${searchProperties.search_radius}`)

    let session_date = Jada.getDate('-')
    let session_id = Jada.getDate('') + mongoose.Types.ObjectId();
    let session_time = Jada.getTime();
    let sessionData = searchProperties;
    sessionData.session_date = session_date;
    sessionData.session_id = session_id;
    sessionData.session_time = session_time;
    let allSessionJobIds = [];
    let jobsAppliedTo = [];
    let potentialJobsIds = [];
    let interestedJobIds = [];
    let resultPage = 0;

    let radiusOptions = [0, 5, 10, 20, 30];
    let radiusValid = radiusOptions.includes(searchProperties.search_radius);
    if (!radiusValid) {
        Jada.end_session();
        return console.log('SESSION FAILED: invalid radius option')
    }

    let tokenValid = await Jada.check_token(searchProperties.user_id, searchProperties.user_token)
    if (!tokenValid) {
        Jada.end_session();
        return console.log('SESSION FAILED: user invalid token')
    }

    await Jada.navigate_to_website();
    let navigateToLogin = await Jada.navigate_to_loginPage();
    if (!navigateToLogin) {
        Jada.end_session();
        return console.log('SESSION FAILED: navigate to login page failed')
    }

    let login = await Jada.jobSeeker_login();
    if (!login) {
        Jada.end_session();
        return console.log('SESSION FAILED: logged in user search button not found')
    }

    let enteredSearch = await Jada.enter_search(
        searchProperties.search_jobTitle,
        searchProperties.search_area,
        searchProperties.search_radius
    );
    if (!enteredSearch) {
        Jada.end_session();
        return console.log('SESSION FAILED: first xpath result not found')
    }

    let activeNextBtn = await Jada.check_nextBtn_status();

    do {
        resultPage++;
        console.log(resultPage)
        potentialJobsIds = [];
        interestedJobIds = [];
        let additionalJobs = await Jada.populate_potential_jobs();
        potentialJobsIds.push(...additionalJobs);
        allSessionJobIds.push(...additionalJobs);

        let isInterested = await Jada.check_interest(potentialJobsIds, sessionData);
        interestedJobIds.push(...isInterested);
        console.log('INTERESTED JIds: ---------------- ')
        console.log(interestedJobIds.length)
        console.log(interestedJobIds)

        let additionalJobsAppliedTo = await Jada.process_interested_jobs(interestedJobIds, sessionData);
        jobsAppliedTo.push(...additionalJobsAppliedTo);
        console.log('APPLIED TO JIds: ----------------- ')
        console.log(jobsAppliedTo.length)
        console.log(jobsAppliedTo)

        if (activeNextBtn) {
            let nextPage = await Jada.next_results_page();
            if (!nextPage) { return console.log('SESSION FAILED: next result page button not found') }
            activeNextBtn = await Jada.check_nextBtn_status();
        }
        console.log(`Next results page button available: ${activeNextBtn}`)

    } while (activeNextBtn)

    let sessionReport = await Jada.produce_session_report(sessionData, allSessionJobIds);
    let savedSessionReport = await Jada.save_session(sessionReport)

    if (savedSessionReport) {
        let emailSession = await Jada.email_session_report(searchProperties, sessionReport);
        let endSession = await Jada.end_session();
    } else {
        console.log('SESSION ERROR: Failed to save session to database')
    }

}
