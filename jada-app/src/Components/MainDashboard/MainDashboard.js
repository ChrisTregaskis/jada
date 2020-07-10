import React from "react";
import './mainDashboard.css';
import PageHeader from "../PageHeader/PageHeader";
import TotalProcessed from "../TotalProcessed/TotalProcessed";
import LineChartAvS from "../Charts/LineChartAvS/LineChartAvS";
import LastUpdatedSession from "../LastUpdatedSession/LastUpdatedSession";
import AppliedPercent from "../Charts/AppliedPercent/AppliedPercent";
import BarChartAvS from "../Charts/BarChartAvS/BarChartAvS";
import BarChartDKW from "../Charts/BarChartDKW/BarChartDKW";
import BarChartUDKW from "../Charts/BarChartUDKW/BarChartUDKW";
import BarChartLocations from "../Charts/BarChartLocations/BarChartLocations";
import PercentJavaScript from "../Charts/PercentJavaScript/PercentJavaScript";
import PercentPHP from "../Charts/PercentPHP/PercentPHP";
import PercentNET from "../Charts/PercentNET/PercentNET";
import PercentPython from "../Charts/PercentPython/PercentPython";
import BarChartTop24 from "../Charts/BarChartTop24/BarChartTop24";
import ButtonMain from "../Buttons/ButtonMain/ButtonMain";

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
                <div className="col-xl-12 d-flex justify-content-around">
                    <LastUpdatedSession sessionDates={this.state.sessionDates} />
                    <ButtonMain
                        buttonText="ALL APPLICATIONS"
                        cssClass="d-flex justify-content-center"
                        location="http://localhost:3000/tables"
                    />
                </div>
                <div className="col-xl-12 d-flex">
                    <LineChartAvS
                        applications={this.state.applications}
                        sessionDates={this.state.sessionDates}
                    />
                    <TotalProcessed applications={this.state.applications} />
                </div>
                <div className="col-xl-12 d-flex">
                    <AppliedPercent applications={this.state.applications} />
                    <BarChartAvS applications={this.state.applications} />
                </div>
                <h2 className="d-flex justify-content-center">
                    Found KEY Words and Locations
                </h2>
                <div className="col-xl-12 d-flex">
                    <BarChartDKW applications={this.state.applications} />
                    <div className="col-xl-6 d-flex flex-wrap">
                        <BarChartUDKW applications={this.state.applications} />
                        <BarChartLocations applications={this.state.applications} />
                    </div>
                </div>
                <h2 className="d-flex justify-content-center">
                    Overview of Top 24 Programming Languages
                </h2>
                <p className="d-flex justify-content-center">
                    Of the total applications processed...
                </p>
                <div className="col-xl-12 d-flex flex-wrap">
                    <PercentJavaScript applications={this.state.applications} />
                    <PercentPHP applications={this.state.applications} />
                    <PercentPython applications={this.state.applications} />
                    <PercentNET applications={this.state.applications} />
                </div>
                <div className="col-xl-12">
                    <BarChartTop24 applications={this.state.applications} />
                </div>
            </div>
        )
    }
}

export default MainDashboard;