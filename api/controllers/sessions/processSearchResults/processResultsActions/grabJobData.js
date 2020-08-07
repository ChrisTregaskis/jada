const { grab_job_description } = require('./grabJobData/grabJobDescription');
const { grab_job_salary } = require('./grabJobData/grabJobSalary');

exports.grab_all_job_data = async () => {
    try {
        let jobDesc = await grab_job_description();
        if (!(jobDesc.success)) { return jobDesc }

        let salary = await grab_job_salary();
        if (salary.error) { return salary }

        return {
            success: true,
            job_desc: jobDesc.data,
            salary: salary
        }
    } catch (err) {
        console.log(err)
        return {
            success: false,
            error: err
        }
    }
}