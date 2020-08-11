const mongoose = require('mongoose');
const { process_results } = require('./processResults');
const { failed_res } = require('./processSearchResultsActions/failedRes');
const { check_logged_in } = require('./processSearchResultsActions/checkLoggedIn');
const { grab_total_results } = require('./processSearchResultsActions/grabTotalResults');
const { grab_search_params } = require('./processSearchResultsActions/grabSearchParams');
const { generate_session_report } = require('./processSearchResultsActions/generateSessionReport');


exports.process_results = async (req, res, next) => {
    const request = req.body;
    const reqUserId = req.body.user_id;

    if (!(request.hasOwnProperty("user_id"))) {
        return await res.status(400).json(failed_res(400,'user_id is required'));
    }

    const userId = reqUserId.trim();
    if (!(mongoose.Types.ObjectId.isValid(userId))) {
        return await res.status(400).json(failed_res(400,'Invalid user id'));
    }

    // const loggedIn = await check_logged_in();
    // if (!(loggedIn)) {
    //     return await res.status(500).json(failed_res_500('System error, user not logged into totalJobs'));
    // }
    //
    const processed_results = await process_results(userId);
    if (!(processed_results.success)) {
        return await res.status(500).json(failed_res(500, processed_results.message))
    }

    let totalResults = await grab_total_results();
    if (!(totalResults)) {
        return await res.status(500).json(failed_res(500, 'System error, total results not found'));
    } else {
        totalResults = parseInt(totalResults)
    }

    let searchParams = await grab_search_params();
    if (!(searchParams.success)) {
        return await res.status(500).json(failed_res(500, searchParams.message));
    }
    // process job adds per page loop:

    // produce session / loop report
    let sessionReport = await generate_session_report(processed_results.session_detail.session_id)
    if (!(sessionReport.success)) {
        return await res.status(500).json(failed_res(500, sessionReport.message))
    }

    // return session report and save to db

    await res.status(200).json({
        message: 'yellow',
        total_results: totalResults,
        search_params: searchParams.data,
        processed_results: processed_results,
        session_report: sessionReport
    })
}