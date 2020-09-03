const Application = require('../../models/applicationModel')

exports.delete_application = (req, res, next) => {
    const id = req.params.applicationId
    Application
        .deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                status: 200,
                message: 'application deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:8080/applications',
                    desc: 'add a new application to db',
                    body: { jobTitle: 'String'}
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                error: err
            })
        });
}