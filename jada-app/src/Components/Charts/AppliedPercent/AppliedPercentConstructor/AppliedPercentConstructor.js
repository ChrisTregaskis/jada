import React from "react";
import Chart from "chart.js";
import './appliedPercentConstructor.css';
import CountUp from "react-countup";

class AppliedPercentConstructor extends React.Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();

        this.state = {
            percentApplied: 0
        }
    }

    componentDidMount() {
        this.produceChart()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.myChart.destroy();
            this.produceChart();
            let percent = parseInt(this.props.percentApplied)
            this.setState({ percentApplied: percent })
        }
    }

    produceChart = () => {
        this.myChart = new Chart (this.chartRef.current, {
            type: 'doughnut',
            data: this.props.data,
            options: {
                maintainAspectRatio: false,
                cutoutPercentage: 75,
                animation: {
                    animateScale: true
                },
                legend: {
                    display: false,
                },
                events: [], //remove this and comment in below to add hover info
                // tooltips: {
                //     callbacks: {
                //         title: () => null,
                //     }
                // }
            }
        })
    }

    render() {
        return (
            <div className="appliedPieChart">
                <p className="boxTitle appliedPercentFigure">
                    <span><CountUp end={this.state.percentApplied}/></span>%
                </p>
                <canvas ref={this.chartRef} />
            </div>
        )
    }
}

export default AppliedPercentConstructor;