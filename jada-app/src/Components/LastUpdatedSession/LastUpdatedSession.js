import React from "react";
import './lastUpdatedSession.css';

class LastUpdatedSession extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reportDate: ''
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
    }

    updateSessionDates = async () => {
        await this.setState({ sessionDates: this.props.sessionDates })
    }

    updateReportDate = async () => {
        let dbDate = this.props.sessionDates.slice(-1)[0]
        let longDate = new Date(dbDate).toString()
        let longDateArr = longDate.split(" ")
        let shortDateArr = [longDateArr[0], longDateArr[2], longDateArr[1], longDateArr[3]]
        let date = shortDateArr.join(" ")
        await this.setState({ reportDate: date })
    }

    render() {
        return(
            <div>
                <h2 className="d-flex justify-content-center lastSessionRun">
                    As of {this.state.reportDate}
                </h2>
            </div>
        )
    }
}

export default LastUpdatedSession;