const localWebDriver = require('../../../webDriver');
const driver = localWebDriver.get_driver();

exports.grab_totalJobs_ref = async () => {
    try {
        let tJRefElements = await driver.findElements({ css: '.contact-reference li:nth-child(2)'});
        if (tJRefElements.length > 0) {
            let tJRefElement = await driver.findElement({ css: '.contact-reference li:nth-child(2)'});
            let tJRefString = await tJRefElement.getText();
            let tJRefArray = tJRefString.split(" ");
            let discard = tJRefArray.shift();
            let tJRef = tJRefArray.join(" ");
            return {
                error: false,
                success: true,
                data: tJRef
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
