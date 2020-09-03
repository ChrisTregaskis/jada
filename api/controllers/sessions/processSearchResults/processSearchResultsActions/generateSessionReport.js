const Applications = require('../../../../models/applicationModel');

exports.generate_session_report = async (userId, sessionDetail, totalProcessed) => {
    try {
        let applications = await Applications.find({ session_id: sessionDetail.session_id })
        let applied = 0;
        let dkwAll = [];
        let udkwAll = [];
        let ikwAll = [];
        let locationAll = [];

        for (let i=0; i < applications.length; i++) {
            if (applications[i].applied) {
                applied++
            }

            dkwAll.push(...applications[i].found_dkw)
            udkwAll.push(...applications[i].found_udkw)
            ikwAll.push(...applications[i].found_ikw)
            locationAll.push(applications[i].location)

        }

        let dkwOverview = remove_duplicates(dkwAll);
        let udkwOverview = remove_duplicates(udkwAll);
        let ikwOverview = remove_duplicates(ikwAll);
        let locationsOverview = remove_duplicates(locationAll);
        let skippedApplications = applications.length - applied;

        return {
            success: true,
            data: {
                user_id: userId,
                session_id: sessionDetail.session_id,
                session_date: sessionDetail.session_date,
                session_time: sessionDetail.session_time,
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
                locations_overview: locationsOverview,
                locations_all : locationAll
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
