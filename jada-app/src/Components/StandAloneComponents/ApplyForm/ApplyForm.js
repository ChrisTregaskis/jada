import React from "react";
import './applyForm.css';
import ButtonMain from "../../Buttons/ButtonMain/ButtonMain";

class ApplyForm extends React.Component {

    render() {
        return (
            <div className="applyBox col-12">
                <form autoComplete="on" onSubmit={this.props.handleApply}>
                    <h4>Apply To Jobs</h4>
                    <p>Enter desired job title, location and radius and click the apply button. JADA will log into your totalJobs account, run the job search, and process all the results, applying where the application meets your preferences.</p>
                    <div className="floating-label">
                        <input placeholder="Job Title" type="text" name="jobTitle" id="jobTitle"
                               onChange={(e) => this.props.handleChange(e, 'jobTitle')}
                               autoComplete="on" value={this.props.jobTitle} required/>
                        <label htmlFor="jobTitle">Job Title:</label>
                    </div>
                    <div className="floating-label">
                        <input placeholder="Location" type="text" name="location" id="location"
                               onChange={(e) => this.props.handleChange(e, 'location')}
                               autoComplete="on" value={this.props.location} required/>
                        <label htmlFor="location">Location:</label>
                    </div>
                    <select className="form-control" onChange={(e) => this.props.handleChange(e, 'radius')}>
                        <option value="0">0 miles</option>
                        <option value="5">5 miles</option>
                        <option value="10">10 miles</option>
                        <option value="20">20 miles</option>
                        <option value="30">30 miles</option>
                    </select>
                    <div className="d-flex justify-content-between applyBoxBtns">
                        <button>APPLY</button>
                        <ButtonMain
                            buttonText="MAIN DASHBOARD"
                            cssClass=""
                            location="http://localhost:3000/dashboard"
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default ApplyForm;