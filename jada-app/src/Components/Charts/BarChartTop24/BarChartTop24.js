import React from "react";
import './barChartTop24.css';
import BarChartConstructor from "../../Constructors/BarChartConstructor/BarChartConstructor";

class BarChartTop24 extends React.Component {
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
            this.updateTop24Data()
        }
    }

    languageCount = (language, languageArr) => {
        let languageFound = languageArr.filter(word => word === language);
        return languageFound.length
    }

    javaScriptCount = () => {
        let applications = this.props.applications;
        let jS = [];
        let dkw = [];

        applications.forEach(application => {
            dkw.push(...application.found_dkw)
        })

        for (let i=0; i < dkw.length; i++) {
            if (dkw[i] === 'JAVASCRIPT' || dkw[i] === 'JS') {
                jS.push(dkw[i])
            }
        }

        return jS.length
    }

    mapLanguages = (applications) => {
        let languages = [];
        applications.forEach(application => {
            languages.push(...application.found_top24)
        })
        return languages
    }

    removeDuplicates = (array) => {
        return array.reduce((unique, item) =>
            unique.includes(item) ? unique : [...unique, item],[]);
    }

    updateTop24CountForJS = (languageSingle, currentCounts) => {
        let updatedCounts = [];
        updatedCounts.push(...currentCounts);
        let jsCount = this.javaScriptCount();
        for (let i=0; i < languageSingle.length; i++) {
            if (languageSingle[i] === 'JAVASCRIPT') {
                updatedCounts[i] = jsCount
            }
        }

        return updatedCounts
    }

    updateTop24Data = () => {
        let applications = this.props.applications;
        let languagesCount = [];
        let languageData = {
            labels: [],
            datasets: [{
                backgroundColor: '#34495e',
                data: []
            }]
        }

        let languagesAll = this.mapLanguages(applications);
        let languagesSingle = this.removeDuplicates(languagesAll);

        languagesSingle.forEach(language => {
            languagesCount.push(this.languageCount(language, languagesAll))
        })

        let updatedLanguagesCount = this.updateTop24CountForJS(languagesSingle, languagesCount)

        languageData.labels.push(...languagesSingle);
        languageData.datasets[0].data.push(...updatedLanguagesCount)

        this.setState({ data: languageData })

    }

    render() {
        return (
            <div className="col-xl-12 barChartUDKW">
                <BarChartConstructor
                    data={this.state.data}
                    title='TOP 24 Programming Languages Found'
                    displayTitle={this.state.displayTitle}
                />
            </div>
        )
    }

}

export default BarChartTop24;