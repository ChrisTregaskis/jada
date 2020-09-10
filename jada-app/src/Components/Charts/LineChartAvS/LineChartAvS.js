import React from "react";
import LineChartAvSConstructor from "./LineChartAvSConstructor/LineChartAvSConstructor";

class LineChartAvS extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
        this.setState({
            applications: this.props.applications,
            sessionDates: this.props.sessionDates
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.applications !== this.state.applications) {
            this.setState({
                applications: this.props.applications,
                sessionDates: this.props.sessionDates
            })
        }

        if (prevState.sessionDates !== this.state.sessionDates) {
            this.updateAvSData();
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
            if (applications[i].applied) {
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


    render() {
        return(
            <div className="col-xl-8">
                <LineChartAvSConstructor
                    data={this.state.avsData[0].data}
                    title={this.state.avsData[0].title}
                    color="#3E517A"
                />
            </div>

        )
    }
}

export default LineChartAvS;