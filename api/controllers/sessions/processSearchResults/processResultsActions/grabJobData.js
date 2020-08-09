const { grab_job_description } = require('./grabJobData/grabJobDescription');
const { grab_job_salary } = require('./grabJobData/grabJobSalary');
const { grab_job_title } = require('./grabJobData/grabJobTitle');
const { grab_job_company } = require('./grabJobData/grabJobCompany');
const { grab_job_type } = require('./grabJobData/grabJobType');
const { grab_job_posted } = require('./grabJobData/grabJobPosted');
const { grab_job_location } = require('./grabJobData/grabJobLocation');
const { grab_job_contact } = require('./grabJobData/grabJobContact');
const { grab_totalJobs_ref } = require('./grabJobData/grabTotalJobRef');

exports.grab_all_job_data = async (id, jobUrl) => {
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

        let location = await grab_job_location();
        if (location.error) { return location }

        let contact = await grab_job_contact();
        if (contact.error) { return contact }

        let totalJobsRef = await grab_totalJobs_ref();
        if (totalJobsRef.error) { return totalJobsRef}

        return {
            success: true,
            job_info: {
                job_desc: jobDesc.data,
                totalJobs_id: id,
                job_title: jobTitle.data,
                salary: salary.data,
                company: company.data,
                job_type: jobType.data,
                job_posted: jobPosted.data,
                location: location.data,
                job_url: jobUrl,
                job_contact: contact.data,
                totalJobs_ref: totalJobsRef.data
            }
        }
    } catch (err) {
        console.log(err)
        return {
            success: false,
            error: err
        }
    }
}