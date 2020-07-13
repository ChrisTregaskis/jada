import React from "react";
import './tablesPage.css';
import PageHeader from "../../StandAloneComponents/PageHeader/PageHeader";
import LastUpdatedSession from "../../StandAloneComponents/LastUpdatedSession/LastUpdatedSession";
import ButtonMain from "../../Buttons/ButtonMain/ButtonMain";
import TableApplications from "../../Tables/TableApplications/TableApplications";
import ButtonMainToggle from "../../Buttons/ButtonMainToggle/ButtonMainToggle";

class TablesPage extends React.Component {
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

    toggleViewAll = () => {
        console.log('clicked! - view all')
    }

    toggleViewApplied = () => {
        console.log('clicked! - view applied')
    }

    toggleViewSkipped = () => {
        console.log('clicked! - view skipped')
    }

    render() {
        return (
            <div className="container">
                <PageHeader />
                <div className="d-flex justify-content-center">
                    <LastUpdatedSession sessionDates={this.state.sessionDates} />
                </div>
                <div className="d-flex justify-content-around tablePageButtons">
                    <div className="buttonMainTablesPage">
                        <ButtonMainToggle
                            buttonText="ALL"
                            handleClick={this.toggleViewAll}
                        />
                    </div>
                    <div className="buttonMainTablesPage">
                        <ButtonMainToggle
                            buttonText="APPLIED"
                            handleClick={this.toggleViewApplied}
                        />
                    </div>
                    <div className="buttonMainTablesPage">
                        <ButtonMainToggle
                            buttonText="SKIPPED"
                            handleClick={this.toggleViewSkipped}
                        />
                    </div>
                    <div className="buttonMainTablesPage">
                        <ButtonMain
                            buttonText="MAIN DASHBOARD"
                            cssClass="d-flex justify-content-center"
                            location="http://localhost:3000/"
                        />
                    </div>
                </div>
                <div className="col-xl-12">
                    <TableApplications applications={this.state.applications} />
                </div>
            </div>
        );
    }
}

export default TablesPage;