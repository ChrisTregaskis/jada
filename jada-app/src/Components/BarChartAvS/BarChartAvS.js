import React from "react";
import './barChartAvS.css'
import BarChartAvSConstructor from "./BarChartAvSConstructor/BarChartAvSConstructor";

class BarChartAvS extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            avsData:[]
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.applications !== this.props.applications) {
            this.updateAvSData();
        }
    }

    calculateAppliedAndSkipped = () => {
        let applications = this.props.applications;
        let applied = 0;
        let skipped = 0;

        applications.forEach(application => {
            if (application.apply_attempted) {
                applied = applied + 1
            } else {
                skipped = skipped + 1
            }
        })

        return {
            "applied": applied,
            "skipped": skipped
        }
    }

    updateAvSData = () => {
        let appliedAndSkipped = this.calculateAppliedAndSkipped();
        let avsData = [];
        avsData.push(appliedAndSkipped.applied)
        avsData.push(appliedAndSkipped.skipped)
        this.setState({ avsData: avsData })
    }

    render() {
        return (
            <div className="col-xl-8 barChartAvS">
                <BarChartAvSConstructor
                    data={this.state.avsData}
                />
            </div>
        )
    }
}

export default BarChartAvS;