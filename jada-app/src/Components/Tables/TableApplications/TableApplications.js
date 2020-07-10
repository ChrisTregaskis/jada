import React from "react";
import TableConstructor from "../../Constructors/TableConstructor/TableConstructor";

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
        if (prevProps.applications !== this.state.applications) {
            this.setState({ applications: this.props.applications })
            this.updateTableData();
        }
    }

    updateTableData = () => {
        let applications = this.props.applications;
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
                <TableConstructor
                    tableData={this.state.tableData}
                />
            </div>
        );
    }
}

export default TableApplications;