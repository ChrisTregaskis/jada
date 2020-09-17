const { validate_email, validate_type, sanitize_string } = require('../../Entities/validationEntity');
const User = require('../../models/user');

exports.set_user_preferences = async (req, res, next) => {
    const id = req.params.userId
    const reqEmail = req.body.email;
    const reqJobTitle = req.body.job_title;
    const reqLocation = req.body.location;
    const reqRadius = req.body.radius;
    const radiusOptions = [0, 5, 10, 20, 30];
    const reqJobType = req.body.job_type;
    const jobTypeOptions = ['FULL_TIME', 'PART_TIME', 'CONTRACTOR', 'TEMPORARY'];
    const reqSalary = req.body.salary;
    const reqSessionLimit = req.body.session_limit;
    const reqDkw = req.body.dkw;
    const reqUdkw = req.body.udkw;
    const reqIkw = req.body.ikw;

    let email;
    if (reqEmail !== undefined) {
        if (!(validate_type(reqEmail, 'string'))) {
            await res.status(400).json({
                success: false,
                message: 'Email is an incorrect data type, expecting a string'
            })
            return
        }

        email = reqEmail.trim();
        if (validate_email(email) === 'invalid email') {
            await res.status(400).json({
                success: false,
                message: 'Invalid email'
            })
            return
        }

    }

    let jobTitle;
    if (reqJobTitle !== undefined) {
        if (!(validate_type(reqJobTitle, 'string'))) {
            await res.status(400).json({
                success: false,
                message: 'Job Type is an incorrect data type, expecting a string'
            })
            return
        }

        jobTitle = sanitize_string(reqJobTitle)
    }

    let location;
    if (reqLocation !== undefined) {
        if (!(validate_type(reqLocation, 'string'))) {
            await res.status(400).json({
                success: false,
                message: 'Location is an incorrect data type, expecting a string'
            })
            return
        }

        location = sanitize_string(reqLocation)
    }

    if (reqRadius !== undefined) {
        if (!(validate_type(reqRadius, 'number'))) {
            await res.status(400).json({
                success: false,
                message: 'Radius is an incorrect data type, expecting a number'
            })
            return
        }

        let radiusValid = radiusOptions.includes(reqRadius);
        if (!radiusValid) {
            await res.status(400).json({
                success: false,
                message: 'Invalid radius option. Must be set to either 0, 5, 10, 20 or 30'
            })
            return
        }

    }

    let jobType;
    if (reqJobType !== undefined) {
        let jobTypeValid = jobTypeOptions.includes(reqJobType);
        if (!jobTypeValid) {
            await res.status(400).json({
                success: false,
                message: 'Incorrect job type preference, expecting either of the following: FULL_TIME, PART_TIME, CONTRACTOR, TEMPORARY'
            })
            return
        }

        jobType = sanitize_string(reqJobType)
    }

    if (reqSalary !== undefined) {
        if (!(validate_type(reqSalary, 'object')) ||
            !(validate_type(reqSalary.permanent_minimum, 'number')) ||
            !(validate_type(reqSalary.permanent_maximum, 'number'))) {
            await res.status(400).json({
                success: false,
                message: 'Set salary types incorrect. Salary must be object containing set preferences where the values are numbers.',
                example: {
                    salary: {
                        permanent_minimum: 12345,
                        permanent_maximum: 12345
                    }
                }
            })
            return
        }
    }

    if (reqSessionLimit !== undefined) {
        if (!(validate_type(reqSessionLimit, 'number'))) {
            await res.status(400).json({
                success: false,
                message: 'Session limit is an incorrect data type, expecting a number'
            })
            return
        }

    }

    let dkw = [];
    if (reqDkw !== undefined) {
        if (!(validate_type(reqDkw, 'object'))) {
            await res.status(400).json({
                success: false,
                message: 'Desired key words is an incorrect data type, expecting an array'
            })
            return
        }

        reqDkw.forEach(i => {
            let kw = sanitize_string(i.toUpperCase());
            dkw.push(kw);
        })
    }

    let udkw = [];
    if (reqUdkw !== undefined) {
        if (!(validate_type(reqUdkw, 'object'))) {
            await res.status(400).json({
                success: false,
                message: 'Undesired key words is an incorrect data type, expecting an array'
            })
            return
        }

        reqUdkw.forEach(i => {
            let kw = sanitize_string(i.toUpperCase());
            udkw.push(kw);
        })
    }

    let ikw = [];
    if (reqIkw !== undefined) {
        if (!(validate_type(reqIkw, 'object'))) {
            await res.status(400).json({
                success: false,
                message: 'Interested key words is an incorrect data type, expecting an array'
            })
            return
        }

        reqIkw.forEach(i => {
            let kw = sanitize_string(i.toUpperCase());
            ikw.push(kw);
        })
    }

    try {
        let updatedPreferences = 0;
        let emailUpdated = false;
        let jobTitleUpdated = false;
        let locationUpdated = false;
        let radiusUpdated = false;
        let jobTypeUpdated = false;
        let salaryUpdated = false;
        let sessionLimitUpdated = false;
        let dkwUpdated = false;
        let udkwUpdated = false;
        let ikwUpdated = false;

        if (reqEmail !== undefined) {
            let updateEmail = await User.update(
                { _id: id },
                { $set: { "preferences.reporting_email": email } }
            )
            if (updateEmail.nModified === 1 ) {
                updatedPreferences++
                emailUpdated = true
            }
        }

        if (reqJobTitle !== undefined) {
            let updateJobTitle = await User.update(
                { _id: id },
                { $set: { "preferences.job_title": jobTitle } }
            )
            if (updateJobTitle.nModified === 1 ) {
                updatedPreferences++
                jobTitleUpdated = true
            }
        }

        if (reqLocation !== undefined) {
            let updateLocation = await User.update(
                { _id: id },
                { $set: { "preferences.location": location } }
            )
            if (updateLocation.nModified === 1 ) {
                updatedPreferences++
                locationUpdated = true
            }
        }

        if (reqRadius !== undefined) {
            let updateRadius = await User.update(
                { _id: id },
                { $set: { "preferences.radius": reqRadius } }
            )
            if (updateRadius.nModified === 1 ) {
                updatedPreferences++
                radiusUpdated = true
            }
        }

        if (reqJobType !== undefined) {
            let updateJobType = await User.update(
                { _id: id },
                { $set: { "preferences.job_type": jobType } }
            )
            if (updateJobType.nModified === 1 ) {
                updatedPreferences++
                jobTypeUpdated = true
            }
        }

        if (reqSalary !== undefined) {
            let updateSalary = await User.update(
                { _id: id },
                { $set: { "preferences.salary": reqSalary } }
            )
            if (updateSalary.nModified === 1) {
                updatedPreferences++
                salaryUpdated = true
            }
        }

        if (reqSessionLimit !== undefined) {
            let updateSessionLimit = await User.update(
                { _id: id },
                { $set: { "preferences.session_limit": reqSessionLimit } }
            )
            if (updateSessionLimit.nModified === 1 ) {
                updatedPreferences++
                sessionLimitUpdated = true
            }
        }

       if (reqDkw !== undefined) {
           let updateDkw = await User.update(
               { _id: id },
               { $set: { "preferences.dkw": dkw }}
           )
           if (updateDkw.nModified === 1 ) {
               updatedPreferences++
               dkwUpdated = true
           }
       }

        if (reqUdkw !== undefined) {
            let updateUdkw = await User.update(
                { _id: id },
                { $set: { "preferences.udkw": udkw }}
            )
            if (updateUdkw.nModified === 1 ) {
                updatedPreferences++
                udkwUpdated = true
            }
        }

        if (reqIkw !== undefined) {
            let updatedIkw = await User.update(
                { _id: id },
                { $set: { "preferences.ikw": ikw }}
            )
            if (updatedIkw.nModified === 1 ) {
                updatedPreferences++
                ikwUpdated = true
            }
        }

        if (updatedPreferences > 0) {
            await res.status(200).json({
                success: true,
                message: 'Successfully updated user preferences',
                preferences_updated: {
                    count: updatedPreferences,
                    email: emailUpdated,
                    job_title: jobTitleUpdated,
                    location: locationUpdated,
                    radius: radiusUpdated,
                    job_type: jobTypeUpdated,
                    salary: salaryUpdated,
                    session_limit: sessionLimitUpdated,
                    dkw: dkwUpdated,
                    udkw: udkwUpdated,
                    ikw: ikwUpdated
                }
            })
        } else if (updatedPreferences < 1) {
            await res.status(400).json({
                success: false,
                message: 'Document not modified',
                preferences_updated: {
                    count: updatedPreferences
                }
            })
        }

    } catch (e) {
        console.log(e)
        await res.status(500).json({
            success: false,
            message: 'Not able to update document'
        })
    }

}