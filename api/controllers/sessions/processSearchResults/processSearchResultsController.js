const mongoose = require('mongoose');
const { get_user_kw, check_logged_in, get_total_results, get_session_detail,
    failed_res, next_btn_status } = require('./processSearchResultsActions');

exports.process_results = async (req, res, next) => {
    const request = req.body;
    const reqUserId = req.body.user_id;

    if (!(request.hasOwnProperty("user_id"))) {
        return await res.status(400).json(failed_res(400, 'user_id is required'));
    }

    const userId = reqUserId.trim();
    if (!(mongoose.Types.ObjectId.isValid(userId))) {
        return await res.status(400).json(failed_res(400, 'Invalid user id'));
    }

    const loggedIn = await check_logged_in();
    if (!(loggedIn)) {
        return await res.status(500)
            .json(failed_res(500, 'System error, user not logged into totalJobs'));
    }

    let totalResults = await get_total_results();
    if (!(totalResults)) {
        return await res.status(500).json(failed_res(500, 'System error, total results not found'));
    } else {
        totalResults = parseInt(totalResults)
    }

    const sessionDetail = await get_session_detail();
    const userKeyWords = await get_user_kw(userId);
    let totalProcessed = 0;

    let nextBtn = await next_btn_status();
    if (nextBtn === 'error') {
        return await res.status(500)
            .json(failed_res(500, 'System error, next button element not found'));
    }
    console.log(nextBtn)

    // process job adds per page loop:

        // grab all tJ_jobIds and check db if job already processed. Populate array to

        // process tJ_jobIds that aren't already in db loop

            // grab main window id (WebDriver)

            // make sure tJ_jobId exists on page

            // open tJ_jobId in new tab

            // grab all job add page detail

            // check desirability, log and apply accordingly

            // switch back to main window

        // check next button status, if true click to next page, await load and update next button variable

    // produce session / loop report

    // return session report and save to db

    await res.status(200).json({
        message: 'yellow',
        total_results: totalResults,
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
    })
}