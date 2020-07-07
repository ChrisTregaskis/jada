import React from "react";
import './mainDashboard.css';
import PageHeader from "../PageHeader/PageHeader";
import LineChartAvS from "../LineChartAvS/LineChartAvS";
import TotalProcessed from "../TotalProcessed/TotalProcessed";

class MainDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            feeds: this.getFeeds()
        }
    }

    getFeeds = () => {
        let feeds = [];

        feeds.push({
            title: {
                applied: 'Applied',
                skipped: 'Skipped'
            },
            data: {
                applied: [
                    {
                        "time": "2020/07/17",
                        "value": 25
                    },
                    {
                        "time": "2020/07/30",
                        "value": 92
                    },
                    {
                        "time": "2020/08/25",
                        "value": 29
                    },
                    {
                        "time": "2020/09/06",
                        "value": 85
                    },
                    {
                        "time": "2020/09/11",
                        "value": 23
                    }
                ],
                skipped: [
                    {
                        "time": "2020/07/17",
                        "value": 35
                    },
                    {
                        "time": "2020/07/30",
                        "value": 102
                    },
                    {
                        "time": "2020/08/25",
                        "value": 21
                    },
                    {
                        "time": "2020/09/06",
                        "value": 65
                    },
                    {
                        "time": "2020/09/11",
                        "value": 43
                    }
                ]
            }
        });

        return feeds
    }

    render() {
        return(
            <div className="container">
                <PageHeader/>
                <h2 className="d-flex justify-content-center lastSessionRun">
                    As of Monday 7th July 2020
                </h2>
                <div className="col-12 d-flex">
                    <div className="col-8">
                        <LineChartAvS
                            data={this.state.feeds[0].data}
                            title={this.state.feeds[0].title}
                            color="#3E517A"
                        />
                    </div>
                    <div className="col-4">
                        <TotalProcessed/>
                    </div>


                </div>

            </div>
        )
    }
}

export default MainDashboard;