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
            applyModalActive: false,
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
        if (prevState.applyModalActive !== this.state.applyModalActive) {
            if (this.state.applyModalActive) {
                this.toggleModalActive()
            }
        } else if (prevState.setCredentialsModalActive !== this.state.setCredentialsModalActive) {
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
        let jobType;
        let salaryMin;
        let salaryMax;
        let sessionLim;
        let desiredKW = userPreferences.dkw;
        let undesiredKW = userPreferences.udkw;
        let interestedKW = userPreferences.ikw;

        if (userPreferences.job_type === undefined) {
            jobType = 'FULL_TIME'
        } else {
            jobType = userPreferences.job_type
        }

        if (userPreferences.salary === undefined) {
            salaryMin = 0
            salaryMax = 0
        } else {
            salaryMin = userPreferences.salary.permanent_minimum
            salaryMax = userPreferences.salary.permanent_maximum
        }

        if (userPreferences.session_limit === undefined) {
            sessionLim = 30
        } else {
            sessionLim = userPreferences.session_limit
        }

        this.setState({
            jobType: jobType,
            salary_perm_min: salaryMin,
            salary_perm_max: salaryMax,
            session_limit: sessionLim,
            desiredKeyWords: desiredKW,
            undesiredKeyWords: undesiredKW,
            interestedKeyWords: interestedKW
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

    checkPreferencesSet = async () => {
        let userData = await this.fetchData();

        if (userData === undefined) {
            return {
                preferences_complete: false,
                message: 'No preferences set, please update below.'
            }
        } else if (userData.totalJobs_email === undefined) {
            return {
                preferences_complete: false,
                message: 'Total jobs email not set, please update below.'
            }
        } else if (userData.preferences.salary === undefined) {
            return {
                preferences_complete: false,
                message: 'Salary preferences not set, please update below x.'
            }
        } else if (userData.preferences.session_limit === undefined) {
            return {
                preferences_complete: false,
                message: 'Session limit not set, please update below.'
            }
        } else if (userData.preferences.dkw < 1) {
            return {
                preferences_complete: false,
                message: 'At least 1 desired key word should be set, please update below.'
            }
        } else if (userData.preferences.udkw < 1) {
            return {
                preferences_complete: false,
                message: 'At least 1 undesired key word should be set, please update below.'
            }
        } else if (userData.preferences.ikw < 1) {
            return {
                preferences_complete: false,
                message: 'At least 1 interested key word should be set, please update below.'
            }
        }

        if (userData.salary) {
            if (userData.salary.permanent_minimum === undefined ||
                userData.salary.permanent_maximum === undefined) {
                return {
                    preferences_complete: false,
                    message: 'Salary preferences not set, please update below y.'
                }
            }
        }

        return {
            preferences_complete: true
        }

    }

    toggleApplyModalActive = () => {
        this.setState({ applyModalActive: !this.state.applyModalActive })
    }

    toggleCredentialsModalActive = () => {
        this.setState({ setCredentialsModalActive: !this.state.setCredentialsModalActive })
    }

    togglePreferencesModalActive = () => {
        this.setState({ setPreferencesModalActive: !this.state.setPreferencesModalActive })
    }

    resetJTAndLocation = () => {
        this.setState({
            jobTitle: '',
            location: ''
        })
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

    render() {
        return(
            <div className="container">
                <BackgroundOverlay
                    modalActive={this.state.modalActive}
                />
                <PageHeader/>
                <div className="applyPage">
                    <h4 className="mt-4 mb-4">Apply For Jobs</h4>
                    <p className="mb-4">Enter desired job title, location and radius and click the apply button. JADA will log into your totalJobs account, run the job search, and process all the results, applying where the application meets your preferences.</p>
                    <ApplyForm
                        checkPreferencesSet={this.checkPreferencesSet}
                        handleChange={this.handleChange}
                        resetJTAndLocation={this.resetJTAndLocation}
                        jobTitle={this.state.jobTitle}
                        location={this.state.location}
                        toggleApplyModalActive={this.toggleApplyModalActive}
                        toggleModalActive={this.toggleModalActive}
                        applyModalActive={this.state.applyModalActive}
                    />
                    <h4 className="mt-4 mb-4">Job Search and Apply Preferences</h4>
                    <p className="mb-4">View and update the criteria that is used to asses whether a particular job application warrants applying for on your behalf.<br/>
                        Please navigate to your total jobs account to update the CV and generic cover letter.</p>
                    <SetTotalJobsCredentialsModal
                        setUserTotalJobsEmailState={this.setUserTotalJobsEmailState}
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