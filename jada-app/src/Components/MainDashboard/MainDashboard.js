import React from "react";
import './mainDashboard.css';
import PageHeader from "../PageHeader/PageHeader";
import LineChartAvS from "../LineChartAvS/LineChartAvS";
import TotalProcessed from "../TotalProcessed/TotalProcessed";

class MainDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reportDate: '',
            applications: {},
            sessionDates:[],
            avsData:[{
                title: {
                    applied: 'Applied',
                    skipped: 'Skipped'
                },
                data: {
                    applied: [],
                    skipped: []
                }
            }]
        }
    }

    componentDidMount() {
        this.updateApplications();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.applications !== this.state.applications) {
            this.updateSessionDates();
        }

        if (prevState.sessionDates !== this.state.sessionDates) {
            this.updateAvSData();
            this.updateReportDate();
        }
    }

    sessionDateCount = (sessionDate, allDates) => {
        return allDates.filter(date => date === sessionDate)
    }

    updateAvSData = async () => {
        let applications = this.state.applications;
        let sessionDates = this.state.sessionDates;
        let appliedDates = [];
        let appliedDatesCount = [];
        let skippedDates = [];
        let skippedDatesCount = [];
        let avsData = [{
            title: {
                applied: 'Applied',
                skipped: 'Skipped'
            },
            data: {
                applied: [],
                skipped: []
            }
        }];
        // change for loop i to 1 to omit first run
        for (let i = 0; i < applications.length; i++) {
            if (applications[i].apply_attempted) {
                appliedDates.push(applications[i].session_date)
            } else {
                skippedDates.push(applications[i].session_date)
            }
        }

        sessionDates.forEach(date => {
            appliedDatesCount.push(this.sessionDateCount(date, appliedDates).length)
        });

        sessionDates.forEach(date => {
            skippedDatesCount.push(this.sessionDateCount(date, skippedDates).length)
        });
        // change for loop i to 1 to omit first run
        for (let i = 0; i < sessionDates.length; i++) {
            avsData[0].data.applied.push({
                "time": sessionDates[i],
                "value": appliedDatesCount[i]
            });

            avsData[0].data.skipped.push({
                "time": sessionDates[i],
                "value": skippedDatesCount[i]
            })
        }

        await this.setState({ avsData: avsData })

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

    updateReportDate = async () => {
        let dbDate = this.state.sessionDates.slice(-1)[0]
        let longDate = new Date(dbDate).toString()
        let longDateArr = longDate.split(" ")
        let shortDateArr = [longDateArr[0], longDateArr[2], longDateArr[1], longDateArr[3]]
        let date = shortDateArr.join(" ")
        await this.setState({ reportDate: date })
    }

    render() {
        return(
            <div className="container">
                <PageHeader/>
                <h2 className="d-flex justify-content-center lastSessionRun">
                    As of {this.state.reportDate}
                </h2>
                <div className="col-12 d-flex">
                    <div className="col-8">
                        <LineChartAvS
                            data={this.state.avsData[0].data}
                            title={this.state.avsData[0].title}
                            color="#3E517A"
                        />
                    </div>
                    <div className="col-4">
                        <TotalProcessed
                            applications={this.state.applications}
                        />
                    </div>


                </div>

            </div>
        )
    }
}

export default MainDashboard;