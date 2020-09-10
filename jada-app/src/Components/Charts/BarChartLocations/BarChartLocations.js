import React from "react";
import './barChartLocations.css';
import BarChartHorizontalConstructor
    from "../../Constructors/BarChartHorizontalContructor/BarChartHorizontalConstructor";

class BarChartLocations extends React.Component {
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
            this.updateLocationsData()
        }
    }

    locationCount = (location, locationsArr) => {
        let locationFound = locationsArr.filter(word => word === location);
        return locationFound.length
    }

    mapLocations = (applications) => {
        let locations =[];
        applications.forEach(application => {
            if (application.location !== undefined) {
                let toUpperCaseLocation = application.location.toUpperCase();
                let location = toUpperCaseLocation.split(/[^a-zA-Z\d:]/);
                locations.push(location[0])
            }
        })
        return locations
    }

    removeDuplicates = (array) => {
        return array.reduce((unique, item) =>
            unique.includes(item) ? unique : [...unique, item],[])
    }

    updateLocationsData = () => {
        let applications = this.props.applications;
        let locationsCount = [];
        let locationsData = {
            labels: [],
            datasets: [{
                backgroundColor: '#34495e',
                data: []
            }]
        }

        let locationsAll = this.mapLocations(applications)
        let locationsSingle = this.removeDuplicates(locationsAll)

        locationsSingle.forEach(location => {
            locationsCount.push(this.locationCount(location, locationsAll))
        })

        for (let i=0; i < locationsSingle.length; i++) {
            if (locationsCount[i] >= 3) {
                locationsData.labels.push(locationsSingle[i])
                locationsData.datasets[0].data.push(locationsCount[i])
            }
        }

        this.setState({ data: locationsData })
    }

    render() {
        return (
            <div className="col-xl-12 barChartLocations">
                <BarChartHorizontalConstructor
                    data={this.state.data}
                    title="Locations"
                    displayTitle={this.state.displayTitle}
                />
            </div>
        )
    }

}

export default BarChartLocations;