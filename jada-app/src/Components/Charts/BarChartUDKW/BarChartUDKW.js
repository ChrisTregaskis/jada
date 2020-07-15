import React from "react";
import './barChartUDKW.css';
import BarChartHorizontalConstructor
    from "../../Constructors/BarChartHorizontalContructor/BarChartHorizontalConstructor";

class BarChartUDKW extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            applications: {},
            displayTitle: false,
            data: {}
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.applications !== this.state.applications) {
            this.setState({
                applications: this.props.applications
            })
            this.updateUDKWData()
        }
    }

    keyWordCount = (keyWord, array) => {
        let keyWordFound = array.filter(word => word === keyWord);
        return keyWordFound.length
    }

    mapKeyWord = (applications) => {
        let keyWords = [];
        applications.forEach(application => {
            keyWords.push(...application.found_udkw)
        });
        return keyWords
    }

    removeDuplicates = (array) => {
        return array.reduce((unique, item) =>
            unique.includes(item) ? unique : [...unique, item],[]);
    }

    updateUDKWData = () => {
        let applications = this.props.applications;
        let keyWordsCount = [];
        let keyWordData = {
            labels: [],
            datasets: [{
                backgroundColor: '#e67e22',
                data: []
            }]
        }

        let keyWordsAll = this.mapKeyWord(applications);
        let keyWordsSingle = this.removeDuplicates(keyWordsAll)

        keyWordsSingle.forEach(keyWord => {
            keyWordsCount.push(this.keyWordCount(keyWord, keyWordsAll))
        })

        keyWordData.labels.push(...keyWordsSingle)
        keyWordData.datasets[0].data.push(...keyWordsCount)

        this.setState({ data: keyWordData })
    }

    render() {
        return (
            <div className="col-xl-12 barChartUDKW">
                <BarChartHorizontalConstructor
                    data={this.state.data}
                    title='UNDESIRABLE Key Words'
                    displayTitle={this.state.displayTitle}
                />
            </div>
        )
    }

}

export default BarChartUDKW