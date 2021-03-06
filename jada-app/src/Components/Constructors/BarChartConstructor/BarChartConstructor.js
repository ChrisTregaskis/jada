import React from "react";
import Chart from "chart.js";

class BarChartConstructor extends React.Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        this.produceChart();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.myChart.destroy();
            this.produceChart();
        }
    }

    produceChart = () => {
        this.myChart = new Chart (this.chartRef.current, {
            type: 'bar',
            data: this.props.data,
            options: {
                legend: { display: false },
                title: {
                    display: this.props.displayTitle,
                    text: this.props.title
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            suggestedMin: 0
                        }
                    }]
                }
            }
        })
    }


    render() {
        return (
            <canvas ref={this.chartRef} />
        )
    }
}

export default BarChartConstructor;