const { navigate_to_website, navigate_to_loginPage, jobSeeker_login } = require('./totalJobsLogInActions');

exports.totalJobs_logIn = async (req, res, next) => {
    const totalJobsEmail = req.body.totalJobs_email;
    const totalJobsHashPass = req.body.totalJobs_hashPass;




    let validatedData = true
    if (validatedData) {
        try {
            await navigate_to_website();
            await navigate_to_loginPage();
            await jobSeeker_login(totalJobsEmail, totalJobsHashPass);
            await res.status(200).json({
                message: 'navigated to website',
                email: totalJobsEmail
            })
        } catch (err) {
            console.log(err)
            await res.status(500).json({ error: err })
        }
    } else {
        await res.status(500).json({ message: 'body data invalid' })
     }

}
