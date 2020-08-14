const { grab_job_description } = require('./grabJobData/grabJobDescription');
const { grab_job_salary } = require('./grabJobData/grabJobSalary');
const { grab_job_title } = require('./grabJobData/grabJobTitle');
const { grab_job_company } = require('./grabJobData/grabJobCompany');
const { grab_job_type } = require('./grabJobData/grabJobType');
const { grab_job_posted } = require('./grabJobData/grabJobPosted');
const { grab_job_location } = require('./grabJobData/grabJobLocation');
const { grab_job_contact } = require('./grabJobData/grabJobContact');
const { grab_totalJobs_ref } = require('./grabJobData/grabTotalJobRef');
const { grab_job_JSON } = require('./grabJobData/grabJobJSON');

exports.grab_all_job_data = async (id, jobUrl) => {
    try {
        let jobJSON = await grab_job_JSON();
        if (jobJSON.error) { return jobJSON }

        let jobDesc = await grab_job_description();
        if (!(jobDesc.success)) { return jobDesc }

        // let jobTitle = await grab_job_title();
        // if (!(jobTitle.success)) { return jobTitle }

        let salary = await grab_job_salary();
        if (salary.error) { return salary }

        // let company = await grab_job_company();
        // if (company.error) { return company }

        let jobType = await grab_job_type();
        if (jobType.error) { return jobType }

        // let jobPosted = await grab_job_posted();
        // if (jobPosted.error) { return jobPosted }

        // let location = await grab_job_location();
        // if (location.error) { return location }

        let contact = await grab_job_contact();
        if (contact.error) { return contact }

        let totalJobsRef = await grab_totalJobs_ref();
        if (totalJobsRef.error) { return totalJobsRef}

        //add validation, if property doesn't exist, try grabbing directly from html as with contact

        return {
            success: true,
            job_info: {
                job_desc: jobDesc.data,
                totalJobs_id: id,
                job_title: jobJSON.data.job_schema.title,
                salary: jobJSON.data.agnostic_analytics.JobSalary,
                company: jobJSON.data.job_schema.hiringOrganization.name,
                job_type: jobJSON.data.job_schema.employmentType,
                job_posted: jobJSON.data.job_schema.datePosted,
                location: jobJSON.data.job_schema.jobLocation.addressLocality,
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