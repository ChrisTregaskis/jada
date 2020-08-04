const { validate_type, sanitize_string } = require('../../../Entities/validationEntity')
const { enter_job_title, enter_location, enter_radius } = require('../runJobSearch/runJobSearchActions');

exports.enter_search = async (req, res, next) => {
    const reqJobTitle = req.body.job_title;
    const reqLocation = req.body.location;
    const reqRadius = req.body.radius;

    if (!(validate_type(reqJobTitle, 'string')) ||
        !(validate_type(reqLocation, 'string')) ||
        !(validate_type(reqRadius, 'number'))) {
        await res.status(400).json({
            success: false,
            message: 'Incorrect data types submitted',
            expected_types: {
                job_title: "string",
                location: "string",
                radius: "number"
            }
        })
        return
    }

    const jobTitle = sanitize_string(reqJobTitle.trim());
    const location = sanitize_string(reqLocation.trim());
    let radiusOptions = [0, 5, 10, 20, 30];
    let radiusValid = radiusOptions.includes(reqRadius);
    if (!radiusValid) {
        await res.status(400).json({
            success: false,
            message: 'Incorrect radius number',
            expected_options: [0, 5, 10, 20, 30]
        })
        return
    }

    try {
        await enter_job_title(jobTitle)
        await enter_location(location)
        await enter_radius(reqRadius)
        await res.status(200).json({
            success: true,
            search: {
                job_title: jobTitle,
                location: location,
                radius: reqRadius
            },
            message: 'Successfully entered search and found results'
        })
    } catch (err) {
        console.log(err)
        await res.status(500).json({
            success: false,
            message: 'system error'
        })
    }

}