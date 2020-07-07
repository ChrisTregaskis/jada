import React from "react";
import './totalProcessed.css';
import CountUp from "react-countup";

class TotalProcessed extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            applicationsCount: 0
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.applications !== this.props.applications) {
            this.setState({ applicationsCount: this.props.applications.length })
        }
    }


    render() {
        return (
            <div className="totalProcessedBox">
                <p className="totalProcessedTitle">TOTAL</p>
                <p className="totalProcessedTitle">PROCESSED:</p>
                <p className="totalProcessedFigure">
                    <CountUp end={this.state.applicationsCount}/>
                </p>
            </div>
        )
    }
}

export default TotalProcessed;