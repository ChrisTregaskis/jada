const WebDriver = require('selenium-webdriver');
const localWebDriver = require('../webDriver');
const driver = localWebDriver.get_driver();
const mongoose = require('mongoose');
const User = require('../../../models/user');

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

exports.check_logged_in = async () => {
    try {
        let navBarWebElement = await driver.findElement({ id: "navbar-header" });
        let navBarClass = await navBarWebElement.getAttribute('class');
        let navBarClasses = navBarClass.split(" ");
        return navBarClasses.includes("logged-in")
    } catch (err) {
        console.log(err)
        return false
    }
}

exports.get_total_results = async () => {
    try {
        let totalResults;
        totalResults = await driver.findElements({ css: '.page-title span' });
        if (totalResults.length > 0) {
            totalResults = await driver.findElement({ css: '.page-title span' });
            return await totalResults.getText();
        }
    } catch (err) {
        console.log(err)
        return false
    }

}

exports.get_session_detail = () => {
    const today = new Date();

    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if(dd < 10) dd = '0' + dd;
    if(mm < 10) mm = '0' + mm;
    let date = yyyy+'-'+mm+'-'+dd;

    let hh = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();
    if(hh < 10) hh = '0' + hh;
    if(min < 10) min = '0' + min;
    if(sec < 10) sec = '0' + sec;
    let time = `${hh}:${min}:${sec}`;

    let session_id = yyyy+ mm + dd + mongoose.Types.ObjectId();

    return {
        session_date: date,
        session_time: time,
        session_id: session_id
    }
}