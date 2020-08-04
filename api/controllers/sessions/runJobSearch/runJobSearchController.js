const { enter_job_title, enter_location, enter_radius } = require('../runJobSearch/runJobSearchActions');

exports.enter_search = async (req, res, next) => {
    const reqJobTitle = req.body.job_title;
    const reqLocation = req.body.location;
    const reqRadius = req.body.radius;

    // validate and sanitize data

    try {
        await enter_job_title(reqJobTitle)
        await enter_location(reqLocation)
        await enter_radius(reqRadius)
        await res.status(200).json({ message: 'I hear ya!'})
    } catch (err) {
        await res.status(500).json({ error: err })
    }

}