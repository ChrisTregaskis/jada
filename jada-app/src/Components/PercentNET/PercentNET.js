import React from "react";
import PercentBoxConstructor from "../PercentBoxConstructor/PercentBoxConstructor";

class PercentNET extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            applications: {},
            chartData: {},
            percentFound: 0
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.applications !== this.state.applications) {
            this.setState({
                applications: this.props.applications
            })
            this.updatePercentFound()
        }
    }

    updateChartData = (percent, keyWord) => {
        let other = 100 - percent;
        let data = {
            labels: [keyWord, 'other'],
            datasets: [{
                data: [],
                backgroundColor: ['#e67e22']
            }]
        }
        data.datasets[0].data.push(percent)
        data.datasets[0].data.push(other)
        this.setState({ chartData: data})
    }

    updatedKeyWordCount = (keyWord) => {
        let applications = this.props.applications;
        let allKeyWords = [];
        let filteredKeyWord = [];

        applications.forEach(applications => {
            allKeyWords.push(...applications.found_udkw)
        });

        for (let i=0; i < allKeyWords.length; i++) {
            if (allKeyWords[i] === keyWord) {
                filteredKeyWord.push(allKeyWords[i])
            }
        }

        return filteredKeyWord.length;
    }

    updatePercentFound = async () => {
        let applications = this.props.applications;
        let total = applications.length;
        let keyWord = 'NET';
        let totalJS = this.updatedKeyWordCount(keyWord)
        let percent = ((totalJS / total) * 100).toFixed(0);
        await this.setState({ percentFound: percent })
        this.updateChartData(percent, keyWord)
    }

    render() {
        return (
            <div className="col-xl-3 percentageBox">
                <p className="boxTitle d-flex justify-content-center">.NET</p>
                <PercentBoxConstructor
                    data={this.state.chartData}
                    percentFound={this.state.percentFound}
                />
            </div>
        )
    }

}

export default PercentNET;