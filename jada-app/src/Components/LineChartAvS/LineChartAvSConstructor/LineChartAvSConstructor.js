import React from "react";
import Chart from 'chart.js';

class LineChartAvSConstructor extends React.Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        this.produceChart()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.data !== this.props.data) {
            this.myChart.destroy();
            this.produceChart();
        }
    }

    produceChart = () => {
        this.myChart = new Chart (this.chartRef.current, {
            type: 'line',
            data: {
                labels: this.props.data.applied.map(d => d.time),
                datasets: [{
                    label: this.props.title.applied,
                    data: this.props.data.applied.map(d => d.value),
                    fill: 'none',
                    backgroundColor: '#2ecc71',
                    pointRadius: 2,
                    borderColor: '#2ecc71',
                    borderWidth: 1
                },
                {
                    label: this.props.title.skipped,
                    data: this.props.data.skipped.map(d => d.value),
                    fill: 'none',
                    backgroundColor: '#e67e22',
                    pointRadius: 2,
                    borderColor: '#e67e22',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    xAxes: [
                        {
                            type: 'time',
                            time: {
                                unit: 'day'
                            }
                        }
                    ],
                    yAxes: [
                        {
                            ticks: {
                                min: 0
                            }
                        }
                    ]
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

export default LineChartAvSConstructor;