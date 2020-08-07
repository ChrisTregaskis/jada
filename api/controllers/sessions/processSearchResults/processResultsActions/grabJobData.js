const { grab_job_description } = require('./grabJobData/grabJobDescription');
const { grab_job_salary } = require('./grabJobData/grabJobSalary');
const { grab_job_title } = require('./grabJobData/grabJobTitle');
const { grab_job_company } = require('./grabJobData/grabJobCompany');

exports.grab_all_job_data = async () => {
    try {
        let jobDesc = await grab_job_description();
        if (!(jobDesc.success)) { return jobDesc }

        let jobTitle = await grab_job_title();
        if (!(jobTitle.success)) { return jobTitle }

        let salary = await grab_job_salary();
        if (salary.error) { return salary }

        let company = await grab_job_company();
        if (company.error) { return company }

        return {
            success: true,
            job_desc: jobDesc.data,
            job_title: jobTitle.data,
            salary: salary.data,
            company: company.data
        }
    } catch (err) {
        console.log(err)
        return {
            success: false,
            error: err
        }
    }
}