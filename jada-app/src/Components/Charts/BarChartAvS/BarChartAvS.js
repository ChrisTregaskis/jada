import React from "react";
import './barChartAvS.css'
import BarChartHorizontalConstructor
    from "../../Constructors/BarChartHorizontalContructor/BarChartHorizontalConstructor";

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
            labels: ['Applied', 'Skipped'],
            datasets: [{
                backgroundColor: ['#2ecc71', '#e67e22'],
                data: []
            }]
        }

        avsData.datasets[0].data.push(appliedAndSkipped.applied)
        avsData.datasets[0].data.push(appliedAndSkipped.skipped)
        this.setState({ avsData: avsData })
    }

    render() {
        return (
            <div className="col-xl-6 barChartAvS">
                <BarChartHorizontalConstructor
                    data={this.state.avsData}
                    title='Applied vrs Skipped'
                    displayTitle={this.state.displayTitle}
                />
            </div>
        )
    }
}

export default BarChartAvS;