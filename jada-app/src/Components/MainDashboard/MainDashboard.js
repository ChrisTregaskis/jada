import React from "react";
import './mainDashboard.css';
import PageHeader from "../PageHeader/PageHeader";
import TotalProcessed from "../TotalProcessed/TotalProcessed";
import LineChartAvS from "../LineChartAvS/LineChartAvS";
import LastUpdatedSession from "../LastUpdatedSession/LastUpdatedSession";

class MainDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            applications: {},
            sessionDates:[]
        }
    }

    componentDidMount() {
        this.updateApplications();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.applications !== this.state.applications) {
            this.updateSessionDates();
        }
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
        await this.setState({ applications: updatedApplications });
    }

    fetchApplications = async () => {
        const url = 'http://localhost:8080/applications/';
        let data = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });

        data = await data.json();
        if (data.response.status !== 200) {
            console.log('ERROR: unable to get application data')
            console.log(data.response.status)
            return {}
        }

        return data.response.applications;
    }

    render() {
        return(
            <div className="container">
                <PageHeader/>
                <LastUpdatedSession
                    sessionDates={this.state.sessionDates}
                />
                <div className="col-12 d-flex">
                    <LineChartAvS
                        applications={this.state.applications}
                        sessionDates={this.state.sessionDates}
                    />
                    <TotalProcessed
                        applications={this.state.applications}
                    />
                </div>

            </div>
        )
    }
}

export default MainDashboard;