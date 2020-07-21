import React from "react";
import './lastUpdatedSession.css';

class LastUpdatedSession extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reportDate: 'loading...'
        }
    }

    componentDidMount() {
        this.updateSessionDates();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.sessionDates !== this.props.sessionDates) {
            this.updateSessionDates();
            this.updateReportDate();
        }

        if (this.state.reportDate === 'Tue 01 Jan 1901') {
            this.setState({
                reportDate: 'No session run yet'
            })
        }
    }

    updateSessionDates = async () => {
        await this.setState({ sessionDates: this.props.sessionDates })
    }

    findMostRecentData = () => {
        let dbDate = this.props.sessionDates;
        let latestDate = '1901-01-01';
        dbDate.forEach(date => {
            if (date > latestDate) {
                latestDate = date;
            }
        })
        return latestDate
    }

    updateReportDate = async () => {
        let dbDate = this.findMostRecentData()
        let longDate = new Date(dbDate).toString()
        let longDateArr = longDate.split(" ")
        let shortDateArr = [longDateArr[0], longDateArr[2], longDateArr[1], longDateArr[3]]
        let date = shortDateArr.join(" ")
        await this.setState({ reportDate: date })
    }

    render() {
        return(
            <div>
                <h4 className="lastSessionRun">
                    Last run session: {this.state.reportDate}
                </h4>
            </div>
        )
    }
}

export default LastUpdatedSession;