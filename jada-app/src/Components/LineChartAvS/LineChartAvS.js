import React from "react";
import Chart from 'chart.js';
import './lineChartAvS.css';

class LineChartAvS extends React.Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        this.myChart = new Chart (this.chartRef.current, {
            type: 'line',
            options: {
                scales: {
                    xAxes: [
                        {
                            type: 'time',
                            time: {
                                unit: 'week'
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
            },
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
                    backgroundColor: '#e74c3c',
                    pointRadius: 2,
                    borderColor: '#e74c3c',
                    borderWidth: 1
                }]
            }
        })
    }

    render() {
        return (
            <canvas ref={this.chartRef} />
        )
    }
}

export default LineChartAvS;