import React from "react";
import './tablesPage.css';
import PageHeader from "../../StandAloneComponents/PageHeader/PageHeader";
import LastUpdatedSession from "../../StandAloneComponents/LastUpdatedSession/LastUpdatedSession";
import ButtonMain from "../../Buttons/ButtonMain/ButtonMain";
import TableApplications from "../../Tables/TableApplications/TableApplications";
import FilterTableByApplied from "../../StandAloneComponents/FilterTableByApplied/FilterTableByApplied";

class TablesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: localStorage.getItem('user_id'),
            applications: {},
            currentApplications: {},
            sessionDates:[],
            bearerToken: localStorage.getItem('bearerToken')
        }
    }

    componentDidMount() {
        if (this.state.bearerToken === null) {
            return window.location.replace('http://localhost:3000/')
        } else {
            this.updateApplications();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.applications !== this.state.applications) {
            this.timedRemoveToken();
            this.updateSessionDates();
        }
    }

    timedRemoveToken = () => {
        setTimeout(() => {
            localStorage.removeItem('bearerToken')
        }, 300000)
    }

    updateSessionDates = async () => {
        let data = [];
        let applications = this.state.applications;

        for (let i = 0; i < applications.length; i++) {
            data.push(applications[i].session_date)
        }

        let sessionDates = data.reduce((unique, item) =>
            unique.includes(item) ? unique : [...unique, item],[]);
        await this.setState({ sessionDates: sessionDates })
    }

    updateApplications = async () => {
        let updatedApplications = await this.fetchApplications();
        await this.setState({
            applications: updatedApplications,
            currentApplications: updatedApplications
        });
    }

    fetchApplications = async () => {
        const url = `http://localhost:8080/applications/user/${this.state.user_id}`;
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

        return data.response.applications;
    }

    toggleViewAll = () => {
        this.setState({ currentApplications: this.state.applications });
    }

    toggleViewApplied = () => {
        let applications = this.state.applications
        let currentApplications = [];
        applications.forEach(application => {
            if (application.applied) {
                currentApplications.push(application)
            }
        })

        this.setState({ currentApplications: currentApplications });
    }

    toggleViewSkipped = () => {let applications = this.state.applications;
        let currentApplications = [];
        applications.forEach(application => {
            if (application.applied === false) {
                currentApplications.push(application)
            }
        })

        this.setState({ currentApplications: currentApplications });
    }

    render() {
        return (
            <div className="container">
                <PageHeader />
                <div className="col-xl-12 d-flex justify-content-between align-items-center">
                    <LastUpdatedSession sessionDates={this.state.sessionDates} />
                    <div className="btnMainTablesPage">
                        <ButtonMain
                            buttonText="MAIN DASHBOARD"
                            cssClass=""
                            location="http://localhost:3000/dashboard"
                        />
                    </div>
                </div>
                <div className="col-xl-12">
                    <FilterTableByApplied
                        toggleViewAll={this.toggleViewAll}
                        toggleViewApplied={this.toggleViewApplied}
                        toggleViewSkipped={this.toggleViewSkipped}
                    />
                </div>
                <div className="col-xl-12 px-0">
                    <TableApplications applications={this.state.currentApplications} />
                </div>
            </div>
        );
    }
}

export default TablesPage;