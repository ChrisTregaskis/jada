import React from "react";
import './appliedPercent.css';
import AppliedPercentConstructor from "./AppliedPercentConstructor/AppliedPercentConstructor";

class AppliedPercent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chartData: {},
            percentApplied: 0
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.applications !== this.props.applications) {
            this.updatedChartData()
            this.updatePercentApplied()
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

    updatedChartData = () => {
        let appliedAndSkipped = this.calculateAppliedAndSkipped();
        let data = {
            labels: ['applied', 'skipped'],
            datasets: [{
                data: [],
                backgroundColor: ['#2ecc71']
            }]
        }

        data.datasets[0].data.push(appliedAndSkipped.applied)
        data.datasets[0].data.push(appliedAndSkipped.skipped)

        this.setState({ chartData: data })
    }

    updatePercentApplied = () => {
        let appliedAndSkipped = this.calculateAppliedAndSkipped();
        let applied = appliedAndSkipped.applied;
        let skipped = appliedAndSkipped.skipped;
        let total = applied + skipped;
        let percentage = ((applied / total) * 100).toFixed(0);
        this.setState({ percentApplied: percentage})
    }

    render() {
        return (
            <div className="col-4 appliedPercentBox">
                <p className="boxTitle d-flex justify-content-center">APPLIED:</p>
                <AppliedPercentConstructor
                    data={this.state.chartData}
                    percentApplied={this.state.percentApplied}
                />
            </div>
        )
    }
}

export default AppliedPercent;