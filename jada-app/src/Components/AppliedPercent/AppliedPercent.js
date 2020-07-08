import React from "react";
import './appliedPercent.css';
import AppliedPercentConstructor from "./AppliedPercentConstructor/AppliedPercentConstructor";

class AppliedPercent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chartData: {}
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.applications !== this.props.applications) {
            this.updatedChartData()
        }
    }

    updatedChartData = () => {
        let applications = this.props.applications;
        let applied = 0;
        let skipped = 0;
        let data = {
            labels: ['applied', 'skipped'],
            datasets: [{
                data: [],
                backgroundColor: ['#2ecc71']
            }]
        }

        applications.forEach(application => {
            if (application.apply_attempted) {
                applied = applied + 1
            } else {
                skipped = skipped + 1
            }
        })

        data.datasets[0].data.push(applied)
        data.datasets[0].data.push(skipped)

        this.setState({ chartData: data })
    }


    render() {
        return (
            <div className="col-4 appliedPercentBox">
                <p className="boxTitle d-flex justify-content-center">APPLIED:</p>
                <AppliedPercentConstructor
                    data={this.state.chartData}
                />
            </div>
        )
    }
}

export default AppliedPercent;