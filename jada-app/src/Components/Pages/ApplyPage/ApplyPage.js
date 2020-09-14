import React from "react";
import './applyPage.css';
import PageHeader from "../../StandAloneComponents/PageHeader/PageHeader";
import ApplyForm from "../../StandAloneComponents/ApplyForm/ApplyForm";
import SetPreferences from "../../StandAloneComponents/SetPreferences/SetPreferences";

class ApplyPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: localStorage.getItem('user_id'),
            bearerToken: localStorage.getItem('bearerToken'),
            jobTitle: '',
            location: '',
            radius: '0',
            jobType: 'Full Time'
        }
    }

    componentDidMount() {
        this.setStateUserPreferences();
    }

    setStateUserPreferences = async () => {
        let userPreferences = await this.fetchUserPreferences();
        this.setState({
            jobType: userPreferences.job_type
        })

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

    render() {
        return(
            <div className="container">
                <PageHeader/>
                <ApplyForm
                    handleApply={this.handleApply}
                    handleChange={this.handleChange}
                    jobTitle={this.state.jobTitle}
                    location={this.state.location}
                />
                <SetPreferences
                    handleUpdatePreferences={this.handleUpdatePreferences}
                    handleChange={this.handleChange}
                    jobType={this.state.jobType}
                />
            </div>
        )
    }
}

export default ApplyPage;