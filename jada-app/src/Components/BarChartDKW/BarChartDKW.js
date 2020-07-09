import React from "react";
import './barChartDKW.css';
import BarChartHorizontalConstructor from "../BarChartHorizontalContructor/BarChartHorizontalConstructor";

class BarChartDKW extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            applications: {},
            displayTitle: false,
            data: {}
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.applications !== this.state.applications) {
            this.setState({
                applications: this.props.applications
            })
            this.updateDKWData();
        }
    }

    keyWordCount = (keyWord, array) => {
        return array.filter(word => word === keyWord)
    }

    mapKeyWord = (applications) => {
        let keyWordsAll = [];
        let keyWordsFiltered = [];

        applications.forEach(application => {
            keyWordsAll.push(...application.found_dkw)
        });

        for (let i = 0; i < keyWordsAll.length; i++) {
            let kw = keyWordsAll[i];
            if (kw !== 'DEVELOPER' && kw !== 'SOFTWARE' &&
            kw !== 'ENGINEER' && kw !== 'ENGINEERING') {
                keyWordsFiltered.push(kw)
            }
        }

        return keyWordsFiltered
    }

    removeDuplicates = (array) => {
        return array.reduce((unique, item) =>
            unique.includes(item) ? unique : [...unique, item],[]);
    }

    updateDKWData = () => {
        let applications = this.props.applications;
        let keyWordsCount = [];
        let keyWordData = {
            labels: [],
            datasets: [{
                backgroundColor: '#2ecc71',
                data: []
            }]
        }

        let keyWordsAll = this.mapKeyWord(applications);
        let keyWordsSingle = this.removeDuplicates(keyWordsAll)

        keyWordsSingle.forEach(keyWord => {
            keyWordsCount.push(this.keyWordCount(keyWord, keyWordsAll).length)
        })

        keyWordData.labels.push(...keyWordsSingle)
        keyWordData.datasets[0].data.push(...keyWordsCount)

        this.setState({ data: keyWordData })
    }



    render() {
        return(
            <div className="col-xl-6 barChartDKW">
                <BarChartHorizontalConstructor
                    data={this.state.data}
                    title='DESIRED Key Words'
                    displayTitle={this.state.displayTitle}
                />
            </div>
        )
    }
}

export default BarChartDKW;