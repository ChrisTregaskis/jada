const { navigate_to_website, navigate_to_loginPage, jobSeeker_login } = require('./totalJobsLogInActions');
const { validate_email } = require('../../../Entities/validationEntity')

exports.totalJobs_logIn = async (req, res, next) => {
    const requestEmail = req.body.totalJobs_email;
    const requestPass = req.body.totalJobs_hashPass;
    if (typeof requestEmail !== "string" || typeof requestPass !== "string") {
        await res.status(400).json({
            success: false,
            message: 'Incorrect data types submitted'
        })
        return
    }

    const totalJobsEmail = requestEmail.trim();
    const totalJobsHashPass = requestPass.trim();
    if (totalJobsEmail.length < 1 || totalJobsHashPass < 1) {
        await res.status(400).json({
            success: false,
            message: 'Email or password field empty'
        })
        return
    } else if (validate_email(totalJobsEmail) === 'invalid email') {
        await res.status(400).json({
            success: false,
            message: 'Invalid email'
        })
        return
    }

    try {
        await navigate_to_website();
        await navigate_to_loginPage();
        await jobSeeker_login(totalJobsEmail, totalJobsHashPass);
        await res.status(200).json({
            success: true,
            message: 'Successfully logged into totalJobs account',
            email: totalJobsEmail
        })
    } catch (err) {
        if (err.name === 'TimeoutError') {
            await res.status(400).json({
                success: false,
                message: 'Log in unsuccessful, please check email and password'
            })
        } else {
            await res.status(500).json({ error: err })
        }
    }

}


