import React from "react";
import './barChartAvS.css'
import BarChartAvSConstructor from "./BarChartAvSConstructor/BarChartAvSConstructor";
import BarChartConstructor from "../BarChartConstructor/BarChartConstructor";

class BarChartAvS extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            avsData: {},
            displayTitle: false
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
        let avsData = {
            labels: ['applied', 'skipped'],
            datasets: [{
                backgroundColor: ['#2ecc71', '#e67e22'],
                data: []
            }]
        }

        avsData.datasets[0].data.push(appliedAndSkipped.applied)
        avsData.datasets[0].data.push(appliedAndSkipped.skipped)
        this.setState({ avsData: avsData })
        console.log(avsData)
    }

    render() {
        return (
            <div className="col-xl-8 barChartAvS">
                <BarChartConstructor
                    data={this.state.avsData}
                    title='Applied vrs Skipped'
                    displayTitle={this.state.displayTitle}
                />
            </div>
        )
    }
}

export default BarChartAvS;