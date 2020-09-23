const User = require('../../models/user');

exports.get_tJ_credentials = async (req, res, next) => {
    const id = req.params.userId
    try {
        let userData = await User.findById(id)
        let credentials = userData.log_in_credentials.totalJobs
        await res.status(200).json({
            success: true,
            credentials: credentials
        })
    } catch (err) {
        await res.status(500).json({
            success: false,
            error: err
        })
    }
}