const localWebDriver = require('../../webDriver');
const driver = localWebDriver.get_driver();
const { navigate_to_edit_application_page } = require('./applyToJobActions/navigateToEditApplicationPage');
const { add_cover_letter } = require('./applyToJobActions/addCoverLetter');
const { click_apply } = require('./applyToJobActions/clickApply');

exports.apply_to_job = async () => {
    try {
        let applyPage = await navigate_to_edit_application_page();
        if (applyPage.error || !(applyPage.success)) { return applyPage }

        let addedCoverLetter = await add_cover_letter();
        if (addedCoverLetter.error) { return addedCoverLetter }

        let applied = await click_apply();
        if (applied.error) { return applied }

        return { success: true }

    } catch (err) {
        return {
            success: false,
            error: err
        }
    }
}