const localWebDriver = require('../../webDriver');
const driver = localWebDriver.get_driver();

exports.grab_page_tJ_ids = async () => {
    let pageJobIds = [];

    try {
        let jobs = await driver.findElements({ className: 'job' })
        for (let i=0; i < jobs.length; i++) {
            let currentElement = await jobs[i];
            let currentJobId = await currentElement.getAttribute('id');
            if (currentJobId.length > 0) {
                pageJobIds.push(currentJobId);
            }
        }
        return pageJobIds;
    } catch (err) {
        console.log(err)
        return false
    }

}
