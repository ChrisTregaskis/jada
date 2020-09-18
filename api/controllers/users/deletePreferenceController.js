const { validate_type, sanitize_string } = require('../../Entities/validationEntity');
const User = require('../../models/user');

exports.delete_user_preferences = async (req, res, next) => {
    const id = req.params.userId
    const reqDkw = req.body.dkw;
    const reqUdkw = req.body.udkw;
    const reqIkw = req.body.ikw;

    if (reqDkw === undefined && reqUdkw === undefined && reqIkw === undefined) {
        await res.status(400).json({
            success: false,
            message: `Property 'dkw', 'udkw' or 'ikw' expected.`,
            example: { "dkw": "Manager" }
        })
    }

    let dkw;
    if (reqDkw !== undefined) {
        if (!(validate_type(reqDkw, 'string'))) {
            await res.status(400).json({
                success: false,
                message: 'Desired key words is an incorrect data type, expecting a string'
            })
            return
        }
        dkw = sanitize_string(reqDkw.toUpperCase())
    }

    let udkw;
    if (reqUdkw !== undefined) {
        if (!(validate_type(reqUdkw, 'string'))) {
            await res.status(400).json({
                success: false,
                message: 'Undesired key words is an incorrect data type, expecting an string'
            })
            return
        }
        udkw = sanitize_string(reqUdkw.toUpperCase())
    }

    let ikw;
    if (reqIkw !== undefined) {
        if (!(validate_type(reqIkw, 'string'))) {
            await res.status(400).json({
                success: false,
                message: 'Interested key words is an incorrect data type, expecting an string'
            })
            return
        }
        ikw = sanitize_string(reqIkw.toUpperCase())
    }

    try {
        let updatedPreferences = 0;
        let dkwUpdated = false;
        let udkwUpdated = false;
        let ikwUpdated = false;

        if (reqDkw !== undefined) {
            let updateDkw = await User.update(
                { _id: id },
                { $pull: { "preferences.dkw": dkw } }
            )
            if (updateDkw.nModified === 1) {
                updatedPreferences++
                dkwUpdated = true
            }
        }

        if (reqUdkw !== undefined) {
            let updateUdkw = await User.update(
                { _id: id },
                { $pull: { "preferences.udkw": udkw } }
            )
            if (updateUdkw.nModified === 1) {
                updatedPreferences++
                udkwUpdated = true
            }
        }

        if (reqIkw !== undefined) {
            let updatedIkw = await User.update(
                { _id: id },
                { $pull: { "preferences.ikw": ikw } }
            )
            if (updatedIkw.nModified === 1) {
                updatedPreferences++
                ikwUpdated = true
            }
        }

        if (updatedPreferences > 0) {
            await res.status(200).json({
                success: true,
                message: 'Successfully updated user key word preferences',
                preferences_updated: {
                    count: updatedPreferences,
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