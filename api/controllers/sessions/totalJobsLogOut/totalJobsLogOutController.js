const { log_out_totalJobs } = require('./totalJobsLogOutActions');

exports.totalJobs_logOut = async (req, res, next) => {
    let loggedOut = await log_out_totalJobs();
    if (loggedOut.success) {
        return await res.status(200).json({
                success: true,
                message: loggedOut.message
            })
    } else {
        return await res.status(500).json({
            success: false,
            message: loggedOut.message
        })
    }
}