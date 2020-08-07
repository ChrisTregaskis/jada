const mongoose = require('mongoose');
const { check_logged_in, get_total_results, failed_res_400,
    failed_res_500 } = require('./processSearchResultsActions');
const { process_results } = require('./processResults');

exports.process_results = async (req, res, next) => {
    const request = req.body;
    const reqUserId = req.body.user_id;

    if (!(request.hasOwnProperty("user_id"))) {
        return await res.status(400).json(failed_res_400('user_id is required'));
    }

    const userId = reqUserId.trim();
    if (!(mongoose.Types.ObjectId.isValid(userId))) {
        return await res.status(400).json(failed_res_400('Invalid user id'));
    }

    // const loggedIn = await check_logged_in();
    // if (!(loggedIn)) {
    //     return await res.status(500).json(failed_res_500('System error, user not logged into totalJobs'));
    // }
    //
    const processed_results = await process_results(userId);

    let totalResults = await get_total_results();
    if (!(totalResults)) {
        return await res.status(500).json(failed_res_500('System error, total results not found'));
    } else {
        totalResults = parseInt(totalResults)
    }

    // process job adds per page loop:

    // produce session / loop report

    // return session report and save to db

    await res.status(200).json({
        message: 'yellow',
        total_results: totalResults,
        processed_results: processed_results
    })
}