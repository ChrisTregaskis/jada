const Applications = require('../../../../models/applicationModel');

exports.generate_session_report = async (sessionId, totalProcessed) => {
    try {
        let applications = await Applications.find({ session_id: sessionId })
        let applicationOne = applications[0]
        let applied = 0;
        let dkwAll = [];
        let udkwAll = [];
        let ikwAll = [];

        for (let i=0; i < applications.length; i++) {
            if (applications[i].applied) {
                applied++
            }

            dkwAll.push(...applications[i].found_dkw)
            udkwAll.push(...applications[i].found_udkw)
            ikwAll.push(...applications[i].found_ikw)

        }

        let dkwOverview = remove_duplicates(dkwAll);
        let udkwOverview = remove_duplicates(udkwAll);
        let ikwOverview = remove_duplicates(ikwAll);
        let skippedApplications = applications.length - applied;

        return {
            success: true,
            data: {
                user_id: applicationOne.user_id,
                session_id: applicationOne.session_id,
                session_date: applicationOne.session_date,
                session_time: applicationOne.session_time,
                total_processed: totalProcessed,
                newly_processed: applications.length,
                successfully_applied: applied,
                skipped_applications: skippedApplications,
                dkw_overview: dkwOverview,
                dkw_all: dkwAll,
                udkw_overview: udkwOverview,
                udkw_all: udkwAll,
                ikw_overview: ikwOverview,
                ikw_all: ikwAll,
                locations_overview: '',
                locations_all : ''
            }
        }
    } catch (err) {
        console.log(err)
        return {
            success: false,
            message: 'System error, failed to generate session report',
            error: err
        }
    }

}

function remove_duplicates(array) {
    return array.reduce((unique, item) =>
        unique.includes(item) ? unique : [...unique, item],[]);
}
