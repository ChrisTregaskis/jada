import React from "react";
import Chart from "chart.js";
import './percentBoxConstructor.css';
import CountUp from "react-countup";

class PercentBoxConstructor extends React.Component{
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();

        this.state = {
            percentFound: 0
        }
    }

    componentDidMount() {
        this.produceChart()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.myChart.destroy();
            this.produceChart()
            let percent = parseInt(this.props.percentFound)
            this.setState({ percentFound: percent })
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
                events: []
            }
        })
    }


    render() {
        return (
            <div className="percentFoundChart">
                <p className="boxTitle percentFoundFigure">
                    <span><CountUp end={this.state.percentFound}/></span>%
                </p>
                <canvas ref={this.chartRef} />
            </div>
        )
    }

}

export default PercentBoxConstructor;