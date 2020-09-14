import React from "react";
import './setPreferences.css';

class SetPreferences extends React.Component {

    render() {
        return (
            <div className="setPreferencesBox">
                <form autoComplete="on" onSubmit={this.props.handleUpdatePreferences}>
                    <h4>Job Search and Apply Preferences</h4>
                    <p>View and update the criteria that is used to asses whether a particular job application warrants applying for on your behalf.<br/>
                    Please navigate to your total jobs account to update the CV and generic cover letter.
                    </p>
                    <div className="form-group row">
                        <label htmlFor="jobType" className="col-sm-2 col-form-label">Job Type:</label>
                        <div className="col-sm-10">
                            <select className="form-control" onChange={(e) => this.props.handleChange(e, 'jobType')}
                            value={this.props.jobType}>
                                <option value="FULL_TIME">Full Time</option>
                                <option value="PART_TIME">Part Time</option>
                                <option value="CONTRACTOR">Contractor</option>
                                <option value="TEMPORARY">Temporary</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default SetPreferences