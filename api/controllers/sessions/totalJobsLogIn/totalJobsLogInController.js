const { navigate_to_website, navigate_to_loginPage, jobSeeker_login } = require('./totalJobsLogInActions');
const { validate_email } = require('../../../Entities/validationEntity')
const aesjs = require('aes-js');

exports.totalJobs_logIn = async (req, res, next) => {
    const requestEmail = req.body.email;
    const requestPass = req.body.encPass;
    if (typeof requestEmail !== "string" || typeof requestPass !== "string") {
        await res.status(400).json({
            success: false,
            message: 'Incorrect data types submitted'
        })
        return
    }

    const email = requestEmail.trim();
    const encPass = requestPass.trim();
    if (email.length < 1 || encPass < 1) {
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

    var key = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
        29, 30, 31];
    // Convert text to bytes
    var text = 'gSpJ2biL$XDHwEQ';
    var textBytes = aesjs.utils.utf8.toBytes(text);

    // The counter is optional, and if omitted will begin at 1
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);

    // To print or store the binary data, you may convert it to hex
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    console.log(encryptedHex);
    // "a338eda3874ed884b6199150d36f49988c90f5c47fe7792b0cf8c7f77eeffd87
    //  ea145b73e82aefcf2076f881c88879e4e25b1d7b24ba2788"

    try {
        await navigate_to_website();
        await navigate_to_loginPage();
        await jobSeeker_login(email, encPass);
        await res.status(200).json({
            success: true,
            message: 'Successfully logged into totalJobs account',
            email: email,
            decrypted: decryptedText
        })
    } catch (err) {
        if (err.name === 'TimeoutError') {
            await res.status(400).json({
                success: false,
                message: 'Log in unsuccessful, please check email and password'
            })
        } else {
            await res.status(500).json({ error: err })
        }
    }

}
