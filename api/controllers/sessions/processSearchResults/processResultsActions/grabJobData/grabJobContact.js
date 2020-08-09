const localWebDriver = require('../../../webDriver');
const driver = localWebDriver.get_driver();

exports.grab_job_contact = async () => {
    try {
        let contactElements = await driver.findElements({ css: '.contact-reference li'});
        if (contactElements.length > 0) {
            let contactElement = await driver.findElement({ css: '.contact-reference li'});
            let contactElementString = await contactElement.getText();
            let contactArrayName = contactElementString.split(" ");
            let discard = contactArrayName.shift();
            let contact = contactArrayName.join(" ");
            return {
                error: false,
                success: true,
                data: contact
            }
        } else {
            return {
                error: false,
                success: false,
                data: 'NOT_FOUND'
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
