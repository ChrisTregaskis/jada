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

        let jobTitle;
        if (jobJSON.data.job_schema.title === 'NOT_FOUND') {
            let grabJobTitle = await grab_job_title();
            if (!(grabJobTitle.success)) { return grabJobTitle }
            jobTitle = grabJobTitle.data
        } else {
            jobTitle = jobJSON.data.job_schema.title;
        }

        let salary;
        if (jobJSON.data.agnostic_analytics.JobSalary === 'NOT_FOUND') {
            let grabSalary = await grab_job_salary();
            if (grabSalary.error) { return grabSalary }
            salary = grabSalary.data
        } else {
            salary = jobJSON.data.agnostic_analytics.JobSalary;
        }

        let company;
        if (jobJSON.data.job_schema.hiringOrganization.name === 'NOT_FOUND') {
            let grabCompany = await grab_job_company();
            if (grabCompany.error) { return grabCompany }
            company = grabCompany.data
        } else {
            company = jobJSON.data.job_schema.hiringOrganization.name
        }

        let jobType;
        if (jobJSON.data.job_schema.employmentType === 'NOT_FOUND') {
            let grabJobType = await grab_job_type();
            if (grabJobType.error) { return grabJobType }
            jobType = grabJobType.data
        } else {
            jobType = jobJSON.data.job_schema.employmentType;
        }

        let jobPosted;
        if (jobJSON.data.job_schema.datePosted === 'NOT_FOUND') {
            let grabJobPosted = await grab_job_posted();
            if (grabJobPosted.error) { return grabJobPosted }
            jobPosted = grabJobPosted.data
        } else {
            jobPosted = jobJSON.data.job_schema.datePosted
        }

        let location;
        if (jobJSON.data.job_schema.jobLocation.address.addressLocality === 'NOT_FOUND' ||
            jobJSON.data.job_schema.jobLocation.address.addressLocality === '') {
            let grabLocation = await grab_job_location();
            if (grabLocation.error) { return grabLocation }
            location = grabLocation.data
        } else {
            location = jobJSON.data.job_schema.jobLocation.address.addressLocality;
        }

        let jobDesc = await grab_job_description();
        if (!(jobDesc.success)) { return jobDesc }

        let contact = await grab_job_contact();
        if (contact.error) { return contact }

        let totalJobsRef = await grab_totalJobs_ref();
        if (totalJobsRef.error) { return totalJobsRef }

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