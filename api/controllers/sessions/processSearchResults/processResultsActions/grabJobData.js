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

        let jobTitle = jobJSON.data.job_schema.title;
        let salary = jobJSON.data.agnostic_analytics.JobSalary;
        let company = jobJSON.data.job_schema.hiringOrganization.name;
        let jobType = jobJSON.data.job_schema.employmentType;
        let jobPosted = jobJSON.data.job_schema.datePosted;
        let location = jobJSON.data.job_schema.jobLocation.addressLocality;

        if (jobTitle === undefined) {
            let grabJobTitle = await grab_job_title();
            if (!(grabJobTitle.success)) { return jobTitle }
            jobTitle = grabJobTitle.data
        } else if (salary === undefined) {
            let grabSalary = await grab_job_salary();
            if (grabSalary.error) { return salary }
            salary = grabSalary.data
        } else if (company === undefined) {
            let grabCompany = await grab_job_company();
            if (grabCompany.error) { return company }
            company = grabCompany.data
        } else if (jobType === undefined) {
            let grabJobType = await grab_job_type();
            if (grabJobType.error) { return jobType }
            jobType = grabJobType.data
        } else if (jobPosted === undefined) {
            let grabJobPosted = await grab_job_posted();
            if (grabJobPosted.error) { return jobPosted }
            jobPosted = grabJobPosted.data
        } else if (location === undefined) {
            let grabLocation = await grab_job_location();
            if (grabLocation.error) { return location }
            location = grabLocation.data
        }

        let jobDesc = await grab_job_description();
        if (!(jobDesc.success)) { return jobDesc }

        let contact = await grab_job_contact();
        if (contact.error) { return contact }

        let totalJobsRef = await grab_totalJobs_ref();
        if (totalJobsRef.error) { return totalJobsRef}

        return {
            success: true,
            job_info: {
                job_desc: jobDesc.data,
                totalJobs_id: id,
                job_title: jobTitle,
                salary: salary,
                company: company,
                job_type: jobType,
                job_posted: jobPosted,
                location: location,
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