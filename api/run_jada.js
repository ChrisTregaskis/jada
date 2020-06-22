const mongoose = require('mongoose');
const Jada = require('./jada_functions');
const dkw = ['SOFTWARE', 'ENGINEER', 'ENGINEERING', 'DEVELOPER', 'GIT', 'BASH', 'NODE', 'AGILE', 'NODEJS',
    'BACKEND', 'FRONTEND', 'PHP', 'OOP', 'JS', 'JAVASCRIPT', 'HTML', 'CSS', 'MYSQL', 'MONGODB', 'RESTFUL', 'API',
    'GULP'];
const udkw = ['TRAINEESHIP', 'NET', 'TRAINEE', 'CONSULTANT', 'UX', 'DESIGNER', 'SALES', 'LEAD', 'WINDOWS', 'SENIOR', 'PYTHON'];
const jobTitle = 'software developer';
const area = 'Bath';
const radius = 30;

run_jada(jobTitle, area, radius);

async function run_jada(jobTitle, area, radius) {
    const radiusOptions = [0, 5, 10, 20, 30];
    let session_date = Jada.getDate('-')
    let session_id = Jada.getDate('') + mongoose.Types.ObjectId();
    let session_time = Jada.getTime();
    let viewedResults = [];
    let potentialJobsIds = [];
    let interestedJobIds = [];
    let radiusValid = radiusOptions.includes(radius);
    if (!radiusValid) { return console.log('SESSION FAILED: invalid radius option') }

    await Jada.navigate_to_website();
    // let navigateToLogin = await Jada.navigate_to_loginPage();
    // if (!navigateToLogin) { return console.log('SESSION FAILED: navigate to login page failed') }
    //
    // let login = await Jada.jobSeeker_login();
    // if (!login) { return console.log('SESSION FAILED: logged in user search button not found') }
    //
    // let enteredSearch = await Jada.enter_search(jobTitle, area, radius);
    // if (!enteredSearch) { return console.log('SESSION FAILED: first xpath result not found') }

    let additionalJobs = await Jada.populate_potential_jobs();
    potentialJobsIds.push(...additionalJobs);

    let isInterested = await Jada.check_interest(potentialJobsIds, viewedResults, dkw, udkw, session_id, session_date, session_time);
    interestedJobIds.push(...isInterested);
    console.log('INTERESTED JIds: ---------------- ')
    console.log(interestedJobIds.length)
    console.log(interestedJobIds)

    let jobsAppliedTo = await Jada.process_interested_jobs(interestedJobIds, dkw, udkw, session_id, session_date, session_time);
    // viewedResults.push(...jobsAppliedTo);
    console.log('APPLIED TO JIds: ----------------- ')
    console.log(jobsAppliedTo.length)
    console.log(jobsAppliedTo)

    // await Jada.test();
}
