const { validate_email } = require('../../Entities/validationEntity');
const voltPackage = require('../../volt');
const volt = voltPackage.open_volt();
const User = require('../../models/user');
const aesjs = require('aes-js');

exports.set_totalJobs_LogIn = async (req, res, next) => {
    const id = req.params.userId
    const reqEmail = req.body.email;
    const reqPass = req.body.pass;

    if (reqEmail === undefined && reqPass === undefined) {
        await res.status(400).json({
                success: false,
                message: 'Email and Password missing.'
            })
            return
    } else if (reqEmail !== undefined && reqPass === undefined) {
        if (typeof reqEmail !== "string") {
            await res.status(400).json({
                success: false,
                message: 'Incorrect data type submitted for email'
            })
            return
        }

        const email = reqEmail.trim();
        if (email.length < 1) {
            await res.status(400).json({
                success: false,
                message: 'Email field empty'
            })
            return
        } else if (validate_email(email) === 'invalid email') {
            await res.status(400).json({
                success: false,
                message: 'Invalid email'
            })
            return
        }

        try {
            let updateTJEmail = await User.update(
                { _id: id },
                { $set: { "log_in_credentials.totalJobs.tJ_email" : email } }
            )

            if (updateTJEmail.nModified === 1) {
                await res.status(200).json({
                    success: true,
                    message: 'Successfully updated totalJobs credentials'
                })
            } else if (updateTJEmail.nModified === 0) {
                await res.status(400).json({
                    success: false,
                    message: 'Document not modified'
                })
            }

        } catch (e) {
            console.log(e)
            await res.status(500).json({
                success: false,
                message: 'Not able to update document'
            })
        }
    } else if (reqEmail === undefined && reqPass !== undefined) {
        if (typeof reqPass !== "string") {
            await res.status(400).json({
                success: false,
                message: 'Incorrect data types submitted for password'
            })
            return
        }

        const pass = reqPass.trim();
        if (pass.length < 1) {
            await res.status(400).json({
                success: false,
                message: 'Email or password field empty'
            })
            return
        }

        const passBytes = aesjs.utils.utf8.toBytes(pass);
        const aesCtr = new aesjs.ModeOfOperation.ctr(volt.AES_KEY, new aesjs.Counter(5));
        const encBytes = aesCtr.encrypt(passBytes);
        const encPass = aesjs.utils.hex.fromBytes(encBytes);

        try {
            let updateTJPassword = await User.update(
                { _id: id },
                { $set: { "log_in_credentials.totalJobs.tJ_password" : encPass } }
            )

            if (updateTJPassword.nModified === 1) {
                await res.status(200).json({
                    success: true,
                    message: 'Successfully updated totalJobs credentials'
                })
            } else if (updateTJPassword.nModified === 0) {
                await res.status(400).json({
                    success: false,
                    message: 'Document not modified'
                })
            }

        } catch (e) {
            console.log(e)
            await res.status(500).json({
                success: false,
                message: 'Not able to update document'
            })
        }
    } else if (reqEmail !== undefined && reqPass !== undefined) {
        if (typeof reqEmail !== "string" || typeof reqPass !== "string") {
            await res.status(400).json({
                success: false,
                message: 'Incorrect data types submitted'
            })
            return
        }

        const email = reqEmail.trim();
        const pass = reqPass.trim();
        if (email.length < 1 || pass.length < 1) {
            await res.status(400).json({
                success: false,
                message: 'Email or password field empty'
            })
            return
        } else if (validate_email(email) === 'invalid email') {
            await res.status(400).json({
                success: false,
                message: 'Invalid email'
            })
            return
        }

        const passBytes = aesjs.utils.utf8.toBytes(pass);
        const aesCtr = new aesjs.ModeOfOperation.ctr(volt.AES_KEY, new aesjs.Counter(5));
        const encBytes = aesCtr.encrypt(passBytes);
        const encPass = aesjs.utils.hex.fromBytes(encBytes);

        try {
            let updateCredentials = await User.update(
                { _id: id },
                {
                    $set: {
                        "log_in_credentials.totalJobs.tJ_email" : email,
                        "log_in_credentials.totalJobs.tJ_password" : encPass
                    }
                }
            )

            if (updateCredentials.nModified === 1) {
                await res.status(200).json({
                    success: true,
                    message: 'Successfully updated totalJobs credentials'
                })
            } else if (updateCredentials.nModified === 0) {
                await res.status(400).json({
                    success: false,
                    message: 'Document not modified'
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

}