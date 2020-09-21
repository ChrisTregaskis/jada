import React from "react";
import './applyForm.css';
import ButtonMain from "../../Buttons/ButtonMain/ButtonMain";

class ApplyForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: ''
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let jobTitle = this.props.jobTitle
        let location = this.props.location
        let radius = e.target.childNodes[2].value

        let preferencesSet = await this.props.checkPreferencesSet();
        if (!preferencesSet.preferences_complete) {
            this.setState({ errorMessage: preferencesSet.message })
            setTimeout(() => {
                this.setState({ errorMessage: '' })
            }, 5000)
            return
        }
        let applyPackage = {
            "job_title": jobTitle,
            "location": location,
            "radius": radius
        }

        let processedApply = await this.processApply(applyPackage)

        this.props.resetJTAndLocation();
    }

    processApply = async (applyPackage) => {
        // navigate to website and log in route
            // expected package: {
                // 	"email": "chris.tregaskis.work@gmail.com",
                // 	"encPass": "ce5431ac4b132fe974ee7b6e3d251f"
                // }

        // enter search with apply package
            // expected package: {
                // 	"job_title": "   Junior Software *)£@Engineer",
                // 	"location": "  Bath   ",
                // 	"radius": 20
                // }

        // process search results
            // expected package: {
                // 	"user_id": "5f102d3ce9647c31b2f1e92b"
                // }

        // log out
            // just requires authentication

        // return success true or false
    }

    render() {
        return (
            <div className="applyBox col-12">
                <form autoComplete="on" onSubmit={this.handleSubmit}>
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
                <p className="errMsg text-danger text-center">{this.state.errorMessage}</p>
            </div>
        );
    }
}

export default ApplyForm;