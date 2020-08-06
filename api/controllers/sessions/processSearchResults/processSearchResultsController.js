const mongoose = require('mongoose');
const { get_user_kw, check_logged_in } = require('./processSearchResultsActions');

exports.process_results = async (req, res, next) => {
    const request = req.body;
    const reqUserId = req.body.user_id;

    if (!(request.hasOwnProperty("user_id"))) {
        return await res.status(400).json({
            status: 400,
            success: false,
            message: 'user_id is required'
        })
    }

    const userId = reqUserId.trim();
    if (!(mongoose.Types.ObjectId.isValid(userId))) {
        return await res.status(400).json({
            status: 400,
            success: false,
            message: 'Invalid user id'
        })
    }

    const loggedIn = await check_logged_in();
    if (!(loggedIn)) {
        return await res.status(500).json({
            status: 500,
            success: false,
            message: 'System error, user not logged into totalJobs'
        })
    }

    const userKeyWords = await get_user_kw(userId);

    // create session data

    // set next button boolean

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
        user_key_words: {
            dkw: userKeyWords.dkw,
            udkw: userKeyWords.udkw,
            ikw: userKeyWords.ikw
        }
    })
}