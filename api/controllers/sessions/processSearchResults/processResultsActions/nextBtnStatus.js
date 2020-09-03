const localWebDriver = require('../../webDriver');
const driver = localWebDriver.get_driver();

exports.next_btn_status = async () => {
    try {
        let nextBtnElement;
        nextBtnElement = await driver.findElements({ css: '.pagination .next' });

        if (nextBtnElement.length > 0) {
            nextBtnElement = await driver.findElement({ css: '.pagination .next' });
            let nextBtnClasses = await nextBtnElement.getAttribute('class');
            let explodedBtnClasses = nextBtnClasses.split(" ");
            let disabledNextBtn = explodedBtnClasses.includes('disabled')
            return !disabledNextBtn;
        } else {
            return false
        }

    } catch (err) {
        console.log(err)
        return 'error'
    }
}

exports.test_page = async () => {
    await driver.get(`https://www.totaljobs.com/jobs/junior-developer/in-bath?radius=0&s=header`)
}