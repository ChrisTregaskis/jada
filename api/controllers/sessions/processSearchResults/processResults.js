const localWebDriver = require('../webDriver');
const driver = localWebDriver.get_driver();
const { next_btn_status, test_page } = require('./processResultsActions/nextBtnStatus');
const { create_session_detail } = require('./processResultsActions/createSessionDetail');
const { get_user_kw } = require('./processResultsActions/dataBaseRequests/getUserKw');
const { get_processed_job_ids } = require('./processResultsActions/dataBaseRequests/getProcessedJobIds');
const { grab_page_tJ_ids } = require('./processResultsActions/grabPageTotalJobIds');
const { grab_job_url } = require('./processResultsActions/grabJobUrl');
const { open_job_add } = require('./processResultsActions/openJobAdd');
const { grab_all_job_data } = require('./processResultsActions/grabJobData');

exports.process_results = async (userId)  => {
    let testPage = await test_page();

    // let nextBtn = await next_btn_status();
    // if (nextBtn === 'error') {
    //     return {
    //         success: false,
    //         message: 'System error, next button element not found'
    //     }
    // }


    const sessionDetail = await create_session_detail();
    const userKeyWords = await get_user_kw(userId);
    const processedJobIds = await get_processed_job_ids(userId);
    let totalProcessed = 0;
    let jobIds;


    ///////////////////////////////////////////---- PAGE LOOP ----/////////////////////////////////////////////////////

    jobIds = await grab_page_tJ_ids();

    for (let i=0; i < jobIds.length; i++) {
        if (processedJobIds.includes(jobIds[i])) { continue }
        let mainWindow = await driver.getWindowHandle();
        let jobUrl = await grab_job_url(jobIds[i]).then((url) => { return url.data})
        let openJobAdd = await open_job_add(mainWindow, jobUrl)
        if (openJobAdd.error) {
            return {
                success: false,
                message: 'System error grabbing job url'
            }
        }

        let jobData = await grab_all_job_data(userId, jobUrl);
        if (!(jobData.success)) {
            return {
                success: false,
                message: 'System error grabbing job data'
            }
        }
        // generate found key words
        let jD = jobData.job_info.job_desc;
        let jDUpperCase = jD.toUpperCase();
        console.log(jobData.job_info.job_title)
        // check desirability, log and apply accordingly

        totalProcessed++
        await driver.close();
        let backToMainWindow = await driver.switchTo().window(mainWindow);
    }

    // check next button status, if true click to next page, await load and update next button variable


    ////////////////////////////////////////////---- PAGE LOOP ----////////////////////////////////////////////////////

    // do {

    // } while (nextBtn === true)

    return {
        success: true,
        message: 'Successfully processed all results',
        total_processed: totalProcessed,
        session_detail: {
            session_id: sessionDetail.session_id,
            session_date: sessionDetail.session_date,
            session_time: sessionDetail.session_time
        },
        user_key_words: {
            dkw: userKeyWords.dkw,
            udkw: userKeyWords.udkw,
            ikw: userKeyWords.ikw
        }
    }
}