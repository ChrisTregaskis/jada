const localWebDriver = require('../webDriver');
const driver = localWebDriver.get_driver();
const { next_btn_status } = require('./processResultsActions/nextBtnStatus');
const { create_session_detail } = require('./processResultsActions/createSessionDetail');
const { get_processed_job_ids } = require('./processResultsActions/dataBaseRequests/getProcessedJobIds');
const { grab_page_tJ_ids } = require('./processResultsActions/grabPageTotalJobIds');
const { grab_job_url } = require('./processResultsActions/grabJobUrl');
const { open_job_add } = require('./processResultsActions/openJobAdd');
const { grab_all_job_data } = require('./processResultsActions/grabJobData');
const { key_word_finder } = require('./processResultsActions/keyWordFinder');
const { post_application } = require('./processResultsActions/dataBaseRequests/postApplication');
const { next_results_page } = require('./processResultsActions/nextResultsPage');
const { apply_to_job } = require('./processResultsActions/applyToJob');
const { check_desirability_job_type, check_desirability_salary } = require('./processResultsActions/checkDesirabilityByPreference');
const { get_user_session_limit } = require('./processResultsActions/dataBaseRequests/getUserPreferences');

exports.process_results = async (userId)  => {
    let nextBtn = await next_btn_status();
    if (nextBtn === 'error') {
        return {
            success: false,
            message: 'System error, next button element not found'
        }
    }

    const sessionDetail = await create_session_detail();
    const processedJobIds = await get_processed_job_ids(userId);
    const userSessionLimitData = await get_user_session_limit(userId);
    if (!userSessionLimitData.success) {
        return {
            success: false,
            message: 'System error, user session limit preference not found'
        }
    }
    const userSessionLimit = userSessionLimitData.session_limit;
    let currentAppliedCount = 0;
    let totalProcessed = 0;
    let jobIds;
    let jobData;

    do {
        jobIds = await grab_page_tJ_ids();

        for (let i=0; i < jobIds.length; i++) {
            if (processedJobIds.includes(jobIds[i])) {
                totalProcessed++
                continue
            }

            let mainWindow = await driver.getWindowHandle();
            let jobUrl = await grab_job_url(jobIds[i]).then((url) => { return url.data})
            let openJobAdd = await open_job_add(mainWindow, jobUrl)
            if (openJobAdd.error) {
                return {
                    success: false,
                    message: 'System error grabbing job url'
                }
            }

            jobData = await grab_all_job_data(jobIds[i], jobUrl);
            if (!(jobData.success)) {
                return {
                    success: false,
                    message: 'System error grabbing job data'
                }
            }

            let jD = jobData.job_info.job_desc;
            let jDUpperCase = jD.toUpperCase();
            let foundKw = await key_word_finder(jDUpperCase, userId);
            let applicationJobType = jobData.job_info.job_type;
            let desiredJobType = await check_desirability_job_type(applicationJobType, userId)
            let desiredSalary = await check_desirability_salary(jobData.job_info.salary, userId)
            let dkw = foundKw.found_dkw;
            let udkw = foundKw.found_udkw;
            let desired = false;
            let applied = false

            if (dkw.length > 0 && udkw.length === 0 && desiredJobType === true && desiredSalary === true) {
                desired = true;
            }

            if (desired) {
                let applyToJob = await apply_to_job();
                if (applyToJob.error) {
                    return {
                        success: false,
                        message: 'System error applying to job'
                    }
                } else if (applyToJob.success) {
                    applied = true;
                    currentAppliedCount++
                }
            }

            let loggedApplication = await post_application(sessionDetail, userId, jobData, foundKw, desired, applied)
            if (!loggedApplication.success) {
                return {
                    success: false,
                    message: 'System error saving application to data base'
                }
            }

            totalProcessed++
            await driver.close();
            let backToMainWindow = await driver.switchTo().window(mainWindow);

            if (currentAppliedCount >= userSessionLimit) {
                return {
                    success: true,
                    message: 'Successfully processed results upto user set session limit',
                    session_limit: userSessionLimit,
                    total_processed: totalProcessed,
                    total_applied: currentAppliedCount,
                    session_detail: {
                        session_id: sessionDetail.session_id,
                        session_date: sessionDetail.session_date,
                        session_time: sessionDetail.session_time
                    }
                }
            }
        }

        if (nextBtn) {
            let nextPage = await next_results_page();
            if (!nextPage) {
                return {
                    success: false,
                    message: 'System error, failure loading next results page'
                }
            }
            nextBtn = await next_btn_status();
            if (nextBtn === 'error') {
                return {
                    success: false,
                    message: 'System error, next button element not found'
                }
            }
        }

    } while (nextBtn === true)

    return {
        success: true,
        message: 'Successfully processed all results',
        session_limit: userSessionLimit,
        total_processed: totalProcessed,
        total_applied: currentAppliedCount,
        session_detail: {
            session_id: sessionDetail.session_id,
            session_date: sessionDetail.session_date,
            session_time: sessionDetail.session_time
        }
    }
}