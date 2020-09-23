import React from "react";
import './setPreferencesModal.css';

class SetPreferencesModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: localStorage.getItem('user_id'),
            bearerToken: localStorage.getItem('bearerToken'),
            modalClass: 'hidden',
            errorMessage: ''
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.setPreferencesModalActive !== this.props.setPreferencesModalActive) {
            if (this.props.setPreferencesModalActive) {
                this.setState({ modalClass: 'displayed' })
            } else if (!this.props.setPreferencesModalActive) {
                this.setState({ modalClass: 'hidden' })
            }
        }
    }


    displaySalaryOptions = () => {
        let optionsHTML = []
        let value = 0
        for (let i=0; value<200000; i++) {
            value = value + 500
            optionsHTML.push(<option key={value} value={value}>{value}</option>)
        }
        return optionsHTML
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let updatePackage = {
            "job_type": this.props.jobType,
            "salary": {
                permanent_minimum: parseInt(this.props.salary_perm_min),
                permanent_maximum: parseInt(this.props.salary_perm_max)

            },
            "session_limit": parseInt(this.props.session_limit)
        }

        let preferencesUpdated = await this.updatePreferences(updatePackage)

        if (!preferencesUpdated) {
            this.setState({ errorMessage: 'Unable to update preferences.' })
            setTimeout(() => {
                this.setState({ errorMessage: '' })
            }, 5000)
            return
        } else if (preferencesUpdated) {
            alert('successfully updated preferences')
            this.props.togglePreferencesModalActive();
            this.props.toggleModalActive();
        }
    }

    updatePreferences = async (preferences) => {
        let reqData = JSON.stringify(preferences);
        let url = `http://localhost:8080/user/preferences/${this.state.userId}`;
        const res = await fetch(url, {
            method: 'PUT',
            body: reqData,
            headers: {
                "Content-Type" : "application/json",
                "Authorization": "Bearer " + this.state.bearerToken
            }
        })
        let response = await res.json();
        return response.success
    }

    closeModal = () => {
        this.props.togglePreferencesModalActive();
        this.props.toggleModalActive();
    }

    render() {
        let modalClass = this.state.modalClass + ' setPreferencesBox'
        return (
            <div className={modalClass}>
                <form autoComplete="on" onSubmit={this.handleSubmit}>
                    <h4>Update Apply Preferences</h4>
                    <p>Set the criteria that is used to asses whether a particular job application warrants applying for on your behalf.</p>
                    <p className="mb-4">Please navigate to your total jobs account to update the CV and generic cover letter.</p>
                    <div className="form-group row">
                        <label htmlFor="jobType" className="col-sm-4 col-form-label mb-3">Job Type:</label>
                        <div className="col-sm-8 mb-3">
                            <select className="form-control" onChange={(e) => this.props.handleChange(e, 'jobType')}
                            value={this.props.jobType}>
                                <option value="FULL_TIME">Full Time</option>
                                <option value="PART_TIME">Part Time</option>
                                <option value="CONTRACTOR">Contractor</option>
                                <option value="TEMPORARY">Temporary</option>
                            </select>
                        </div>
                        <label htmlFor="salary_perm_min" className="col-sm-4 col-form-label mb-3">Salary, permanent minimum:</label>
                        <div className="col-sm-8 mb-3">
                            <select className="form-control" onChange={(e) => this.props.handleChange(e, 'salary_perm_min')}
                                    value={this.props.salary_perm_min}>
                                {this.displaySalaryOptions()}
                            </select>
                        </div>
                        <label htmlFor="salary_perm_min" className="col-sm-4 col-form-label mb-3">Salary, permanent maximum:</label>
                        <div className="col-sm-8 mb-3">
                            <select className="form-control" onChange={(e) => this.props.handleChange(e, 'salary_perm_max')}
                                    value={this.props.salary_perm_max}>
                                {this.displaySalaryOptions()}
                            </select>
                        </div>
                        <label htmlFor="session_limit" className="col-sm-4 col-form-label mb-3">Session Apply Limit:</label>
                        <div className="col-sm-8 mb-3">
                            <input className="form-control" onChange={(e) => this.props.handleChange(e, 'session_limit')}
                                    value={this.props.session_limit}>
                            </input>
                        </div>
                        <div className="setPreferencesBoxBtns mt-4">
                            <button className="defaultBtn">SAVE</button>
                            <div className="defaultClearBtn" onClick={this.closeModal}>CANCEL</div>
                        </div>
                    </div>
                </form>
                <p className="errMsg text-danger text-center">{this.state.errorMessage}</p>
            </div>
        );
    }
}

export default SetPreferencesModal