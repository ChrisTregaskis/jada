const { grab_job_description } = require('./grabJobData/grabJobDescription');
const { grab_job_salary } = require('./grabJobData/grabJobSalary');
const { grab_job_title } = require('./grabJobData/grabJobTitle');
const { grab_job_company } = require('./grabJobData/grabJobCompany');
const { grab_job_type } = require('./grabJobData/grabJobType');
const { grab_job_posted } = require('./grabJobData/grabJobPosted');

exports.grab_all_job_data = async (id) => {
    try {
        let jobDesc = await grab_job_description();
        if (!(jobDesc.success)) { return jobDesc }

        let jobTitle = await grab_job_title();
        if (!(jobTitle.success)) { return jobTitle }

        let salary = await grab_job_salary();
        if (salary.error) { return salary }

        let company = await grab_job_company();
        if (company.error) { return company }

        let jobType = await grab_job_type();
        if (jobType.error) { return jobType }

        let jobPosted = await grab_job_posted();
        if (jobPosted.error) { return jobPosted }

        return {
            success: true,
            job_desc: jobDesc.data,
            totalJobs_id: id,
            job_title: jobTitle.data,
            salary: salary.data,
            company: company.data,
            job_type: jobType.data,
            job_posted: jobPosted.data
        }
    } catch (err) {
        console.log(err)
        return {
            success: false,
            error: err
        }
    }
}