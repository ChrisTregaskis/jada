import React from "react";
import Chart from "chart.js";

class BarChartAvSConstructor extends React.Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        this.produceChart()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.myChart.destroy();
            this.produceChart();
        }
    }

    produceChart = () => {
        let avsData = this.props.data;
        let height;

        if (avsData[0] > avsData[1]) {
            height = avsData[0] + (avsData[0] * 0.2)
        } else {
            height = avsData[1] + (avsData[1] * 0.2)
        }

        this.myChart = new Chart (this.chartRef.current, {
            type: 'bar',
            data: {
                labels: ['Applied', 'Skipped'],
                datasets: [{
                    backgroundColor: ['#2ecc71', '#e67e22'],
                    data: this.props.data
                }]
            },
            options: {
                legend: { display: false },
                scales: {
                    yAxes: [{
                        ticks: {
                            suggestedMin: 50,
                            suggestedMax: height
                        }
                    }]
                }
            }
        })
    }

    render() {
        return (
            <div>
                <canvas ref={this.chartRef} />
            </div>
        )
    }
}

export default BarChartAvSConstructor;