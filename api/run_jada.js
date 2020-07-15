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
const area = 'Kent';
const radius = 0;

run_jada(jobTitle, area, radius);

async function run_jada(jobTitle, area, radius) {
    console.log(`Job Title: ${jobTitle}`)
    console.log(`Area: ${area}`)
    console.log(`Radius: ${radius}`)
    let searchParams = { "job_title": jobTitle, "location": area, "radius": radius }
    const radiusOptions = [0, 5, 10, 20, 30];
    let session_date = Jada.getDate('-')
    let session_id = Jada.getDate('') + mongoose.Types.ObjectId();
    let session_time = Jada.getTime();
    let allSessionJobIds = [];
    let jobsAppliedTo = [];
    let potentialJobsIds = [];
    let interestedJobIds = [];
    let resultPage = 0;
    let radiusValid = radiusOptions.includes(radius);
    if (!radiusValid) { return console.log('SESSION FAILED: invalid radius option') }

    await Jada.navigate_to_website();
    let navigateToLogin = await Jada.navigate_to_loginPage();
    if (!navigateToLogin) { return console.log('SESSION FAILED: navigate to login page failed') }

    let login = await Jada.jobSeeker_login();
    if (!login) { return console.log('SESSION FAILED: logged in user search button not found') }

    let enteredSearch = await Jada.enter_search(jobTitle, area, radius);
    if (!enteredSearch) { return console.log('SESSION FAILED: first xpath result not found') }

    let activeNextBtn = await Jada.check_nextBtn_status();

    do {
        resultPage++;
        console.log(resultPage)
        potentialJobsIds = [];
        interestedJobIds = [];
        let additionalJobs = await Jada.populate_potential_jobs();
        potentialJobsIds.push(...additionalJobs);
        allSessionJobIds.push(...additionalJobs);

        let isInterested = await Jada.check_interest(
            potentialJobsIds,
            dkw,
            udkw,
            session_id,
            session_date,
            session_time
        );
        interestedJobIds.push(...isInterested);
        console.log('INTERESTED JIds: ---------------- ')
        console.log(interestedJobIds.length)
        console.log(interestedJobIds)

        let additionalJobsAppliedTo = await Jada.process_interested_jobs(
            interestedJobIds,
            dkw,
            udkw,
            session_id,
            session_date,
            session_time
        );
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

    let sessionReport = await Jada.produce_session_report(session_id, session_date, session_time, allSessionJobIds);
    let savedSessionReport = await Jada.save_session(sessionReport)

    if (savedSessionReport) {
        let emailSession = await Jada.email_session_report(searchParams, sessionReport);
        let endSession = await Jada.end_session();
    } else {
        console.log('SESSION ERROR: Failed to save session to database')
    }

}
