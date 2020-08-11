const Applications = require('../../../../models/applicationModel');

exports.generate_session_report = async (sessionId) => {
    try {
        let applications = await Applications.find({ session_id: sessionId})


        return {
            success: true,
            data: {
                user_id: '',
                session_id: '',
                session_date: '',
                session_time: '',
                total_processed: '',
                newly_processed: '',
                successfully_applied: '',
                dkw_overview: '',
                dkw_all: '',
                udkw_overview: '',
                udkw_all: '',
                ikw_overview: '',
                ikw_all: '',
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