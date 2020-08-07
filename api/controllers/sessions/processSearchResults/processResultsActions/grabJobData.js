const { grab_job_description } = require('./grabJobData/grabJobDescription');

exports.grab_all_job_data = async () => {
    try {
        let jobDescription = await grab_job_description();
        if (!(jobDescription.success)) { return jobDescription }


        return {
            success: true,
            job_description: jobDescription.data
        }
    } catch (err) {
        console.log(err)
        return {
            success: false,
            error: err
        }
    }
}