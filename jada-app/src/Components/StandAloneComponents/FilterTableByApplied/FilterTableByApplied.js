import React from "react";
import './filterTableByApplied.css';

class FilterTableByApplied extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentView: 'View all applications'
        }
    }

    toggleViewAll = async () => {
        await this.setState({ currentView: 'View all applications' });
        this.props.toggleViewAll();
    }

    toggleViewApplied = async () => {
        await this.setState({ currentView: 'View applied applications' });
        this.props.toggleViewApplied();
    }

    toggleViewSkipped = async () => {
        await this.setState({ currentView: 'View skipped applications' });
        this.props.toggleViewSkipped();
    }

    render() {
        return (
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle tableSelectorBtn" type="button" id="tableSelector"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.currentView}
                </button>
                <div className="dropdown-menu" aria-labelledby="tableSelector">
                    <button className="dropdown-item" type="button"
                            onClick={this.toggleViewAll}>View all applications
                    </button>
                    <button className="dropdown-item" type="button"
                            onClick={this.toggleViewApplied}>View applied applications
                    </button>
                    <button className="dropdown-item" type="button"
                            onClick={this.toggleViewSkipped}>View skipped applications
                    </button>
                </div>
            </div>
        );
    }
}

export default FilterTableByApplied;