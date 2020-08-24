const mongoose = require('mongoose');
const { process_results } = require('./processResults');
const { failed_res } = require('./processSearchResultsActions/failedRes');
const { check_logged_in } = require('./processSearchResultsActions/checkLoggedIn');
const { grab_total_results } = require('./processSearchResultsActions/grabTotalResults');
const { grab_search_params } = require('./processSearchResultsActions/grabSearchParams');
const { generate_session_report } = require('./processSearchResultsActions/generateSessionReport');
const { post_session_report } = require('../processSearchResults/processResultsActions/dataBaseRequests/postSessionReport');


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

    const loggedIn = await check_logged_in();
    if (!(loggedIn)) {
        return await res.status(500).json(failed_res(500,'System error, user not logged into totalJobs'));
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

    const processed_results = await process_results(userId);
    if (!(processed_results.success)) {
        return await res.status(500).json(failed_res(500, processed_results.message))
    }

    let totalProcessed = processed_results.total_processed;
    let sessionReport = await generate_session_report(userId, processed_results.session_detail, totalProcessed)
    if (!(sessionReport.success)) {
        return await res.status(500).json(failed_res(500, sessionReport.message))
    }

    let postSession = await post_session_report(sessionReport.data);
    if (!(postSession.success)) {
        return await res.status(500).json(failed_res(500, sessionReport.message))
    }

    await res.status(200).json({
        success: true,
        total_results: totalResults,
        search_params: searchParams.data,
        session_report: sessionReport.data
    })
}