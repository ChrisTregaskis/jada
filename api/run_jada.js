const Jada = require('./jada_functions');
const dkw = ['software', 'engineer', 'engineering', 'developer', 'full stack', 'Git', 'bash', 'node', 'agile',
    'backend', 'frontend', 'Php', 'OOP', 'JavaScript', 'JS', 'HTML', 'CSS', 'MySQL', 'mongoDB', 'RESTful', 'API'];
const udkw = ['Traineeship', '.NET', 'Trainee', 'consultant', 'UX', 'designer', 'sales'];
const jobTitle = 'software developer';
const area = 'Bath';
const radius = 30;

run_jada(jobTitle, area, radius);

async function run_jada(jobTitle, area, radius) {
    const radiusOptions = [0, 5, 10, 20, 30];
    let viewedResults = [];
    let potentialJobsIds = [];
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
    //
    // let additionalJobs = await Jada.populate_potential_jobs();
    // potentialJobsIds.push(additionalJobs)
    // console.log(additionalJobs);

    await Jada.test();
}