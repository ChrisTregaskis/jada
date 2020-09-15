import React from "react";
import './applyPage.css';
import PageHeader from "../../StandAloneComponents/PageHeader/PageHeader";
import ApplyForm from "../../StandAloneComponents/ApplyForm/ApplyForm";
import SetPreferencesModal from "../../Modals/SetPreferencesModal/SetPreferencesModal";

class ApplyPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: localStorage.getItem('user_id'),
            bearerToken: localStorage.getItem('bearerToken'),
            modalActive: false,
            jobTitle: '',
            location: '',
            radius: '0',
            jobType: 'Full Time',
            salary_perm_min: '',
            salary_perm_max: '',
            session_limit: '',
            desiredKeyWord: '',
            desiredKeyWords: []
        }
    }

    componentDidMount() {
        this.setStateUserPreferences();
    }

    setStateUserPreferences = async () => {
        let userPreferences = await this.fetchUserPreferences();
        this.setState({
            jobType: userPreferences.job_type,
            salary_perm_min: userPreferences.salary.permanent_minimum,
            salary_perm_max: userPreferences.salary.permanent_maximum,
            session_limit: userPreferences.session_limit,
            desiredKeyWords: userPreferences.dkw
        });
    }

    fetchUserPreferences = async () => {
        const url = `http://localhost:8080/user/${this.state.user_id}`;
        let data = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.state.bearerToken
            }
        });
        let responseStatus = data.status;
        data = await data.json();
        if (responseStatus !== 200) {
            return []
        }
        console.log(data.user.preferences)
        return data.user.preferences;
    }

    handleChange = (e, stateProperty) => {
        let updatedData = {};
        updatedData[stateProperty] = e.target.value;
        this.setState(updatedData)
    }

    handleApply = (e) => {
        e.preventDefault();
        console.log(this.state)
        this.setState({
            jobTitle: '',
            location: ''
        })
    }

    handleUpdatePreferences = (e) => {
        console.log('updating preferences...')
    }

    handleDKWSubmit = (e) => {
        console.log('adding dkw...')
    }

    displayKW = (keyWords) => {
        let keyWordsHTML = []
        keyWords.forEach(kw => {
            keyWordsHTML.push(<div className="defaultClearBtn mr-4 mb-4 deleteIcon">{kw}</div> )
        })
        return keyWordsHTML
    }

    render() {
        return(
            <div className="container">
                <PageHeader/>
                <div className="applyPage">
                    <h4 className="mt-4 mb-4">Apply To Jobs</h4>
                    <p className="mb-4">Enter desired job title, location and radius and click the apply button. JADA will log into your totalJobs account, run the job search, and process all the results, applying where the application meets your preferences.</p>
                    <ApplyForm
                        handleApply={this.handleApply}
                        handleChange={this.handleChange}
                        jobTitle={this.state.jobTitle}
                        location={this.state.location}
                    />
                    <h4 className="mt-4 mb-4">Job Search and Apply Preferences</h4>
                    <p className="mb-4">View and update the criteria that is used to asses whether a particular job application warrants applying for on your behalf.<br/>
                        Please navigate to your total jobs account to update the CV and generic cover letter.</p>
                    <SetPreferencesModal
                        handleUpdatePreferences={this.handleUpdatePreferences}
                        handleChange={this.handleChange}
                        jobType={this.state.jobType}
                        salary_perm_min={this.state.salary_perm_min}
                        salary_perm_max={this.state.salary_perm_max}
                        session_limit={this.state.session_limit}
                    />
                    <div className="preferencesStaticBox mt-4 mb-4">
                        <div className="d-flex justify-content-between">
                            <p><span className="preferenceTitle">Job type: </span>{this.state.jobType}</p>
                            <button className="defaultBtn" onClick={console.log('update clicked')}>UPDATE</button>
                        </div>
                        <p><span className="preferenceTitle">Salary, permanent minimum: </span><span>£</span>{this.state.salary_perm_min}</p>
                        <p><span className="preferenceTitle">Salary, permanent maximum: </span><span>£</span>{this.state.salary_perm_max}</p>
                        <p><span className="preferenceTitle">Session limit: </span>{this.state.session_limit}</p>
                    </div>
                    <div className="keyWordsBox">
                        <form autoComplete="on" onSubmit={this.handleDKWSubmit}>
                            <p className="preferenceTitle d-inline">Desired Key Words:</p>
                            <div className="keyWordFormInput">
                                <div className="floating-label mr-4">
                                    <input placeholder="Input desired key word..." type="text" name="keyWord" id="desiredKeyWord"
                                           onChange={(e) => this.handleChange(e, 'desiredKeyWord')}
                                           autoComplete="on" value={this.state.desiredKeyWord} required/>
                                    <label htmlFor="location">Desired Key Word:</label>
                                </div>
                                <button className="defaultBtn kwAddBtn">ADD</button>
                            </div>
                        </form>
                        <div className="keyWords">
                            {this.displayKW(this.state.desiredKeyWords)}

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ApplyPage;