import React from "react";
import TableConstructor from "../../Constructors/TableConstructor/TableConstructor";

class TableApplications extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            applications: {},
            tableData: {
                headers: ['job_title', 'totalJobs_id', 'totalJobs_ref', 'apply_attempted', 'session_date'],
                datasets: [
                    {
                        "job_title": "Junior Software Developer in Test (SDET)",
                        "totalJobs_id": "90293562",
                        "totalJobs_ref": "Totaljobs/GA-40",
                        "apply_attempted": true,
                        "session_date": "2020-07-02"
                    },
                    {
                        "job_title": "Technology Graduate",
                        "totalJobs_id": "90323904",
                        "apply_attempted": false,
                        "session_date": "2020-07-02"
                    }
                ]
            }
        }
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