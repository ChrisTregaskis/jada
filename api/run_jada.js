const Jada = require('./jada_functions');
const dkw = ['SOFTWARE', 'ENGINEER', 'ENGINEERING', 'DEVELOPER', 'FULL', 'GIT', 'BASH', 'NODE', 'AGILE',
    'BACKEND', 'FRONTEND', 'PHP', 'OOP', 'JS', 'JAVASCRIPT', 'HTML', 'CSS', 'MYSQL', 'MONGODB', 'RESTFUL', 'API'];
const udkw = ['TRAINEESHIP', '.NET', 'TRAINEE', 'CONSULTANT', 'UX', 'DESIGNER', 'SALES', 'LEAD', 'WINDOWS'];
const jobTitle = 'software developer';
const area = 'Bath';
const radius = 30;

run_jada(jobTitle, area, radius);

async function run_jada(jobTitle, area, radius) {
    const radiusOptions = [0, 5, 10, 20, 30];
    let viewedResults = [];
    let potentialJobsIds = [];
    let interestedJobIds = [];
    let radiusValid = radiusOptions.includes(radius);
    if (!radiusValid) { return console.log('SESSION FAILED: invalid radius option') }

    await Jada.navigate_to_website();
    let navigateToLogin = await Jada.navigate_to_loginPage();
    if (!navigateToLogin) { return console.log('SESSION FAILED: navigate to login page failed') }

    let login = await Jada.jobSeeker_login();
    if (!login) { return console.log('SESSION FAILED: logged in user search button not found') }

    let enteredSearch = await Jada.enter_search(jobTitle, area, radius);
    if (!enteredSearch) { return console.log('SESSION FAILED: first xpath result not found') }

    let additionalJobs = await Jada.populate_potential_jobs();
    potentialJobsIds.push(...additionalJobs)

    let isInterested = await Jada.check_interest(potentialJobsIds, viewedResults, dkw, udkw)
    interestedJobIds.push(...isInterested)
    console.log('INTERESTED JIds: ---------------- ')
    console.log(interestedJobIds.length)
    console.log(interestedJobIds)

    // await Jada.test();
}