const User = require('../../../../../models/user');

exports.get_user_kw = async (id) => {
    let userData = await User.findById(id)
    try {
        return {
            success: true,
            key_words: {
                dkw: userData.preferences.dkw,
                udkw: userData.preferences.udkw,
                ikw: userData.preferences.ikw
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

exports.get_user_job_type = async (id) => {
    let userData = await User.findById(id)
    try {
        return {
            success: true,
            job_type: userData.preferences.job_type
        }
    } catch (err) {
        console.log(err)
        return {
            success: false,
            error: err
        }
    }
}
