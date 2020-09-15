import React from "react";
import './setPreferencesModal.css';

class SetPreferencesModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalClass: 'hidden'
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

    render() {
        let modalClass = this.state.modalClass + ' setPreferencesBox'
        return (
            <div className={modalClass}>
                <form autoComplete="on" onSubmit={this.props.handleUpdatePreferences}>
                    <h4>Job Search and Apply Preferences</h4>
                    <p>View and update the criteria that is used to asses whether a particular job application warrants applying for on your behalf.<br/>
                    Please navigate to your total jobs account to update the CV and generic cover letter.
                    </p>
                    <div className="form-group row">
                        <label htmlFor="jobType" className="col-sm-3 col-form-label">Job Type:</label>
                        <div className="col-sm-9">
                            <select className="form-control" onChange={(e) => this.props.handleChange(e, 'jobType')}
                            value={this.props.jobType}>
                                <option value="FULL_TIME">Full Time</option>
                                <option value="PART_TIME">Part Time</option>
                                <option value="CONTRACTOR">Contractor</option>
                                <option value="TEMPORARY">Temporary</option>
                            </select>
                        </div>
                        <label htmlFor="salary_perm_min" className="col-sm-3 col-form-label">Salary, permanent minimum:</label>
                        <div className="col-sm-9">
                            <select className="form-control" onChange={(e) => this.props.handleChange(e, 'salary_perm_min')}
                                    value={this.props.salary_perm_min}>
                                {this.displaySalaryOptions()}
                            </select>
                        </div>
                        <label htmlFor="salary_perm_min" className="col-sm-3 col-form-label">Salary, permanent maximum:</label>
                        <div className="col-sm-9">
                            <select className="form-control" onChange={(e) => this.props.handleChange(e, 'salary_perm_max')}
                                    value={this.props.salary_perm_max}>
                                {this.displaySalaryOptions()}
                            </select>
                        </div>
                        <label htmlFor="session_limit" className="col-sm-3 col-form-label">Session Apply Limit:</label>
                        <div className="col-sm-9">
                            <input className="form-control" onChange={(e) => this.props.handleChange(e, 'session_limit')}
                                    value={this.props.session_limit}>
                            </input>
                        </div>
                        <div className="d-flex justify-content-around loginBoxBtns">
                            <button>SAVE</button>
                            <div className="signUpBtn" onClick={console.log('cancel clicked')}>CANCEL</div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default SetPreferencesModal