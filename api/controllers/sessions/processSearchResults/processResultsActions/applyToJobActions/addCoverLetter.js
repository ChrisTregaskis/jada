const localWebDriver = require('../../../webDriver');
const driver = localWebDriver.get_driver();

exports.add_cover_letter = async () => {
    try {
        let addCoverLetterLink = await driver.findElements({ css: '.cover-letter-link' });
        if (addCoverLetterLink.length > 0) {
            let addCoverLetter = await driver.findElement({css: '.cover-letter-link'})
            await addCoverLetter.click();
            return { success: true }
        }
    } catch (err) {
        console.log(err)
        return {
            success: false,
            error: 'System error, unable to add cover letter to application'
        }
    }
}
