import React from "react";
import ApplicationsTableConstructor from "../../Constructors/ApplicationsTableConstructor/ApplicationsTableConstructor";

class TableApplications extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            applications: [],
            tableData: {
                headers: [],
                datasets: []
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.applications !== this.props.applications) {
            this.setState({ applications: this.props.applications })
            this.updateTableData();
        }
    }

    reorderApplications = (applications) => {
        return applications.sort((app_1, app_2) => {
            if (new Date(app_1.session_date) > new Date(app_2.session_date)) return -1;
            if (new Date(app_1.session_date) < new Date(app_2.session_date)) return 1;
            return 0;
        })
    }

    updateTableData = () => {
        let originalData = this.props.applications;
        let applications = this.reorderApplications(originalData)
        let tableData = {
            headers: ['job_title', 'totalJobs_id', 'totalJobs_ref', 'apply_attempted', 'session_date'],
            datasets: []
        }

        tableData.datasets.push(...applications);
        this.setState({ tableData: tableData })
    }

    render() {
        return (
            <div>
                <ApplicationsTableConstructor
                    tableData={this.state.tableData}
                />
            </div>
        );
    }
}

export default TableApplications;