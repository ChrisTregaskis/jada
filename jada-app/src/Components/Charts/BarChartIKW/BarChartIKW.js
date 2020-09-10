import React from "react";
import './barChartIKW.css';
import BarChartConstructor from "../../Constructors/BarChartConstructor/BarChartConstructor";

class BarChartIKW extends React.Component {
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
            this.updateIkwData()
        }
    }

    ikwCount = (ikw, ikwArr) => {
        let ikwFound = ikwArr.filter(word => word === ikw);
        return ikwFound.length
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

    mapIkw = (applications) => {
        console.log(applications)
        let ikw = [];
        applications.forEach(application => {
            if (application.found_ikw !== undefined) {
                ikw.push(...application.found_ikw)
            }
        })
        return ikw
    }

    removeDuplicates = (array) => {
        return array.reduce((unique, item) =>
            unique.includes(item) ? unique : [...unique, item],[]);
    }

    updateIkwCountForJS = (ikwSingle, currentCounts) => {
        let updatedCounts = [];
        updatedCounts.push(...currentCounts);
        let jsCount = this.javaScriptCount();
        for (let i=0; i < ikwSingle.length; i++) {
            if (ikwSingle[i] === 'JAVASCRIPT') {
                updatedCounts[i] = jsCount
            }
        }

        return updatedCounts
    }

    updateIkwData = () => {
        let applications = this.props.applications;
        let ikwCount = [];
        let ikwData = {
            labels: [],
            datasets: [{
                backgroundColor: '#34495e',
                data: []
            }]
        }

        let ikwAll = this.mapIkw(applications);
        let ikwSingle = this.removeDuplicates(ikwAll);

        ikwSingle.forEach(ikw => {
            ikwCount.push(this.ikwCount(ikw, ikwAll))
        })

        let updatedIkwCount = this.updateIkwCountForJS(ikwSingle, ikwCount)

        ikwData.labels.push(...ikwSingle);
        ikwData.datasets[0].data.push(...updatedIkwCount)

        this.setState({ data: ikwData })

    }

    render() {
        return (
            <div className="col-xl-12 barChartUDKW">
                <BarChartConstructor
                    data={this.state.data}
                    title='Interested Key Words Found'
                    displayTitle={this.state.displayTitle}
                />
            </div>
        )
    }

}

export default BarChartIKW;