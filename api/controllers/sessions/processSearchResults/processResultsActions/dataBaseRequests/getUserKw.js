const User = require('../../../../../models/user');

exports.get_user_kw = async (id) => {
    let userData = await User.findById(id)
    let userPreferences = {};
    try {
        userPreferences = {
            dkw: userData.preferences.dkw,
            udkw: userData.preferences.udkw,
            ikw: userData.preferences.ikw
        }
        return userPreferences
    } catch (err) { throw err }
}
