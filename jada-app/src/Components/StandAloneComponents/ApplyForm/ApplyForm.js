import React from "react";
import './applyForm.css';
import ButtonMain from "../../Buttons/ButtonMain/ButtonMain";
import ConfirmApplyModal from "../../Modals/ConfirmApplyModal/ConfirmApplyModal";

class ApplyForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: localStorage.getItem('user_id'),
            bearerToken: localStorage.getItem('bearerToken'),
            errorMessage: '',
            confirmedApply: false,
            applyPackage: {}
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.confirmedApply !== this.state.confirmedApply) {
            if (this.state.confirmedApply) {
                this.processApply().then((data) => console.log(data.success));
            }
        }
    }

    toggleConfirmedApply = () => {
        this.setState({ confirmedApply: !this.state.confirmedApply })
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

        this.props.toggleApplyModalActive();

        let applyPackage = {
            "job_title": jobTitle,
            "location": location,
            "radius": radius
        }

        this.setState({ applyPackage: applyPackage })
        this.props.resetJTAndLocation();
    }

    processApply = async () => {
        let loggedIn = await this.logInToTJAccount();

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

        // populate session overview (in alert for now cause long ting)
        alert('Apply Process Complete')
        this.toggleConfirmedApply()

        return {
            success: true,
            message: 'test passed'
        }
    }

    logInToTJAccount = async () => {
        let grabCredUrl = `http://localhost:8080/user/tj/${this.state.userId}`;
        let userData = await this.fetchRequestGET(grabCredUrl)
        if (userData.credentials.tJ_password === undefined) {
            this.setState({ errorMessage: 'Unsuccessful. Please update totaljobs log in password in credentials box below.' })
            setTimeout(() => {
                this.setState({ errorMessage: '' })
            }, 10000)
            return
        }

        let e = userData.credentials.tJ_email
        let p = userData.credentials.tJ_password
        let logInPackage = {
            "email": e,
            "encPass": p
        }
        let logInTJUrl = `http://localhost:8080/sessions/totalJobsLogIn`
        let logInRes = await this.fetchRequestPOST(logInTJUrl, logInPackage)

        if (!logInRes.success) {
            this.setState({ errorMessage: logInRes.message })
            setTimeout(() => {
                this.setState({ errorMessage: '' })
            }, 10000)
            return false
        } else if (logInRes.success) {
            return true
        }
    }

    fetchRequestPOST = async (url, reqPackage) => {
        let reqData = JSON.stringify(reqPackage);
        const res = await fetch(url, {
            method: 'POST',
            body: reqData,
            headers: {
                "Content-Type" : "application/json",
                "Authorization": "Bearer " + this.state.bearerToken
            }
        })
        let response = await res.json();
        return response
    }

    fetchRequestGET = async (url) => {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type" : "application/json",
                "Authorization": "Bearer " + this.state.bearerToken
            }
        })
        let response = await res.json();
        return response
    }

    render() {
        return (
            <div className="applyBox col-12">
                <ConfirmApplyModal
                    toggleApplyModalActive={this.props.toggleApplyModalActive}
                    toggleModalActive={this.props.toggleModalActive}
                    applyModalActive={this.props.applyModalActive}
                    toggleConfirmedApply={this.toggleConfirmedApply}
                />
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