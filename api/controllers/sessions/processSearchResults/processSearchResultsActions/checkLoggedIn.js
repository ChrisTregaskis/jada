const localWebDriver = require('../../webDriver');
const driver = localWebDriver.get_driver();

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
