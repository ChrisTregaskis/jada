const { validate_email, validate_type } = require('../../Entities/validationEntity');
const User = require('../../models/user');

exports.set_user_preferences = async (req, res, next) => {
    const id = req.params.userId
    const reqEmail = req.body.email;
    const reqJobTitle = req.body.job_title;
    const reqLocation = req.body.location;
    const reqRadius = req.body.radius;
    const radiusOptions = [0, 5, 10, 20, 30];
    const reqSessionLimit = req.body.session_limit;
    let email;
    let jobTitle;
    let location;


    if (reqEmail !== undefined) {
        if (!(validate_type(reqEmail, 'string'))) {
            res.status(400).json({
                success: false,
                message: 'Email is an incorrect data type, should be a string'
            })
            return
        }

        email = reqEmail.trim();
        if (validate_email(email) === 'invalid email') {
            res.status(400).json({
                success: false,
                message: 'Invalid email'
            })
            return
        }

    }

    if (reqJobTitle !== undefined) {
        if (!(validate_type(reqJobTitle, 'string'))) {
            res.status(400).json({
                success: false,
                message: 'Job Type is an incorrect data type, should be a string'
            })
            return
        }

        jobTitle = reqJobTitle.trim();
    }

    if (reqLocation !== undefined) {
        if (!(validate_type(reqLocation, 'string'))) {
            res.status(400).json({
                success: false,
                message: 'Location is an incorrect data type, should be string'
            })
            return
        }

        location = reqLocation.trim();
    }

    if (reqRadius !== undefined) {
        if (!(validate_type(reqRadius, 'number'))) {
            res.status(400).json({
                success: false,
                message: 'Radius is an incorrect data type, should be a number'
            })
            return
        }

        let radiusValid = radiusOptions.includes(reqRadius);
        if (!radiusValid) {
            res.status(400).json({
                success: false,
                message: 'Invalid radius option. Must be set to either 0, 5, 10, 20 or 30'
            })
            return
        }

    }

    if (reqSessionLimit !== undefined) {
        if (!(validate_type(reqSessionLimit, 'number'))) {
            res.status(400).json({
                success: false,
                message: 'Session limit is an incorrect data type, should be a number'
            })
            return
        }

    }

    try {
        let updatedPreferences = 0;
        let emailUpdated = false;
        let jobTitleUpdated = false;
        let locationUpdated = false;
        let radiusUpdated = false;
        let sessionLimitUpdated = false;

        if (reqEmail !== undefined) {
            updateEmail = await User.update(
                { _id: id },
                { $set: { "preferences.reporting_email": email } }
            )
            if (updateEmail.nModified === 1 ) {
                updatedPreferences++
                emailUpdated = true
            }
        }

        if (reqJobTitle !== undefined) {
            updateJobTitle = await User.update(
                { _id: id },
                { $set: { "preferences.job_title": jobTitle } }
            )
            if (updateJobTitle.nModified === 1 ) {
                updatedPreferences++
                jobTitleUpdated = true
            }
        }

        if (reqLocation !== undefined) {
            updateLocation = await User.update(
                { _id: id },
                { $set: { "preferences.location": location } }
            )
            if (updateLocation.nModified === 1 ) {
                updatedPreferences++
                locationUpdated = true
            }
        }

        if (reqRadius !== undefined) {
            updateRadius = await User.update(
                { _id: id },
                { $set: { "preferences.radius": reqRadius } }
            )
            if (updateRadius.nModified === 1 ) {
                updatedPreferences++
                radiusUpdated = true
            }
        }

        if (reqSessionLimit !== undefined) {
            updateSessionLimit = await User.update(
                { _id: id },
                { $set: { "preferences.session_limit": reqSessionLimit } }
            )
            if (updateSessionLimit.nModified === 1 ) {
                updatedPreferences++
                sessionLimitUpdated = true
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
                    session_limit: sessionLimitUpdated
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