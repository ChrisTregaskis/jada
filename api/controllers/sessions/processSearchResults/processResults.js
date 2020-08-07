const { next_btn_status } = require('./processResultsActions/nextBtnStatus');
const { create_session_detail } = require('./processResultsActions/createSessionDetail');
const { get_user_kw } = require('./processResultsActions/getUserKw');

exports.process_results = async (userId)  => {
    let nextBtn = await next_btn_status();
    if (nextBtn === 'error') {
        return {
            success: false,
            message: 'System error, next button element not found'
        }
    }

    const sessionDetail = await create_session_detail();
    const userKeyWords = await get_user_kw(userId);
    let totalProcessed = 0;

    // do {
        // grab all tJ_jobIds and check db if job already processed. Populate array to

        // process tJ_jobIds that aren't already in db loop

            // grab main window id (WebDriver)

            // make sure tJ_jobId exists on page

            // open tJ_jobId in new tab

            // grab all job add page detail

            // check desirability, log and apply accordingly

            // switch back to main window

        // check next button status, if true click to next page, await load and update next button variable

    // } while (nextBtn === true)

    return {
        success: true,
        message: 'Successfully processed all results',
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