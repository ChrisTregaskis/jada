import React from "react";
import './applyPage.css';
import PageHeader from "../../StandAloneComponents/PageHeader/PageHeader";
import ApplyForm from "../../StandAloneComponents/ApplyForm/ApplyForm";
import SetPreferencesModal from "../../Modals/SetPreferencesModal/SetPreferencesModal";
import KeyWordsConstructor from "../../StandAloneComponents/UserKeyWords/KeyWordsContructor/KeyWordsConstructor";
import SetTotalJobsCredentialsModal from "../../Modals/SetTotalJobsCredentialsModal/SetTotalJobsCredentialsModal";
import BackgroundOverlay from "../../StandAloneComponents/BackgroundOverlay/BackgroundOverlay";

class ApplyPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: localStorage.getItem('user_id'),
            bearerToken: localStorage.getItem('bearerToken'),
            setCredentialsModalActive: false,
            setPreferencesModalActive: false,
            modalActive: false,
            tJUserEmail: '',
            jobTitle: '',
            location: '',
            radius: '0',
            jobType: 'Full Time',
            salary_perm_min: '',
            salary_perm_max: '',
            session_limit: '',
            desiredKeyWord: '',
            desiredKeyWords: [],
            undesiredKeyWord: '',
            undesiredKeyWords: [],
            interestedKeyWord: '',
            interestedKeyWords: []
        }
    }

    componentDidMount() {
        this.setStateUserPreferences();
        this.setUserTotalJobsEmailState();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.setCredentialsModalActive !== this.state.setCredentialsModalActive) {
            if (this.state.setCredentialsModalActive) {
                this.toggleModalActive();
            }
        } else if (prevState.setPreferencesModalActive !== this.state.setPreferencesModalActive) {
            if (this.state.setPreferencesModalActive) {
                this.toggleModalActive();
            }
        }
    }

    toggleModalActive = () => {
        this.setState({ modalActive: !this.state.modalActive })
    }

    setStateUserPreferences = async () => {
        let userPreferences = await this.fetchUserPreferences();
        this.setState({
            jobType: userPreferences.job_type,
            salary_perm_min: userPreferences.salary.permanent_minimum,
            salary_perm_max: userPreferences.salary.permanent_maximum,
            session_limit: userPreferences.session_limit,
            desiredKeyWords: userPreferences.dkw,
            undesiredKeyWords: userPreferences.udkw,
            interestedKeyWords: userPreferences.ikw
        });
    }

    updateStateKeyWords = async () => {
        let userPreferences = await this.fetchUserPreferences();
        this.setState({
            desiredKeyWords: userPreferences.dkw,
            undesiredKeyWords: userPreferences.udkw,
            interestedKeyWords: userPreferences.ikw
        })
    }

    toggleCredentialsModalActive = () => {
        this.setState({ setCredentialsModalActive: !this.state.setCredentialsModalActive })
    }

    togglePreferencesModalActive = () => {
        this.setState({ setPreferencesModalActive: !this.state.setPreferencesModalActive })
    }

    setUserTotalJobsEmailState = async () => {
        let totalJobsEmail = await this.fetchUserTotalJobsEmail();
        this.setState({ tJUserEmail: totalJobsEmail })
    }

    clearStateKW = (stateKeyWord) => {
        if (stateKeyWord === 'desiredKeyWord') {
            this.setState({ desiredKeyWord: '' })
        } else if (stateKeyWord === 'undesiredKeyWord') {
            this.setState({ undesiredKeyWord: '' })
        } else if (stateKeyWord === 'interestedKeyWord') {
            this.setState({ interestedKeyWord: ''})
        }
    }

    fetchUserTotalJobsEmail = async () => {
        let userData = await this.fetchData();
        return userData.totalJobs_email
    }

    fetchUserPreferences = async () => {
        let userData = await this.fetchData()
        return userData.preferences;
    }

    fetchData = async () => {
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
        return data.user;
    }

    handleChange = (e, stateProperty) => {
        let updatedData = {};
        updatedData[stateProperty] = e.target.value;
        this.setState(updatedData)
    }

    handleApply = (e) => {
        e.preventDefault();
        console.log('handling apply...')
        this.setState({
            jobTitle: '',
            location: ''
        })
    }

    render() {
        return(
            <div className="container">
                <BackgroundOverlay
                    modalActive={this.state.modalActive}
                />
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
                    <SetTotalJobsCredentialsModal
                        tJUserEmail={this.state.tJUserEmail}
                        setCredentialsModalActive={this.state.setCredentialsModalActive}
                        toggleCredentialsModal={this.toggleCredentialsModalActive}
                        toggleModalActive={this.toggleModalActive}
                    />
                    <div className="totalJobsDetailsBox mt-4 mb-4">
                        <div className="d-flex justify-content-between">
                            <p><span className="preferenceTitle">Totaljobs log in email: </span>{this.state.tJUserEmail}</p>
                            <button className="defaultBtn" onClick={this.toggleCredentialsModalActive}>UPDATE</button>
                        </div>
                    </div>
                    <SetPreferencesModal
                        setPreferencesModalActive={this.state.setPreferencesModalActive}
                        togglePreferencesModalActive={this.togglePreferencesModalActive}
                        toggleModalActive={this.toggleModalActive}
                        handleChange={this.handleChange}
                        jobType={this.state.jobType}
                        salary_perm_min={this.state.salary_perm_min}
                        salary_perm_max={this.state.salary_perm_max}
                        session_limit={this.state.session_limit}
                    />
                    <div className="preferencesStaticBox mt-4 mb-4">
                        <div className="d-flex justify-content-between">
                            <p><span className="preferenceTitle">Job type: </span>{this.state.jobType}</p>
                            <button className="defaultBtn" onClick={this.togglePreferencesModalActive}>UPDATE</button>
                        </div>
                        <p><span className="preferenceTitle">Salary, permanent minimum: </span><span>£</span>{this.state.salary_perm_min}</p>
                        <p><span className="preferenceTitle">Salary, permanent maximum: </span><span>£</span>{this.state.salary_perm_max}</p>
                        <p><span className="preferenceTitle">Session limit: </span>{this.state.session_limit}</p>
                    </div>
                    <KeyWordsConstructor
                        updateStateKeyWords={this.updateStateKeyWords}
                        handleChange={this.handleChange}
                        clearStateKW={this.clearStateKW}
                        preferenceTitle='Desired Key Words: '
                        placeHolder='Input desired key word... '
                        id='desiredKeyWord'
                        stateProperty='desiredKeyWord'
                        stateValue={this.state.desiredKeyWord}
                        keyWordsList={this.state.desiredKeyWords}
                        dbProperty='dkw'
                    />
                    <KeyWordsConstructor
                        updateStateKeyWords={this.updateStateKeyWords}
                        handleChange={this.handleChange}
                        clearStateKW={this.clearStateKW}
                        preferenceTitle='Undesirable Key Words: '
                        placeHolder='Input undesirable key word... '
                        id='undesiredKeyWord'
                        stateProperty='undesiredKeyWord'
                        stateValue={this.state.undesiredKeyWord}
                        keyWordsList={this.state.undesiredKeyWords}
                        dbProperty='udkw'
                    />
                    <KeyWordsConstructor
                        updateStateKeyWords={this.updateStateKeyWords}
                        handleChange={this.handleChange}
                        clearStateKW={this.clearStateKW}
                        preferenceTitle='Interested Key Words: '
                        placeHolder='Input interested key word... '
                        id='interestedKeyWord'
                        stateProperty='interestedKeyWord'
                        stateValue={this.state.interestedKeyWord}
                        keyWordsList={this.state.interestedKeyWords}
                        dbProperty='ikw'
                    />
                </div>
            </div>
        )
    }
}

export default ApplyPage;